import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { department, fullName, email, phone, cvFileName } = await req.json()

    // Get Resend API key from Supabase secrets
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not found in environment variables')
    }

    const emailData = {
      from: 'noreply@tortracs.net',
      to: ['administracionrh@tortracs.net'],
      reply_to: email,
      subject: `Nueva Aplicación de Trabajo - ${department} - TORTRACS`,
      html: `
        <h2>Nueva aplicación de trabajo</h2>
        <p><strong>Departamento:</strong> ${department}</p>
        <p><strong>Nombre completo:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>CV:</strong> ${cvFileName}</p>
        <hr>
        <p><em>Nota: El CV fue enviado por el candidato. Por favor, contactar directamente para solicitar el archivo.</em></p>
      `
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to send email: ${error}`)
    }

    const result = await response.json()

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})