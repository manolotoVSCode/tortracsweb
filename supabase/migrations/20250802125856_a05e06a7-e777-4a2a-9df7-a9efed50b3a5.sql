-- Agregar nuevos valores al enum existente si no existen ya
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gestorRH' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')) THEN
    ALTER TYPE app_role ADD VALUE 'gestorRH';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gestorCO' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')) THEN
    ALTER TYPE app_role ADD VALUE 'gestorCO';
  END IF;
END $$;

-- Crear políticas RLS específicas para gestorRH (solo job applications)
DROP POLICY IF EXISTS "GestorRH can view job applications" ON public.job_applications;
CREATE POLICY "GestorRH can view job applications" 
ON public.job_applications 
FOR SELECT 
USING (has_role(auth.uid(), 'gestorRH'::app_role));

DROP POLICY IF EXISTS "GestorRH can update job applications" ON public.job_applications;
CREATE POLICY "GestorRH can update job applications" 
ON public.job_applications 
FOR UPDATE 
USING (has_role(auth.uid(), 'gestorRH'::app_role));

-- Crear políticas RLS específicas para gestorCO (solo contact submissions)
DROP POLICY IF EXISTS "GestorCO can view contact submissions" ON public.contact_submissions;
CREATE POLICY "GestorCO can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (has_role(auth.uid(), 'gestorCO'::app_role));

DROP POLICY IF EXISTS "GestorCO can update contact submissions" ON public.contact_submissions;
CREATE POLICY "GestorCO can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (has_role(auth.uid(), 'gestorCO'::app_role));