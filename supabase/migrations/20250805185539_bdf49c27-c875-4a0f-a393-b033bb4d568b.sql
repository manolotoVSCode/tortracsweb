-- Insert configuration for job application confirmation email to user
INSERT INTO public.form_configurations (form_type, from_email, to_email, subject, template_content, is_active)
VALUES (
  'job_confirmation',
  'TORTRACS <noreply@tortracs.net>',
  '',
  'Hemos recibido tu aplicación - TORTRACS',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>¡Gracias por postularte!</h1>
    <p>Estimado/a <strong>{{full_name}}</strong>,</p>
    <p>Hemos recibido tu aplicación para el puesto en el departamento de <strong>{{department}}</strong>.</p>
    <p>Nuestro equipo de Recursos Humanos revisará tu perfil y nos pondremos en contacto contigo pronto.</p>
    <p>¡Gracias por tu interés en formar parte de TORTRACS!</p>
    <p>Saludos cordiales,<br>Equipo de Recursos Humanos<br>TORTRACS</p>
  </div>',
  true
);