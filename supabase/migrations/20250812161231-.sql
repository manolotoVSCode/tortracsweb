-- Enable DELETE via RLS for super_admin only on contact_submissions and job_applications
-- Contact Submissions DELETE policy
CREATE POLICY IF NOT EXISTS "Super admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Job Applications DELETE policy
CREATE POLICY IF NOT EXISTS "Super admins can delete job applications"
ON public.job_applications
FOR DELETE
USING (has_role(auth.uid(), 'super_admin'::app_role));