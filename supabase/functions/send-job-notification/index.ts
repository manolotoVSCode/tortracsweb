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
    
    // Initialize Resend
    const resend = new Resend(apiKey);
    console.log("Resend initialized successfully");

    // Get the CV file from storage to attach it
    console.log("Getting CV file from storage...");
    const filePath = cv_file_path || cv_filename;
    console.log("Using file path:", filePath);
    const { data: cvFile, error: downloadError } = await supabase.storage
      .from('cv-uploads')
      .download(filePath);
    
    let attachments = [];
    if (cvFile && !downloadError) {
      console.log("CV file retrieved successfully, size:", cvFile.size);
      try {
        const arrayBuffer = await cvFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        console.log("CV converted to buffer, size:", uint8Array.length);
        
        attachments = [{
          filename: cv_filename,
          content: uint8Array,
        }];
        console.log("Attachment prepared:", cv_filename);
      } catch (bufferError) {
        console.error("Error converting CV to buffer:", bufferError);
      }
    } else {
      console.error("Error downloading CV file:", downloadError);
      console.log("CV file data:", cvFile);
    }

    // Send notification email to TORTRACS HR
    console.log("Sending job application notification email...");
    const notificationEmailResponse = await resend.emails.send({
      from: "TORTRACS Web <noreply@tortracs.net>",
      to: ["manuel.delatorre@tecings.com"],
      subject: `Nueva Aplicación de Trabajo - ${department}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Nueva Aplicación de Trabajo</h1>
          <p><strong>Nombre:</strong> ${full_name}</p>
          <p><strong>Departamento:</strong> ${department}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Teléfono:</strong> ${phone}</p>` : ''}
          <p><strong>CV:</strong> ${cv_filename}</p>
          ${attachments.length > 0 ? '<p>El CV se encuentra adjunto a este email.</p>' : '<p>El CV se encuentra disponible en el panel de administración.</p>'}
        </div>
      `,
      attachments: attachments,
    });

    console.log("Job notification email result:", notificationEmailResponse);

    // Send confirmation email to applicant
    console.log("Sending confirmation email to applicant...");
    const confirmationEmailResponse = await resend.emails.send({
      from: "TORTRACS <noreply@tortracs.net>",
      to: [email],
      subject: "Hemos recibido tu aplicación - TORTRACS",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>¡Gracias por tu interés en TORTRACS!</h1>
          <p>Estimado/a <strong>${full_name}</strong>,</p>
          <p>Hemos recibido tu aplicación para el departamento de <strong>${department}</strong>.</p>
          <p>Nuestro equipo de Recursos Humanos revisará tu perfil y nos pondremos en contacto contigo si tu experiencia coincide con nuestras necesidades actuales.</p>
          <p>¡Gracias por considerarnos como tu próximo destino profesional!</p>
          <br>
          <p>Saludos cordiales,<br>Equipo de Recursos Humanos<br>TORTRACS</p>
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