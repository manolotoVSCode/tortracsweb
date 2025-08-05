-- Update RLS policies for form_configurations to include admin role

-- Drop existing policies
DROP POLICY IF EXISTS "Super admins can view all form configurations" ON public.form_configurations;
DROP POLICY IF EXISTS "Super admins can update form configurations" ON public.form_configurations;
DROP POLICY IF EXISTS "Super admins can insert form configurations" ON public.form_configurations;

-- Create new policies that include both admin and super_admin roles
CREATE POLICY "Admins and super_admins can view all form configurations" 
ON public.form_configurations 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins and super_admins can update form configurations" 
ON public.form_configurations 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Admins and super_admins can insert form configurations" 
ON public.form_configurations 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'super_admin'::app_role));