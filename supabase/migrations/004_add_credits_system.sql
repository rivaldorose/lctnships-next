-- ================================================
-- Credit Packages & Strippenkaart System
-- ================================================

-- Credit Packages (available for purchase)
CREATE TABLE IF NOT EXISTS credit_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  credits INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  price_per_day DECIMAL(10,2) NOT NULL,
  discount_percent INTEGER DEFAULT 0,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default packages
INSERT INTO credit_packages (name, credits, price, price_per_day, discount_percent, description) VALUES
('Starter', 3, 270, 90, 10, 'Perfect om te beginnen'),
('Popular', 5, 400, 80, 20, 'Meest gekozen pakket'),
('Pro', 10, 700, 70, 30, 'Voor de serieuze creator'),
('Studio', 20, 1200, 60, 40, 'Beste waarde voor studios')
ON CONFLICT DO NOTHING;

-- User Credits (how many credits a user has)
CREATE TABLE IF NOT EXISTS user_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_remaining INTEGER DEFAULT 0,
  credits_total INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ, -- NULL = never expires
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Credit Transactions (history of purchases and usage)
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('purchase', 'use', 'refund', 'expire')),
  credits INTEGER NOT NULL, -- positive for purchase/refund, negative for use
  package_id UUID REFERENCES credit_packages(id),
  booking_id UUID REFERENCES bookings(id),
  stripe_session_id TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON credit_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON user_credits(user_id);

-- ================================================
-- Transactions table for payment logging
-- ================================================

-- Create transactions table if not exists
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL, -- 'booking_payment', 'credit_purchase', 'payout', 'refund'
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  stripe_transfer_id TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for transactions
CREATE INDEX IF NOT EXISTS idx_transactions_booking_id ON transactions(booking_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- ================================================
-- Update bookings table for payment tracking
-- ================================================

-- Add columns to bookings table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'stripe_session_id') THEN
    ALTER TABLE bookings ADD COLUMN stripe_session_id TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'stripe_payment_intent') THEN
    ALTER TABLE bookings ADD COLUMN stripe_payment_intent TEXT;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'paid_at') THEN
    ALTER TABLE bookings ADD COLUMN paid_at TIMESTAMPTZ;
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'payment_method') THEN
    ALTER TABLE bookings ADD COLUMN payment_method TEXT DEFAULT 'stripe'; -- 'stripe' or 'credits'
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'credits_used') THEN
    ALTER TABLE bookings ADD COLUMN credits_used INTEGER DEFAULT 0;
  END IF;
END $$;

-- ================================================
-- Row Level Security Policies
-- ================================================

-- Enable RLS on new tables
ALTER TABLE credit_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Credit packages: Anyone can view active packages
DROP POLICY IF EXISTS "Anyone can view active packages" ON credit_packages;
CREATE POLICY "Anyone can view active packages"
  ON credit_packages FOR SELECT
  USING (is_active = true);

-- User credits: Users can only view their own credits
DROP POLICY IF EXISTS "Users can view own credits" ON user_credits;
CREATE POLICY "Users can view own credits"
  ON user_credits FOR SELECT
  USING (auth.uid() = user_id);

-- User credits: Service role can insert/update
DROP POLICY IF EXISTS "Service can manage credits" ON user_credits;
CREATE POLICY "Service can manage credits"
  ON user_credits FOR ALL
  USING (true)
  WITH CHECK (true);

-- Credit transactions: Users can view their own transactions
DROP POLICY IF EXISTS "Users can view own transactions" ON credit_transactions;
CREATE POLICY "Users can view own transactions"
  ON credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Credit transactions: Service role can insert
DROP POLICY IF EXISTS "Service can insert transactions" ON credit_transactions;
CREATE POLICY "Service can insert transactions"
  ON credit_transactions FOR INSERT
  WITH CHECK (true);

-- Transactions: Users can view their own or related to their bookings
DROP POLICY IF EXISTS "Users can view own transactions log" ON transactions;
CREATE POLICY "Users can view own transactions log"
  ON transactions FOR SELECT
  USING (
    auth.uid() = user_id OR
    booking_id IN (SELECT id FROM bookings WHERE renter_id = auth.uid() OR host_id = auth.uid())
  );

-- Transactions: Service role can insert
DROP POLICY IF EXISTS "Service can insert transaction logs" ON transactions;
CREATE POLICY "Service can insert transaction logs"
  ON transactions FOR INSERT
  WITH CHECK (true);

-- ================================================
-- Helper function to check user credits
-- ================================================

CREATE OR REPLACE FUNCTION get_user_credits(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_credits INTEGER;
BEGIN
  SELECT credits_remaining INTO v_credits
  FROM user_credits
  WHERE user_id = p_user_id;

  RETURN COALESCE(v_credits, 0);
END;
$$;

-- ================================================
-- Function to use credits for booking
-- ================================================

CREATE OR REPLACE FUNCTION use_credits_for_booking(
  p_user_id UUID,
  p_booking_id UUID,
  p_credits INTEGER
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_credits INTEGER;
  v_new_credits INTEGER;
BEGIN
  -- Get current credits
  SELECT credits_remaining INTO v_current_credits
  FROM user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF v_current_credits IS NULL OR v_current_credits < p_credits THEN
    RAISE EXCEPTION 'Insufficient credits';
  END IF;

  -- Deduct credits
  v_new_credits := v_current_credits - p_credits;

  UPDATE user_credits
  SET credits_remaining = v_new_credits,
      updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Log transaction
  INSERT INTO credit_transactions (user_id, type, credits, booking_id, description)
  VALUES (p_user_id, 'use', -p_credits, p_booking_id, 'Credits gebruikt voor boeking');

  -- Update booking
  UPDATE bookings
  SET payment_method = 'credits',
      credits_used = p_credits,
      payment_status = 'paid',
      paid_at = NOW(),
      status = 'confirmed'
  WHERE id = p_booking_id;

  RETURN v_new_credits;
END;
$$;
