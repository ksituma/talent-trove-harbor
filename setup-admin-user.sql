
-- Create an admin user for testing
-- Note: This should only be used for development/testing environments
-- For production, use more secure methods to create admin users

-- Check if the user already exists to avoid conflicts
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, 
  email_confirmed_at, recovery_sent_at, last_sign_in_at, 
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at
) 
VALUES (
  '00000000-0000-0000-0000-000000000000', 
  gen_random_uuid(), 
  'authenticated', 
  'authenticated', 
  'admin@ksg.ac.ke', 
  crypt('admin123', gen_salt('bf')), 
  now(), 
  now(), 
  now(), 
  '{"provider":"email","providers":["email"]}', 
  '{}', 
  now(), 
  now()
)
ON CONFLICT (email) DO NOTHING;

-- Make sure the user is confirmed so they can log in immediately
UPDATE auth.users SET email_confirmed_at = now() WHERE email = 'admin@ksg.ac.ke';
