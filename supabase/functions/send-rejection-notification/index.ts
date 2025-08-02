import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RejectionNotificationRequest {
  full_name: string;
  email: string;
  department: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("=== REJECTION NOTIFICATION FUNCTION STARTED ===");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  console.log("=== PROCESSING REJECTION NOTIFICATION REQUEST ===");

  try {
    const { full_name, email, department }: RejectionNotificationRequest = await req.json();
    
    console.log("Rejection notification data:", {
      full_name,
      email,
      department
    });

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    console.log("API Key exists:", !!resendApiKey);

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const resend = new Resend(resendApiKey);
    console.log("Resend initialized successfully");

    console.log("Sending rejection notification email...");

    // Send rejection notification email
    const rejectionEmailResult = await resend.emails.send({
      from: 'TORTRACS Recursos Humanos <rh@tortracs.net>',
      to: email,
      subject: 'Actualización sobre tu solicitud de empleo - TORTRACS',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; font-size: 24px;">TORTRACS</h1>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Hola ${full_name},</h2>
          
          <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
            Gracias por tu interés en formar parte del equipo de TORTRACS y por el tiempo que dedicaste a enviar tu solicitud para el departamento de <strong>${department}</strong>.
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
        </div>
      `,
    });

    console.log("Rejection notification email result:", rejectionEmailResult);

    if (rejectionEmailResult.error) {
      throw rejectionEmailResult.error;
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        rejection_email_id: rejectionEmailResult.data?.id 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-rejection-notification function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);