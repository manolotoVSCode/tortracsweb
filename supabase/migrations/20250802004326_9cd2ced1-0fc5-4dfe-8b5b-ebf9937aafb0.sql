-- Update user roles from 'user' to 'admin' for the two specified users
UPDATE public.user_roles 
SET role = 'admin'::app_role 
WHERE user_id IN (
  'd2e6525c-9f10-477b-a663-8713d5dbe6a2',
  'dbe30197-e288-43b4-83b5-681660babfcf'
) AND role = 'user'::app_role;