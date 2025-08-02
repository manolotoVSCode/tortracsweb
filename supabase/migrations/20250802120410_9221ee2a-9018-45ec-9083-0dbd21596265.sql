-- Add new roles to the app_role enum
ALTER TYPE public.app_role ADD VALUE 'gestorRH';
ALTER TYPE public.app_role ADD VALUE 'gestorCO';

-- Add additional fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN first_name text,
ADD COLUMN last_name text,
ADD COLUMN company_function text;

-- Create RLS policies for profiles that allow super_admin to view and update all profiles
CREATE POLICY "Super admins can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated 
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can update all profiles" 
ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Allow super_admins to insert/update user roles
CREATE POLICY "Super admins can view all user roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated 
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can insert user roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated 
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can update user roles" 
ON public.user_roles 
FOR UPDATE 
TO authenticated 
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can delete user roles" 
ON public.user_roles 
FOR DELETE 
TO authenticated 
USING (has_role(auth.uid(), 'super_admin'::app_role));