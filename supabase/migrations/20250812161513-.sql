-- Create DELETE policies for super_admin if they don't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'contact_submissions' 
      AND policyname = 'Super admins can delete contact submissions'
  ) THEN
    CREATE POLICY "Super admins can delete contact submissions"
    ON public.contact_submissions
    FOR DELETE
    USING (has_role(auth.uid(), 'super_admin'::app_role));
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'job_applications' 
      AND policyname = 'Super admins can delete job applications'
  ) THEN
    CREATE POLICY "Super admins can delete job applications"
    ON public.job_applications
    FOR DELETE
    USING (has_role(auth.uid(), 'super_admin'::app_role));
  END IF;
END
$$;