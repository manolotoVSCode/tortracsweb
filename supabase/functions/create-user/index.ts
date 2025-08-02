import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client with service role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization')!
    const token = authHeader.replace('Bearer ', '')

    // Verify the user is authenticated and get their info
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    // Check if the user has super_admin role
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    if (roleError || roleData?.role !== 'super_admin') {
      throw new Error('Forbidden: Only super admins can create users')
    }

    // Get the request body
    const { email, password, first_name, last_name, company_function, role } = await req.json()

    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    // Create the user using admin API
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        first_name: first_name || '',
        last_name: last_name || '',
        company_function: company_function || ''
      }
    })

    if (createError) {
      throw createError
    }

    // If a specific role was provided and it's not the default, update the role
    if (role && role !== 'user' && newUser.user) {
      const { error: roleUpdateError } = await supabaseAdmin
        .from('user_roles')
        .update({ role: role })
        .eq('user_id', newUser.user.id)

      if (roleUpdateError) {
        console.error('Error updating user role:', roleUpdateError)
        // Don't throw here, user was created successfully
      }
    }

    // Update the profile with additional information
    if (newUser.user && (first_name || last_name || company_function)) {
      const { error: profileUpdateError } = await supabaseAdmin
        .from('profiles')
        .update({
          first_name: first_name || null,
          last_name: last_name || null,
          company_function: company_function || null
        })
        .eq('user_id', newUser.user.id)

      if (profileUpdateError) {
        console.error('Error updating profile:', profileUpdateError)
        // Don't throw here, user was created successfully
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: newUser.user,
        message: 'User created successfully'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error creating user:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        }, 
        status: 400 
      }
    )
  }
})