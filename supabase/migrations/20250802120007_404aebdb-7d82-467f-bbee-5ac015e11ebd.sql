-- Update policies for contact_submissions to include super_admin
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can update contact submissions" ON public.contact_submissions;

CREATE POLICY "Admins and super_admins can view all contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Admins and super_admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
TO authenticated 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);

-- Update policies for job_applications to include super_admin
DROP POLICY IF EXISTS "Admins can view all job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Admins can update job applications" ON public.job_applications;

CREATE POLICY "Admins and super_admins can view all job applications" 
ON public.job_applications 
FOR SELECT 
TO authenticated 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);

CREATE POLICY "Admins and super_admins can update job applications" 
ON public.job_applications 
FOR UPDATE 
TO authenticated 
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'super_admin'::app_role)
);