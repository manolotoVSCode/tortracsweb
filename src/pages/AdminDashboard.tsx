import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { LogOut, Mail, Users, FileText, Archive, Home, Download, Trash2 } from 'lucide-react';
import UserManagement from '@/components/UserManagement';
import ChangePassword from '@/components/ChangePassword';
import FormConfiguration from '@/components/FormConfiguration';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import * as XLSX from 'xlsx';

interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message?: string;
  status: string;
  archived: boolean;
  completed: boolean;
}

interface JobApplication {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone?: string;
  department: string;
  cv_filename: string;
  cv_file_path: string;
  status: string;
  archived: boolean;
}

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{first_name?: string; last_name?: string} | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate('/admin');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (session?.user) {
      fetchData();
    }
  }, [session]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch user role and profile
      if (session?.user) {
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .single();

        if (roleError && roleError.code !== 'PGRST116') {
          console.error('Error fetching user role:', roleError);
        } else {
          setUserRole(roleData?.role || null);
        }

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('user_id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error fetching user profile:', profileError);
        } else {
          setUserProfile(profileData || null);
        }

        // Fetch data based on user role
        if (roleData?.role === 'gestorCO' || roleData?.role === 'admin' || roleData?.role === 'super_admin') {
          // Fetch contact submissions for gestorCO, admin, and super_admin
          const { data: contactData, error: contactError } = await supabase
            .from('contact_submissions')
            .select('*')
            .eq('archived', false)
            .order('created_at', { ascending: false });

          if (contactError) throw contactError;
          setContactSubmissions(contactData || []);
        }

        if (roleData?.role === 'gestorRH' || roleData?.role === 'admin' || roleData?.role === 'super_admin') {
          // Fetch job applications for gestorRH, admin, and super_admin
          const { data: jobData, error: jobError } = await supabase
            .from('job_applications')
            .select('*')
            .eq('archived', false)
            .order('created_at', { ascending: false });

          if (jobError) throw jobError;
          setJobApplications(jobData || []);
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al cargar datos",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error al cerrar sesión",
        description: error.message,
      });
    } else {
      navigate('/admin');
    }
  };

  const updateContactSubmission = async (id: string, updates: Partial<ContactSubmission>) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setContactSubmissions(prev => prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ));

      // If archived, remove from view
      if (updates.archived) {
        setContactSubmissions(prev => prev.filter(item => item.id !== id));
      }

      toast({
        title: "Actualizado",
        description: "Estado actualizado correctamente",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const updateJobApplication = async (id: string, updates: Partial<JobApplication>) => {
    try {
      // If changing status to "rechazado", send rejection email first
      if (updates.status === 'rechazado') {
        const application = jobApplications.find(app => app.id === id);
        if (application) {
          try {
            const { error: emailError } = await supabase.functions.invoke('send-rejection-notification', {
              body: {
                full_name: application.full_name,
                email: application.email,
                department: application.department
              }
            });

            if (emailError) {
              console.error('Error sending rejection email:', emailError);
              toast({
                variant: "destructive",
                title: "Error al enviar email",
                description: "No se pudo enviar el email de rechazo, pero el estado se actualizará",
              });
            } else {
              toast({
                title: "Email enviado",
                description: "Se ha enviado un email de rechazo al candidato",
              });
            }
          } catch (emailError) {
            console.error('Error sending rejection email:', emailError);
            toast({
              variant: "destructive",
              title: "Error al enviar email",
              description: "No se pudo enviar el email de rechazo, pero el estado se actualizará",
            });
          }
        }
      }

      const { error } = await supabase
        .from('job_applications')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setJobApplications(prev => prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ));

      // If archived, remove from view
      if (updates.archived) {
        setJobApplications(prev => prev.filter(item => item.id !== id));
      }

      toast({
        title: "Actualizado",
        description: "Estado actualizado correctamente",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Download Excel functions
  const downloadContactSubmissionsExcel = async () => {
    try {
      // Fetch all contact submissions (including archived)
      const { data: allSubmissions, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Prepare data for Excel
      const excelData = allSubmissions?.map(submission => ({
        'ID': submission.id,
        'Fecha': formatDate(submission.created_at),
        'Nombre': submission.name,
        'Empresa': submission.company,
        'Email': submission.email,
        'Teléfono': submission.phone || 'N/A',
        'Mensaje': submission.message || 'N/A',
        'Estado': submission.status,
        'Archivado': submission.archived ? 'Sí' : 'No',
        'Completado': submission.completed ? 'Sí' : 'No'
      })) || [];

      // Create workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Solicitudes Contacto');

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const filename = `solicitudes_contacto_${date}.xlsx`;

      // Download file
      XLSX.writeFile(wb, filename);

      toast({
        title: "Descarga exitosa",
        description: `Archivo ${filename} descargado correctamente`,
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al descargar",
        description: error.message,
      });
    }
  };

  const downloadJobApplicationsExcel = async () => {
    try {
      // Fetch all job applications (including archived)
      const { data: allApplications, error } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Prepare data for Excel
      const excelData = allApplications?.map(application => ({
        'ID': application.id,
        'Fecha': formatDate(application.created_at),
        'Nombre Completo': application.full_name,
        'Email': application.email,
        'Teléfono': application.phone || 'N/A',
        'Departamento': application.department,
        'Archivo CV': application.cv_filename,
        'Ruta CV': application.cv_file_path || 'N/A',
        'Estado': application.status,
        'Archivado': application.archived ? 'Sí' : 'No'
      })) || [];

      // Create workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Aplicaciones Trabajo');

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const filename = `aplicaciones_trabajo_${date}.xlsx`;

      // Download file
      XLSX.writeFile(wb, filename);

      toast({
        title: "Descarga exitosa",
        description: `Archivo ${filename} descargado correctamente`,
      });

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al descargar",
        description: error.message,
      });
    }
  };

  // Delete functions (only for super admin)
  const deleteAllContactSubmissions = async () => {
    if (userRole !== 'super_admin') return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .neq('id', ''); // Delete all records

      if (error) throw error;

      toast({
        title: "Eliminación exitosa",
        description: "Todas las solicitudes de contacto han sido eliminadas",
      });

      fetchData(); // Refresh data
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al eliminar",
        description: error.message,
      });
    }
  };

  const deleteAllJobApplications = async () => {
    if (userRole !== 'super_admin') return;

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .neq('id', ''); // Delete all records

      if (error) throw error;

      toast({
        title: "Eliminación exitosa",
        description: "Todas las aplicaciones de trabajo han sido eliminadas",
      });

      fetchData(); // Refresh data
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al eliminar",
        description: error.message,
      });
    }
  };

  const deleteContactSubmission = async (id: string) => {
    if (userRole !== 'super_admin') return;

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Solicitud eliminada",
        description: "La solicitud de contacto ha sido eliminada",
      });

      fetchData(); // Refresh data
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al eliminar",
        description: error.message,
      });
    }
  };

  const deleteJobApplication = async (id: string) => {
    if (userRole !== 'super_admin') return;

    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Aplicación eliminada",
        description: "La aplicación de trabajo ha sido eliminada",
      });

      fetchData(); // Refresh data
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al eliminar",
        description: error.message,
      });
    }
  };

  const getStatusButtonColor = (status: string) => {
    const statusClasses = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      reviewed: 'bg-green-100 text-green-800 border-green-300',
      rechazado: 'bg-red-100 text-red-800 border-red-300',
      contacted: 'bg-blue-100 text-blue-800 border-blue-300',
      resolved: 'bg-green-100 text-green-800 border-green-300',
    };
    
    return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendiente',
      contacted: 'Contactado',
      reviewed: 'Revisado',
      resolved: 'Resuelto',
      completed: 'Completado',
      rechazado: 'Rechazado',
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Panel de Administración</h1>
            <p className="text-sm text-muted-foreground">TORTRACS</p>
          </div>
          <div className="flex items-center space-x-4">
            <ChangePassword />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-primary"
            >
              <Home className="h-4 w-4 mr-2" />
              Ir al Inicio
            </Button>
            <span className="text-sm text-muted-foreground">
              {userProfile?.first_name && userProfile?.last_name 
                ? `${userProfile.first_name} ${userProfile.last_name}`
                : user?.email}
            </span>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Super Admin Only - User Management */}
        {userRole === 'super_admin' && (
          <div className="space-y-8 mb-8">
            <UserManagement />
          </div>
        )}

        {/* Admin and Super Admin - Form Configuration */}
        {(userRole === 'admin' || userRole === 'super_admin') && (
          <div className="space-y-8 mb-8">
            <FormConfiguration />
          </div>
        )}

        {/* Stats Cards - Show only relevant data per role */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Cotizaciones - Only for gestorCO, admin and super_admin */}
          {(userRole === 'gestorCO' || userRole === 'admin' || userRole === 'super_admin') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contactSubmissions.length}</div>
                <p className="text-xs text-muted-foreground">
                  Solicitudes de contacto recibidas
                </p>
              </CardContent>
            </Card>
          )}

          {/* Aplicaciones de Trabajo - Only for gestorRH, admin and super_admin */}
          {(userRole === 'gestorRH' || userRole === 'admin' || userRole === 'super_admin') && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aplicaciones de Trabajo</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobApplications.length}</div>
                <p className="text-xs text-muted-foreground">
                  CVs recibidos para vacantes
                </p>
              </CardContent>
            </Card>
          )}

          {/* Pendientes - Show relevant pending items per role */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(() => {
                  let pending = 0;
                  if (userRole === 'gestorCO' || userRole === 'admin' || userRole === 'super_admin') {
                    pending += contactSubmissions.filter(c => c.status === 'pending').length;
                  }
                  if (userRole === 'gestorRH' || userRole === 'admin' || userRole === 'super_admin') {
                    pending += jobApplications.filter(j => j.status === 'pending').length;
                  }
                  return pending;
                })()}
              </div>
              <p className="text-xs text-muted-foreground">
                {userRole === 'gestorCO' ? 'Cotizaciones pendientes' :
                 userRole === 'gestorRH' ? 'Aplicaciones pendientes' :
                 'Total de elementos pendientes'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Submissions Table - Only for gestorCO, admin and super_admin */}
        {(userRole === 'gestorCO' || userRole === 'admin' || userRole === 'super_admin') && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Solicitudes de Cotización Recientes</CardTitle>
                  <CardDescription>
                    Últimas {Math.min(contactSubmissions.length, 10)} solicitudes de contacto
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={downloadContactSubmissionsExcel}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Excel
                  </Button>
                  {userRole === 'super_admin' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar Todas
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar todas las solicitudes?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción eliminará PERMANENTEMENTE todas las solicitudes de contacto de la base de datos. Esta acción NO se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={deleteAllContactSubmissions}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Sí, eliminar todas
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactSubmissions.slice(0, 10).map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="text-sm">
                        {formatDate(submission.created_at)}
                      </TableCell>
                      <TableCell className="font-medium">{submission.name}</TableCell>
                      <TableCell>{submission.company}</TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>
                        <Select
                          value={submission.status}
                          onValueChange={(value) => 
                            updateContactSubmission(submission.id, { status: value })
                          }
                        >
                          <SelectTrigger className={`w-32 ${getStatusButtonColor(submission.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="pending">Pendiente</SelectItem>
                            <SelectItem value="contacted">Contactado</SelectItem>
                            <SelectItem value="reviewed">Revisado</SelectItem>
                            <SelectItem value="resolved">Resuelto</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Archive className="h-4 w-4 mr-2" />
                                Archivar
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Archivar solicitud?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción archivará la solicitud de cotización y ya no aparecerá en el listado principal. Podrás revertir esta acción más tarde si es necesario.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => updateContactSubmission(submission.id, { archived: true })}
                                >
                                  Sí, archivar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          {userRole === 'super_admin' && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Eliminar
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Eliminar solicitud?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción eliminará PERMANENTEMENTE esta solicitud de la base de datos. Esta acción NO se puede deshacer.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteContactSubmission(submission.id)}
                                    className="bg-destructive hover:bg-destructive/90"
                                  >
                                    Sí, eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Job Applications Table - Only for gestorRH, admin and super_admin */}
        {(userRole === 'gestorRH' || userRole === 'admin' || userRole === 'super_admin') && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Aplicaciones de Trabajo Recientes</CardTitle>
                  <CardDescription>
                    Últimas {Math.min(jobApplications.length, 10)} aplicaciones para empleos
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={downloadJobApplicationsExcel}
                    variant="outline"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar Excel
                  </Button>
                  {userRole === 'super_admin' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar Todas
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>¿Eliminar todas las aplicaciones?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta acción eliminará PERMANENTEMENTE todas las aplicaciones de trabajo de la base de datos. Esta acción NO se puede deshacer.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={deleteAllJobApplications}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Sí, eliminar todas
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobApplications.slice(0, 10).map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="text-sm">
                        {formatDate(application.created_at)}
                      </TableCell>
                      <TableCell className="font-medium">{application.full_name}</TableCell>
                      <TableCell>{application.department}</TableCell>
                      <TableCell>{application.email}</TableCell>
                      <TableCell>
                        <Select
                          value={application.status}
                          onValueChange={(value) => 
                            updateJobApplication(application.id, { status: value })
                          }
                        >
                          <SelectTrigger className={`w-32 ${getStatusButtonColor(application.status)}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="pending">Pendiente</SelectItem>
                            <SelectItem value="reviewed">Revisado</SelectItem>
                            <SelectItem value="rechazado">Rechazado</SelectItem>
                          </SelectContent>
                        </Select>
                       </TableCell>
                       <TableCell>
                         <div className="flex gap-2">
                           <AlertDialog>
                             <AlertDialogTrigger asChild>
                               <Button variant="outline" size="sm">
                                 <Archive className="h-4 w-4 mr-2" />
                                 Archivar
                               </Button>
                             </AlertDialogTrigger>
                             <AlertDialogContent>
                               <AlertDialogHeader>
                                 <AlertDialogTitle>¿Archivar aplicación?</AlertDialogTitle>
                                 <AlertDialogDescription>
                                   Esta acción archivará la aplicación de trabajo y ya no aparecerá en el listado principal. Podrás revertir esta acción más tarde si es necesario.
                                 </AlertDialogDescription>
                               </AlertDialogHeader>
                               <AlertDialogFooter>
                                 <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                 <AlertDialogAction
                                   onClick={() => updateJobApplication(application.id, { archived: true })}
                                 >
                                   Sí, archivar
                                 </AlertDialogAction>
                               </AlertDialogFooter>
                             </AlertDialogContent>
                           </AlertDialog>
                           {userRole === 'super_admin' && (
                             <AlertDialog>
                               <AlertDialogTrigger asChild>
                                 <Button variant="destructive" size="sm">
                                   <Trash2 className="h-4 w-4 mr-2" />
                                   Eliminar
                                 </Button>
                               </AlertDialogTrigger>
                               <AlertDialogContent>
                                 <AlertDialogHeader>
                                   <AlertDialogTitle>¿Eliminar aplicación?</AlertDialogTitle>
                                   <AlertDialogDescription>
                                     Esta acción eliminará PERMANENTEMENTE esta aplicación de la base de datos. Esta acción NO se puede deshacer.
                                   </AlertDialogDescription>
                                 </AlertDialogHeader>
                                 <AlertDialogFooter>
                                   <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                   <AlertDialogAction
                                     onClick={() => deleteJobApplication(application.id)}
                                     className="bg-destructive hover:bg-destructive/90"
                                   >
                                     Sí, eliminar
                                   </AlertDialogAction>
                                 </AlertDialogFooter>
                               </AlertDialogContent>
                             </AlertDialog>
                           )}
                         </div>
                       </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;