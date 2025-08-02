-- Update existing user role to super_admin if they already exist
DO $$
BEGIN
  UPDATE public.user_roles 
  SET role = 'super_admin' 
  WHERE user_id IN (
    SELECT user_id 
    FROM public.profiles 
    WHERE email = 'manuel.delatorre@tortracs.net'
  );
END $$;

-- Update the has_role function to support super_admin checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$function$;