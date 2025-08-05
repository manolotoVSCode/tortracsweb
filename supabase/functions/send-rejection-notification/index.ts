import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.53.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RejectionNotificationRequest {
  full_name: string;
  email: string;
  department: string;
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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

    // Get rejection email configuration from database
    console.log("Getting rejection email configuration...");
    const { data: config, error: configError } = await supabase
      .from('form_configurations')
      .select('*')
      .eq('form_type', 'rejection_notification')
      .eq('is_active', true)
      .single();
    
    if (configError || !config) {
      console.error("Error getting rejection email configuration:", configError);
      throw new Error("Rejection email configuration not found");
    }
    
    console.log("Rejection email config:", config);

    const resend = new Resend(resendApiKey);
    console.log("Resend initialized successfully");

    console.log("Sending rejection notification email...");

    // Replace variables in rejection content
    let rejectionContent = config.template_content || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Hola {{full_name}},</h2>
        <p>Gracias por tu interés en formar parte del equipo de TORTRACS.</p>
        <p>Después de una cuidadosa revisión, hemos decidido no continuar con tu solicitud para {{department}}.</p>
        <p>Te deseamos mucho éxito en tu búsqueda laboral.</p>
        <p>Atentamente,<br>Equipo de Recursos Humanos<br>TORTRACS</p>
      </div>
    `;
    
    rejectionContent = rejectionContent
      .replace(/\{\{full_name\}\}/g, full_name)
      .replace(/\{\{department\}\}/g, department)
      .replace(/\{\{email\}\}/g, email);

    // Send rejection notification email
    const rejectionEmailResult = await resend.emails.send({
      from: config.from_email,
      to: email,
      subject: config.subject,
      html: rejectionContent,
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