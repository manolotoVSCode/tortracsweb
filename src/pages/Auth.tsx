import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import SEO from '@/components/SEO';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Redirect authenticated users to admin dashboard
        if (session?.user) {
          navigate('/admin/dashboard');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        navigate('/admin/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: error.message,
      });
    } else {
      toast({
        title: "Acceso exitoso",
        description: "Bienvenido al panel de administración",
      });
    }

    setLoading(false);
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <SEO title="Acceso administración | TORTRACS" description="Inicio de sesión del panel de administración de TORTRACS." canonical="/admin" noIndex />
      <Card className="w-full max-w-md">
         <CardHeader>
           <CardTitle>Administración TORTRACS</CardTitle>
           <CardDescription>
             Accede al panel de administración
           </CardDescription>
         </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Accediendo...' : 'Iniciar Sesión'}
            </Button>
          </form>
          
          <div className="mt-2 text-center">
            <Button
              type="button"
              variant="link"
              onClick={async () => {
                const trimmed = email.trim();
                if (!trimmed) {
                  toast({ variant: 'destructive', title: 'Ingresa tu email', description: 'Escribe tu correo para enviarte el enlace de recuperación.' });
                  return;
                }
                try {
                  setLoading(true);
                  const redirectUrl = `${window.location.origin}/auth`;
                  const { error } = await supabase.auth.resetPasswordForEmail(trimmed, { redirectTo: redirectUrl });
                  if (error) throw error;
                  toast({ title: 'Correo enviado', description: 'Revisa tu bandeja para restablecer tu contraseña.' });
                } catch (err: any) {
                  toast({ variant: 'destructive', title: 'No se pudo enviar', description: err.message || 'Intenta de nuevo en unos minutos.' });
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading}
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </div>
          
          <div className="mt-2 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              disabled={loading}
            >
              ← Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;