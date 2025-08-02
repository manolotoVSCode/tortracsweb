-- Add super_admin to the app_role enum
ALTER TYPE public.app_role ADD VALUE 'super_admin';

-- Update the handle_new_user function to assign super_admin role to specific email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email)
  );
  
  -- Assign super_admin role to manuel.delatorre@tortracs.net
  IF NEW.email = 'manuel.delatorre@tortracs.net' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'super_admin');
  -- Assign admin role to other specific emails
  ELSIF NEW.email IN ('gvtalavera@tortracs.net', 'ezequielfj@qcapital.mx') THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'user');
  END IF;
  
  RETURN NEW;
END;
$function$

-- If manuel.delatorre@tortracs.net already exists, update their role to super_admin
UPDATE public.user_roles 
SET role = 'super_admin' 
WHERE user_id IN (
  SELECT user_id 
  FROM public.profiles 
  WHERE email = 'manuel.delatorre@tortracs.net'
);