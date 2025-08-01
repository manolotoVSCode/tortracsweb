import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  company: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, message }: ContactNotificationRequest = await req.json();
    
    console.log("=== DEBUGGING EMAIL SEND ===");
    console.log("Received request:", { name, email, phone, company, message });
    console.log("Resend API Key exists:", !!Deno.env.get("RESEND_API_KEY"));
    
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      console.error("ERROR: No RESEND_API_KEY found!");
      throw new Error("RESEND_API_KEY not configured");
    }
    
    console.log("API Key starts with:", apiKey.substring(0, 10));

    // Send notification email to TORTRACS
    console.log("Attempting to send notification email...");
    const notificationEmailResponse = await resend.emails.send({
      from: "TORTRACS Web <onboarding@resend.dev>",
      to: ["comercial@tortracs.net"],
      subject: `Nueva Solicitud de Cotización - ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h1 style="color: #2563eb; margin-bottom: 20px;">Nueva Solicitud de Cotización</h1>
            
            <div style="background-color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <h2 style="color: #374151; margin-bottom: 15px;">Información del Cliente</h2>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Empresa:</strong> ${company}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
              ${phone ? `<p><strong>Teléfono:</strong> <a href="tel:${phone}" style="color: #2563eb;">${phone}</a></p>` : ''}
            </div>
            
            ${message ? `
              <div style="background-color: white; padding: 20px; border-radius: 6px;">
                <h2 style="color: #374151; margin-bottom: 15px;">Mensaje</h2>
                <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
              </div>
            ` : ''}
            
            <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-radius: 6px;">
              <p style="margin: 0; color: #1e40af; font-size: 14px;">
                <strong>Acción requerida:</strong> Responder al cliente dentro de las próximas 24 horas para mantener un excelente servicio.
              </p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Notification email response:", JSON.stringify(notificationEmailResponse, null, 2));

    // Send confirmation email to client
    const confirmationEmailResponse = await resend.emails.send({
      from: "TORTRACS <onboarding@resend.dev>",
      to: [email],
      subject: "Hemos recibido tu solicitud de cotización - TORTRACS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #2563eb; margin-bottom: 10px;">¡Gracias por contactarnos!</h1>
            </div>
            
            <div style="background-color: white; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
              <p>Estimado/a <strong>${name}</strong>,</p>
              
              <p>Hemos recibido tu solicitud de cotización para <strong>${company}</strong> y queremos agradecerte por considerar a TORTRACS como tu socio en soluciones de transporte y logística.</p>
              
              <p>Nuestro equipo comercial revisará tu solicitud y se pondrá en contacto contigo dentro de las próximas <strong>24 horas</strong> para brindarte una cotización personalizada que se adapte a tus necesidades específicas.</p>
              
              <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <h3 style="color: #374151; margin-top: 0;">Resumen de tu solicitud:</h3>
                <p><strong>Empresa:</strong> ${company}</p>
                <p><strong>Email de contacto:</strong> ${email}</p>
                ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
              </div>
              
              <p>Mientras tanto, si tienes alguna pregunta urgente, no dudes en contactarnos directamente:</p>
              <ul>
                <li><strong>Teléfono:</strong> +52 55 9057 4880</li>
                <li><strong>Email:</strong> comercial@tortracs.net</li>
                <li><strong>Horario:</strong> Lunes a Sábados de 8:00 a 18:00</li>
              </ul>
            </div>
            
            <div style="text-align: center; color: #6b7280; font-size: 14px;">
              <p>Gracias por confiar en TORTRACS</p>
              <p><strong>Tu socio confiable en transporte y logística</strong></p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("Notification email sent:", notificationEmailResponse);
    console.log("Confirmation email sent:", confirmationEmailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      notificationEmailId: notificationEmailResponse.data?.id,
      confirmationEmailId: confirmationEmailResponse.data?.id
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);