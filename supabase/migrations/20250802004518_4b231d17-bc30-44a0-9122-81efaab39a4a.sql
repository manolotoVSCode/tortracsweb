-- Update user roles from 'user' to 'admin' for the two specified users using correct user_ids
UPDATE public.user_roles 
SET role = 'admin'::app_role 
WHERE user_id IN (
  '41f0fcdd-9b76-40c4-84d9-f4283819322c',
  'e6e32994-36c7-47a5-a524-c772a0278440'
) AND role = 'user'::app_role;