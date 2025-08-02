-- Actualizar el enum de roles removiendo 'user' y 'moderator'
-- Primero crear un nuevo enum temporal
CREATE TYPE app_role_new AS ENUM ('admin', 'super_admin', 'gestorRH', 'gestorCO');

-- Actualizar la columna para usar el nuevo enum
ALTER TABLE user_roles 
ALTER COLUMN role TYPE app_role_new 
USING role::text::app_role_new;

-- Eliminar el enum anterior y renombrar el nuevo
DROP TYPE app_role;
ALTER TYPE app_role_new RENAME TO app_role;

-- Crear políticas RLS específicas para gestorRH (solo job applications)
CREATE POLICY "GestorRH can view job applications" 
ON public.job_applications 
FOR SELECT 
USING (has_role(auth.uid(), 'gestorRH'::app_role));

CREATE POLICY "GestorRH can update job applications" 
ON public.job_applications 
FOR UPDATE 
USING (has_role(auth.uid(), 'gestorRH'::app_role));

-- Crear políticas RLS específicas para gestorCO (solo contact submissions)
CREATE POLICY "GestorCO can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (has_role(auth.uid(), 'gestorCO'::app_role));

CREATE POLICY "GestorCO can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (has_role(auth.uid(), 'gestorCO'::app_role));