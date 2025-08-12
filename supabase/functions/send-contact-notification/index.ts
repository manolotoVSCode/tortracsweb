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
    
    // Get notification email configuration
    console.log("Getting notification email configuration...");
    const { data: notificationConfig, error: notificationConfigError } = await supabase
      .from('form_configurations')
      .select('*')
      .eq('form_type', 'contact_notification')
      .eq('is_active', true)
      .single();
    
    if (notificationConfigError || !notificationConfig) {
      console.error("Error getting notification email configuration:", notificationConfigError);
      throw new Error("Notification email configuration not found");
    }
    
    // Get confirmation email configuration
    console.log("Getting confirmation email configuration...");
    const { data: confirmationConfig, error: confirmationConfigError } = await supabase
      .from('form_configurations')
      .select('*')
      .eq('form_type', 'contact_confirmation')
      .eq('is_active', true)
      .single();
    
    if (confirmationConfigError || !confirmationConfig) {
      console.error("Error getting confirmation email configuration:", confirmationConfigError);
      throw new Error("Confirmation email configuration not found");
    }
    
    console.log("Notification config:", notificationConfig);
    console.log("Confirmation config:", confirmationConfig);
    
    // Initialize Resend
    const resend = new Resend(apiKey);
    console.log("Resend initialized successfully");

    // Send notification email to TORTRACS
    console.log("Sending notification email...");
    
    // Replace variables in notification content
    let notificationContent = notificationConfig.template_content || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Nueva Solicitud de Cotización</h1>
        <p><strong>Nombre:</strong> {{name}}</p>
        <p><strong>Empresa:</strong> {{company}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        {{phone}}
        {{message}}
      </div>
    `;
    
    notificationContent = notificationContent
      .replace(/\{\{name\}\}/g, name)
      .replace(/\{\{company\}\}/g, company)
      .replace(/\{\{email\}\}/g, email)
      .replace(/\{\{phone\}\}/g, phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : '')
      .replace(/\{\{message\}\}/g, message ? `<p><strong>Mensaje:</strong> ${message}</p>` : '');

    const notificationRecipients = (notificationConfig.to_email || '')
      .split(/[;,]/)
      .map((s: string) => s.trim())
      .filter((s: string) => s.length > 0);

    const notificationEmailResponse = await resend.emails.send({
      from: notificationConfig.from_email,
      to: notificationRecipients,
      subject: notificationConfig.subject.replace(/\{\{company\}\}/g, company),
      html: notificationContent,
    });

    console.log("Notification email result:", notificationEmailResponse);

    // Send confirmation email to client
    console.log("Sending confirmation email...");
    
    // Replace variables in confirmation content
    let confirmationContent = confirmationConfig.template_content || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>¡Gracias por contactarnos!</h1>
        <p>Estimado/a <strong>{{name}}</strong>,</p>
        <p>Hemos recibido tu solicitud de cotización para <strong>{{company}}</strong>.</p>
        <p>Nos pondremos en contacto contigo dentro de las próximas 24 horas.</p>
      </div>
    `;
    
    confirmationContent = confirmationContent
      .replace(/\{\{name\}\}/g, name)
      .replace(/\{\{company\}\}/g, company)
      .replace(/\{\{email\}\}/g, email);

    const confirmationEmailResponse = await resend.emails.send({
      from: confirmationConfig.from_email,
      to: [email],
      subject: confirmationConfig.subject,
      html: confirmationContent,
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