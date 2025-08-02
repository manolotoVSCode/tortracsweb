-- Check and fix RLS policies for public submissions

-- Drop all existing restrictive policies and recreate them properly
DROP POLICY IF EXISTS "Allow public job applications" ON public.job_applications;
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contact_submissions;

-- Create comprehensive policies that allow both anonymous and authenticated users to insert
CREATE POLICY "Allow job application submissions" 
ON public.job_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow contact form submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);