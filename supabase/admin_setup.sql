-- ============================================================
-- ARCADA — Admin User Setup in Supabase
-- Run these in the Supabase SQL Editor
-- ============================================================

-- ── 1. Create the admin account function ─────────────────────
-- This function lets you promote any Supabase Auth user to admin
-- by setting is_admin = true in their app_metadata.
-- app_metadata is server-side only — users cannot modify it themselves.

CREATE OR REPLACE FUNCTION make_user_admin(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_uid uuid;
BEGIN
  SELECT id INTO target_uid
  FROM auth.users
  WHERE email = user_email
  LIMIT 1;

  IF target_uid IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;

  UPDATE auth.users
  SET raw_app_meta_data = raw_app_meta_data || '{"is_admin": true}'::jsonb
  WHERE id = target_uid;
END;
$$;

-- ── 2. Call it with your admin email ─────────────────────────
-- Replace with the actual admin email you created in Supabase Auth dashboard
SELECT make_user_admin('admin@arcada.dz');

-- ── 3. Verify it worked ──────────────────────────────────────
SELECT id, email, raw_app_meta_data
FROM auth.users
WHERE email = 'admin@arcada.dz';
-- You should see: raw_app_meta_data = {"is_admin": true, "provider": "email", ...}

-- ── 4. To revoke admin ───────────────────────────────────────
-- UPDATE auth.users
-- SET raw_app_meta_data = raw_app_meta_data - 'is_admin'
-- WHERE email = 'admin@arcada.dz';

-- ── 5. RLS POLICY for admin routes ───────────────────────────
-- If your admin API routes hit Supabase directly, protect tables like this:

-- Example: only admin can update/delete products
CREATE POLICY "admin_full_access" ON products
  FOR ALL
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  );

-- Repeat for other sensitive tables:
CREATE POLICY "admin_full_access" ON categories
  FOR ALL
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  );

CREATE POLICY "admin_full_access" ON orders
  FOR ALL
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'is_admin')::boolean = true
  );

-- Public SELECT (so the store can list products / categories without auth):
CREATE POLICY "public_read_products" ON products
  FOR SELECT USING (is_active = true);

CREATE POLICY "public_read_categories" ON categories
  FOR SELECT USING (true);