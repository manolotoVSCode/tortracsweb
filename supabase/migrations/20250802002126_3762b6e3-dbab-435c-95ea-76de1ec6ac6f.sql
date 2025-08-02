-- Add archived and completed fields to contact_submissions
ALTER TABLE public.contact_submissions 
ADD COLUMN archived BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN completed BOOLEAN NOT NULL DEFAULT FALSE;

-- Add archived field to job_applications
ALTER TABLE public.job_applications 
ADD COLUMN archived BOOLEAN NOT NULL DEFAULT FALSE;