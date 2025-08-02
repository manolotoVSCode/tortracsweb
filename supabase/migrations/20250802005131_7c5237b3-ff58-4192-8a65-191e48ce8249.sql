-- Fix contact_submissions status constraint - add 'reviewed' status
ALTER TABLE public.contact_submissions DROP CONSTRAINT contact_submissions_status_check;
ALTER TABLE public.contact_submissions ADD CONSTRAINT contact_submissions_status_check 
CHECK (status = ANY (ARRAY['pending'::text, 'contacted'::text, 'reviewed'::text, 'resolved'::text]));

-- Update job_applications status constraint to include 'rechazado' 
ALTER TABLE public.job_applications DROP CONSTRAINT job_applications_status_check;
ALTER TABLE public.job_applications ADD CONSTRAINT job_applications_status_check 
CHECK (status = ANY (ARRAY['pending'::text, 'reviewed'::text, 'contacted'::text, 'hired'::text, 'rejected'::text, 'rechazado'::text]));