-- Migration: Add backend features for complete functionality
-- This migration adds missing columns and functions for:
-- - Bank account details for hosts
-- - Studio access information
-- - Equipment tracking
-- - Notification preferences
-- - Review system improvements

-- ============================================
-- 1. ADD MISSING USER COLUMNS
-- ============================================

-- Bank account details for host payouts
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS bank_account_name TEXT,
ADD COLUMN IF NOT EXISTS bank_iban TEXT,
ADD COLUMN IF NOT EXISTS bank_bic TEXT;

-- User verification and preferences
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS sms_notifications BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS push_notifications BOOLEAN DEFAULT TRUE,
ADD COLUMN IF NOT EXISTS marketing_emails BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT FALSE;

-- ============================================
-- 2. ADD STUDIO ACCESS INFORMATION
-- ============================================

ALTER TABLE public.studios
ADD COLUMN IF NOT EXISTS entry_code TEXT,
ADD COLUMN IF NOT EXISTS wifi_password TEXT,
ADD COLUMN IF NOT EXISTS wifi_network_name TEXT,
ADD COLUMN IF NOT EXISTS access_instructions TEXT,
ADD COLUMN IF NOT EXISTS parking_info TEXT,
ADD COLUMN IF NOT EXISTS check_in_time TIME DEFAULT '09:00',
ADD COLUMN IF NOT EXISTS check_out_time TIME DEFAULT '22:00';

-- ============================================
-- 3. CREATE EQUIPMENT TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    studio_id UUID NOT NULL REFERENCES public.studios(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('lighting', 'audio', 'camera', 'backdrop', 'furniture', 'props', 'other')),
    price_per_day DECIMAL DEFAULT 0,
    quantity INTEGER DEFAULT 1,
    is_available BOOLEAN DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_equipment_studio_id ON public.equipment(studio_id);

-- Enable RLS for equipment
ALTER TABLE public.equipment ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Equipment follows studio visibility" ON public.equipment
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.studios
            WHERE studios.id = equipment.studio_id
            AND (studios.is_published = true OR studios.status = 'active' OR studios.host_id = auth.uid())
        )
    );

CREATE POLICY "Hosts can manage equipment" ON public.equipment
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.studios
            WHERE studios.id = equipment.studio_id
            AND studios.host_id = auth.uid()
        )
    );

-- ============================================
-- 4. CREATE BOOKING EQUIPMENT TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.booking_equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    equipment_id UUID NOT NULL REFERENCES public.equipment(id),
    quantity INTEGER DEFAULT 1,
    price_per_unit DECIMAL NOT NULL,
    total_price DECIMAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_booking_equipment_booking_id ON public.booking_equipment(booking_id);

ALTER TABLE public.booking_equipment ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking equipment follows booking visibility" ON public.booking_equipment
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = booking_equipment.booking_id
            AND (bookings.renter_id = auth.uid() OR bookings.host_id = auth.uid())
        )
    );

CREATE POLICY "Users can add equipment to their bookings" ON public.booking_equipment
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = booking_equipment.booking_id
            AND bookings.renter_id = auth.uid()
        )
    );

-- ============================================
-- 5. ADD BOOKING FIELDS
-- ============================================

ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS equipment_total DECIMAL DEFAULT 0,
ADD COLUMN IF NOT EXISTS production_type TEXT,
ADD COLUMN IF NOT EXISTS special_requests TEXT,
ADD COLUMN IF NOT EXISTS rescheduled_from UUID REFERENCES public.bookings(id),
ADD COLUMN IF NOT EXISTS original_start_datetime TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS original_end_datetime TIMESTAMP WITH TIME ZONE;

-- ============================================
-- 6. ADD REVIEW FIELDS
-- ============================================

ALTER TABLE public.reviews
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS is_edited BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS edited_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS host_response TEXT,
ADD COLUMN IF NOT EXISTS host_response_at TIMESTAMP WITH TIME ZONE;

-- Add unique constraint to prevent duplicate reviews
ALTER TABLE public.reviews
ADD CONSTRAINT unique_booking_reviewer UNIQUE (booking_id, reviewer_id);

-- ============================================
-- 7. CREATE FUNCTIONS FOR REVIEW CALCULATIONS
-- ============================================

-- Function to update studio rating when a review is added/updated/deleted
CREATE OR REPLACE FUNCTION update_studio_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        UPDATE public.studios
        SET
            avg_rating = COALESCE((
                SELECT AVG(rating)::DECIMAL(3,2)
                FROM public.reviews
                WHERE studio_id = OLD.studio_id
                AND review_type = 'renter_to_studio'
            ), 0),
            total_reviews = (
                SELECT COUNT(*)
                FROM public.reviews
                WHERE studio_id = OLD.studio_id
                AND review_type = 'renter_to_studio'
            )
        WHERE id = OLD.studio_id;
        RETURN OLD;
    ELSE
        UPDATE public.studios
        SET
            avg_rating = COALESCE((
                SELECT AVG(rating)::DECIMAL(3,2)
                FROM public.reviews
                WHERE studio_id = NEW.studio_id
                AND review_type = 'renter_to_studio'
            ), 0),
            total_reviews = (
                SELECT COUNT(*)
                FROM public.reviews
                WHERE studio_id = NEW.studio_id
                AND review_type = 'renter_to_studio'
            )
        WHERE id = NEW.studio_id;
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic rating updates
DROP TRIGGER IF EXISTS trigger_update_studio_rating ON public.reviews;
CREATE TRIGGER trigger_update_studio_rating
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_studio_rating();

-- ============================================
-- 8. CREATE FUNCTION FOR BOOKING COMPLETION
-- ============================================

-- Function to auto-complete bookings and create payout records
CREATE OR REPLACE FUNCTION complete_past_bookings()
RETURNS void AS $$
BEGIN
    -- Update bookings that have ended to 'completed'
    UPDATE public.bookings
    SET
        status = 'completed',
        updated_at = NOW()
    WHERE
        status = 'confirmed'
        AND payment_status = 'paid'
        AND end_datetime < NOW();

    -- Create payout records for completed bookings that don't have one
    INSERT INTO public.payouts (host_id, booking_id, amount, status)
    SELECT
        b.host_id,
        b.id,
        b.host_payout,
        'pending'
    FROM public.bookings b
    WHERE
        b.status = 'completed'
        AND b.payment_status = 'paid'
        AND NOT EXISTS (
            SELECT 1 FROM public.payouts p WHERE p.booking_id = b.id
        );
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. CREATE NOTIFICATION HELPER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION create_notification(
    p_user_id UUID,
    p_type TEXT,
    p_title TEXT,
    p_message TEXT,
    p_link TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    notification_id UUID;
BEGIN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (p_user_id, p_type, p_title, p_message, p_link)
    RETURNING id INTO notification_id;

    RETURN notification_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 10. CREATE CONVERSATION HELPER FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION get_or_create_conversation(
    p_user1_id UUID,
    p_user2_id UUID,
    p_studio_id UUID DEFAULT NULL,
    p_booking_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    conversation_id UUID;
BEGIN
    -- Check if conversation already exists between these users for this studio/booking
    SELECT c.id INTO conversation_id
    FROM public.conversations c
    JOIN public.conversation_participants cp1 ON c.id = cp1.conversation_id AND cp1.user_id = p_user1_id
    JOIN public.conversation_participants cp2 ON c.id = cp2.conversation_id AND cp2.user_id = p_user2_id
    WHERE (c.studio_id = p_studio_id OR (c.studio_id IS NULL AND p_studio_id IS NULL))
    LIMIT 1;

    -- If no conversation exists, create one
    IF conversation_id IS NULL THEN
        INSERT INTO public.conversations (studio_id, booking_id)
        VALUES (p_studio_id, p_booking_id)
        RETURNING id INTO conversation_id;

        -- Add participants
        INSERT INTO public.conversation_participants (conversation_id, user_id)
        VALUES
            (conversation_id, p_user1_id),
            (conversation_id, p_user2_id);
    END IF;

    RETURN conversation_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 11. ADDITIONAL RLS POLICIES
-- ============================================

-- Conversations: Users can view/create conversations they're part of
CREATE POLICY "Users can view their conversations" ON public.conversations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.conversation_participants
            WHERE conversation_participants.conversation_id = conversations.id
            AND conversation_participants.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create conversations" ON public.conversations
    FOR INSERT WITH CHECK (true);

-- Conversation participants policies
CREATE POLICY "Users can view conversation participants" ON public.conversation_participants
    FOR SELECT USING (
        user_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.conversation_participants cp
            WHERE cp.conversation_id = conversation_participants.conversation_id
            AND cp.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert conversation participants" ON public.conversation_participants
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their participation" ON public.conversation_participants
    FOR UPDATE USING (user_id = auth.uid());

-- Payouts: Hosts can view their payouts
CREATE POLICY "Hosts can view own payouts" ON public.payouts
    FOR SELECT USING (auth.uid() = host_id);

-- Notifications: Allow insert for system
CREATE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

-- ============================================
-- 12. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_reviews_studio_id ON public.reviews(studio_id);
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON public.reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_payouts_host_id ON public.payouts(host_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON public.payouts(status);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON public.conversations(updated_at);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at);
