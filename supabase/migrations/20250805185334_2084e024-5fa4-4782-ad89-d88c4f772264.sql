-- Insert configuration for user confirmation email
INSERT INTO public.form_configurations (form_type, from_email, to_email, subject, template_content, is_active)
VALUES (
  'contact_confirmation',
  'TORTRACS <noreply@tortracs.net>',
  '',
  'Hemos recibido tu solicitud - TORTRACS',
  '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>¡Gracias por contactarnos!</h1>
    <p>Estimado/a <strong>{{name}}</strong>,</p>
    <p>Hemos recibido tu solicitud de cotización para <strong>{{company}}</strong>.</p>
    <p>Nos pondremos en contacto contigo dentro de las próximas 24 horas.</p>
    <p>Saludos cordiales,<br>Equipo TORTRACS</p>
  </div>',
  true
);