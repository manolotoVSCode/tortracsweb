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
      throw new Error('Forbidden: Only super admins can delete users')
    }

    // Get the user ID to delete from the request body
    const { user_id } = await req.json()

    if (!user_id) {
      throw new Error('User ID is required')
    }

    // Prevent self-deletion
    if (user_id === user.id) {
      throw new Error('Cannot delete your own account')
    }

    // Delete user role first
    const { error: roleDeleteError } = await supabaseAdmin
      .from('user_roles')
      .delete()
      .eq('user_id', user_id)

    if (roleDeleteError) {
      console.error('Error deleting user role:', roleDeleteError)
      // Don't throw here, continue with deletion
    }

    // Delete profile
    const { error: profileDeleteError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('user_id', user_id)

    if (profileDeleteError) {
      console.error('Error deleting profile:', profileDeleteError)
      // Don't throw here, continue with deletion
    }

    // Delete from auth.users (this requires admin privileges)
    const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(user_id)

    if (authDeleteError) {
      throw authDeleteError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'User deleted successfully'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error deleting user:', error)
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