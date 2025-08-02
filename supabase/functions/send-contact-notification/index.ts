import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.53.0";

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

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler = async (req: Request): Promise<Response> => {
  console.log("=== FUNCTION STARTED ===");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== PROCESSING REQUEST ===");
    const { name, email, phone, company, message }: ContactNotificationRequest = await req.json();
    
    console.log("Request data:", { name, email, phone, company });
    
    const apiKey = Deno.env.get("RESEND_API_KEY");
    console.log("API Key exists:", !!apiKey);
    
    if (!apiKey) {
      console.error("ERROR: No RESEND_API_KEY found!");
      throw new Error("RESEND_API_KEY not configured");
    }
    
    // Get email configuration from database
    console.log("Getting email configuration...");
    const { data: config, error: configError } = await supabase
      .from('form_configurations')
      .select('*')
      .eq('form_type', 'contact_notification')
      .eq('is_active', true)
      .single();
    
    if (configError || !config) {
      console.error("Error getting email configuration:", configError);
      throw new Error("Email configuration not found");
    }
    
    console.log("Email config:", config);
    
    // Initialize Resend
    const resend = new Resend(apiKey);
    console.log("Resend initialized successfully");

    // Send notification email to TORTRACS
    console.log("Sending notification email...");
    const notificationEmailResponse = await resend.emails.send({
      from: config.from_email,
      to: [config.to_email],
      subject: config.subject.replace('{company}', company),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Nueva Solicitud de Cotización</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Empresa:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
          ${message ? `<p><strong>Mensaje:</strong> ${message}</p>` : ''}
        </div>
      `,
    });

    console.log("Notification email result:", notificationEmailResponse);

    // Send confirmation email to client
    console.log("Sending confirmation email...");
    const confirmationEmailResponse = await resend.emails.send({
      from: "TORTRACS <noreply@tortracs.net>",
      to: [email],
      subject: "Hemos recibido tu solicitud - TORTRACS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>¡Gracias por contactarnos!</h1>
          <p>Estimado/a <strong>${name}</strong>,</p>
          <p>Hemos recibido tu solicitud de cotización para <strong>${company}</strong>.</p>
          <p>Nos pondremos en contacto contigo dentro de las próximas 24 horas.</p>
        </div>
      `,
    });

    console.log("Confirmation email result:", confirmationEmailResponse);

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
    console.error("=== ERROR IN FUNCTION ===", error);
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