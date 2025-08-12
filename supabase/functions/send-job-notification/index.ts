import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.53.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface JobNotificationRequest {
  full_name: string;
  email: string;
  phone?: string;
  department: string;
  cv_filename: string;
  cv_file_path?: string;
}

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler = async (req: Request): Promise<Response> => {
  console.log("=== JOB NOTIFICATION FUNCTION STARTED ===");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== PROCESSING JOB APPLICATION REQUEST ===");
    const { full_name, email, phone, department, cv_filename, cv_file_path }: JobNotificationRequest = await req.json();
    
    console.log("Job application data:", { full_name, email, phone, department, cv_filename, cv_file_path });
    
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
      .eq('form_type', 'job_notification')
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
      .eq('form_type', 'job_confirmation')
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

    // Get the CV file from storage to attach it
    console.log("Getting CV file from storage...");
    console.log("Supabase URL:", supabaseUrl);
    console.log("Service role key exists:", !!supabaseServiceKey);
    const filePath = cv_file_path || cv_filename;
    console.log("Using file path:", filePath);
    
    const { data: cvFile, error: downloadError } = await supabase.storage
      .from('cv-uploads')
      .download(filePath);
    
    console.log("Download result - data exists:", !!cvFile);
    console.log("Download error:", downloadError);
    
    let attachments = [];
    if (cvFile && !downloadError) {
      console.log("CV file retrieved successfully, size:", cvFile.size);
      try {
        const arrayBuffer = await cvFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const base64String = btoa(String.fromCharCode(...uint8Array));
        console.log("CV converted to base64, length:", base64String.length);
        
        attachments = [{
          filename: cv_filename,
          content: base64String,
        }];
        console.log("Attachment prepared successfully:", cv_filename);
      } catch (bufferError) {
        console.error("Error converting CV to buffer:", bufferError);
      }
    } else {
      console.error("Failed to download CV file");
      console.log("Download error details:", downloadError);
      console.log("CV file data:", cvFile);
    }
    
    console.log("Total attachments to send:", attachments.length);

    // Send notification email to TORTRACS HR
    console.log("Sending job application notification email...");
    
    // Replace variables in notification content
    let notificationContent = notificationConfig.template_content || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Nueva Aplicación de Trabajo</h1>
        <p><strong>Nombre:</strong> {{full_name}}</p>
        <p><strong>Departamento:</strong> {{department}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        {{phone}}
        <p><strong>CV:</strong> {{cv_filename}}</p>
        {{attachment_note}}
      </div>
    `;
    
    notificationContent = notificationContent
      .replace(/\{\{full_name\}\}/g, full_name)
      .replace(/\{\{department\}\}/g, department)
      .replace(/\{\{email\}\}/g, email)
      .replace(/\{\{phone\}\}/g, phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : '')
      .replace(/\{\{cv_filename\}\}/g, cv_filename)
      .replace(/\{\{attachment_note\}\}/g, attachments.length > 0 ? '<p>El CV se encuentra adjunto a este email.</p>' : '<p>El CV se encuentra disponible en el panel de administración.</p>');

    const notificationEmailResponse = await resend.emails.send({
      from: notificationConfig.from_email,
      to: (notificationConfig.to_email || '')
        .split(/[;,]/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0),
      subject: notificationConfig.subject.replace(/\{\{department\}\}/g, department),
      html: notificationContent,
      attachments: attachments,
    });

    console.log("Job notification email result:", notificationEmailResponse);

    // Send confirmation email to applicant
    console.log("Sending confirmation email to applicant...");
    
    // Replace variables in confirmation content
    let confirmationContent = confirmationConfig.template_content || `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>¡Gracias por tu interés en TORTRACS!</h1>
        <p>Estimado/a <strong>{{full_name}}</strong>,</p>
        <p>Hemos recibido tu aplicación para el departamento de <strong>{{department}}</strong>.</p>
        <p>Nuestro equipo de Recursos Humanos revisará tu perfil y nos pondremos en contacto contigo pronto.</p>
        <p>¡Gracias por tu interés en formar parte de TORTRACS!</p>
        <p>Saludos cordiales,<br>Equipo de Recursos Humanos<br>TORTRACS</p>
      </div>
    `;
    
    confirmationContent = confirmationContent
      .replace(/\{\{full_name\}\}/g, full_name)
      .replace(/\{\{department\}\}/g, department)
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
    console.error("=== ERROR IN JOB NOTIFICATION FUNCTION ===", error);
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