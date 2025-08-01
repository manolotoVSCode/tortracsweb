-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'resolved'))
);

-- Create table for job applications
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  department TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  cv_filename TEXT NOT NULL,
  cv_file_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'hired', 'rejected'))
);

-- Create indexes for better performance
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_status ON public.contact_submissions(status);
CREATE INDEX idx_job_applications_created_at ON public.job_applications(created_at DESC);
CREATE INDEX idx_job_applications_department ON public.job_applications(department);
CREATE INDEX idx_job_applications_status ON public.job_applications(status);

-- Enable Row Level Security (these tables will be public for form submissions)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public insertions (form submissions)
CREATE POLICY "Allow public contact form submissions" 
ON public.contact_submissions 
FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Allow public job applications" 
ON public.job_applications 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create storage bucket for CVs
INSERT INTO storage.buckets (id, name, public) VALUES ('cv-uploads', 'cv-uploads', false);

-- Create storage policies for CV uploads
CREATE POLICY "Allow public CV uploads" 
ON storage.objects 
FOR INSERT 
TO anon 
WITH CHECK (bucket_id = 'cv-uploads');

CREATE POLICY "Allow public CV reading for verification" 
ON storage.objects 
FOR SELECT 
TO anon 
USING (bucket_id = 'cv-uploads');