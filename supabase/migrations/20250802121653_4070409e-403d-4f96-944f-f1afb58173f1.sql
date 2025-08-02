-- Create table for form configurations
CREATE TABLE public.form_configurations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type text NOT NULL,
  from_email text NOT NULL,
  to_email text NOT NULL,
  subject text NOT NULL,
  template_content text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(form_type)
);

-- Enable RLS
ALTER TABLE public.form_configurations ENABLE ROW LEVEL SECURITY;

-- Create policies for super_admin access
CREATE POLICY "Super admins can view all form configurations" 
ON public.form_configurations 
FOR SELECT 
TO authenticated 
USING (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can insert form configurations" 
ON public.form_configurations 
FOR INSERT 
TO authenticated 
WITH CHECK (has_role(auth.uid(), 'super_admin'::app_role));

CREATE POLICY "Super admins can update form configurations" 
ON public.form_configurations 
FOR UPDATE 
TO authenticated 
USING (has_role(auth.uid(), 'super_admin'::app_role));

-- Insert default configurations
INSERT INTO public.form_configurations (form_type, from_email, to_email, subject, template_content) VALUES
('contact_notification', 'no-reply@tortracs.net', 'manuel.delatorre@tortracs.net', 'Nueva solicitud de cotización - TORTRACS', 'Se ha recibido una nueva solicitud de cotización'),
('job_notification', 'no-reply@tortracs.net', 'manuel.delatorre@tortracs.net', 'Nueva aplicación de trabajo - TORTRACS', 'Se ha recibido una nueva aplicación de trabajo'),
('rejection_notification', 'no-reply@tortracs.net', '', 'Respuesta a tu aplicación - TORTRACS', 'Gracias por tu interés en formar parte de nuestro equipo');

-- Create trigger for updating timestamps
CREATE TRIGGER update_form_configurations_updated_at
BEFORE UPDATE ON public.form_configurations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();