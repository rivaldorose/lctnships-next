-- Add missing columns to studios table for onboarding flow
ALTER TABLE public.studios
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS equipment TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS amenities TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS available_days INTEGER[] DEFAULT '{1,2,3,4}',
ADD COLUMN IF NOT EXISTS prep_time_minutes INTEGER DEFAULT 30,
ADD COLUMN IF NOT EXISTS booking_notice_hours INTEGER DEFAULT 24,
ADD COLUMN IF NOT EXISTS cleaning_fee DECIMAL DEFAULT 0,
ADD COLUMN IF NOT EXISTS weekend_markup INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating DECIMAL DEFAULT 0,
ADD COLUMN IF NOT EXISTS review_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'archived'));

-- Create alias column owner_id that references host_id for compatibility
-- This is done via a view or we can update our code to use host_id

-- Add index for status
CREATE INDEX IF NOT EXISTS idx_studios_status ON public.studios(status);

-- Update RLS policy to also check status
DROP POLICY IF EXISTS "Published studios are viewable by everyone" ON public.studios;
CREATE POLICY "Active studios are viewable by everyone" ON public.studios
    FOR SELECT USING (status = 'active' OR is_published = true OR host_id = auth.uid());
