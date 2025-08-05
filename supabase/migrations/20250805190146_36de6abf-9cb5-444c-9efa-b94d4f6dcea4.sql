-- Update rejection notification configuration with the actual content being sent
UPDATE public.form_configurations 
SET 
  from_email = 'TORTRACS Recursos Humanos <administracionrh@tortracs.net>',
  subject = 'Actualización sobre tu solicitud de empleo - TORTRACS',
  template_content = '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1 style="color: #333; font-size: 24px;">TORTRACS</h1>
    </div>
    
    <h2 style="color: #333; margin-bottom: 20px;">Hola {{full_name}},</h2>
    
    <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
      Gracias por tu interés en formar parte del equipo de TORTRACS y por el tiempo que dedicaste a enviar tu solicitud para el departamento de <strong>{{department}}</strong>.
    </p>
    
    <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
      Después de una cuidadosa revisión de tu perfil, hemos decidido no continuar con tu solicitud en este momento. Esta decisión no refleja tu valía profesional, sino que responde a las necesidades específicas del puesto en este momento.
    </p>
    
    <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
      Te animamos a que sigas pendiente de futuras oportunidades en TORTRACS, ya que tu perfil podría ser de interés para otros puestos que se abran en el futuro.
    </p>
    
    <p style="color: #666; line-height: 1.6; margin-bottom: 25px;">
      Te deseamos mucho éxito en tu búsqueda laboral.
    </p>
    
    <p style="color: #666; line-height: 1.6;">
      Atentamente,<br>
      <strong>Equipo de Recursos Humanos</strong><br>
      TORTRACS
    </p>
    
    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #999; font-size: 12px;">
      <p>Este es un mensaje automático, por favor no responder a este correo.</p>
    </div>
  </div>',
  updated_at = now()
WHERE form_type = 'rejection_notification';