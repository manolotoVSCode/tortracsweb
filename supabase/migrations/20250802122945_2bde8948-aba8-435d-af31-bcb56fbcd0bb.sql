-- Update RLS policies to allow public submissions

-- Drop existing restrictive policies for contact_submissions
DROP POLICY IF EXISTS "Allow public contact form submissions" ON public.contact_submissions;

-- Create new policy that allows anyone to insert into contact_submissions
CREATE POLICY "Allow public contact form submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Drop existing restrictive policy for job_applications
DROP POLICY IF EXISTS "Allow public job applications" ON public.job_applications;

-- Create new policy that allows anyone to insert into job_applications
CREATE POLICY "Allow public job applications" 
ON public.job_applications 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Create storage policies for cv-uploads bucket to allow public uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cv-uploads', 'cv-uploads', false)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload CVs to the cv-uploads bucket
CREATE POLICY "Allow public CV uploads" 
ON storage.objects 
FOR INSERT 
TO anon
WITH CHECK (bucket_id = 'cv-uploads');