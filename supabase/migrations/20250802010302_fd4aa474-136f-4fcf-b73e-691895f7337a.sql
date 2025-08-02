-- Simplify job_applications status constraint to only 3 states
ALTER TABLE public.job_applications DROP CONSTRAINT job_applications_status_check;
ALTER TABLE public.job_applications ADD CONSTRAINT job_applications_status_check 
CHECK (status = ANY (ARRAY['pending'::text, 'reviewed'::text, 'rechazado'::text]));