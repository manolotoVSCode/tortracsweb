import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Users, Edit, Save, X, Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  company_function: string | null;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
}

interface UserWithRole extends UserProfile {
  role: 'admin' | 'super_admin' | 'gestorRH' | 'gestorCO' | null;
}

const UserManagement = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<UserWithRole | null>(null);
  const [editForm, setEditForm] = useState<{
    first_name: string;
    last_name: string;
    company_function: string;
    role: 'admin' | 'super_admin' | 'gestorRH' | 'gestorCO';
  }>({
    first_name: '',
    last_name: '',
    company_function: '',
    role: 'gestorCO'
  });
  const [newUserForm, setNewUserForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    company_function: '',
    role: 'gestorCO' as 'admin' | 'super_admin' | 'gestorRH' | 'gestorCO'
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // Fetch all profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Combine profiles with roles - filter out old invalid roles
      const usersWithRoles: UserWithRole[] = profilesData.map(profile => {
        const userRole = rolesData.find(role => role.user_id === profile.user_id);
        const validRoles = ['admin', 'super_admin', 'gestorRH', 'gestorCO'];
        const role = userRole?.role && validRoles.includes(userRole.role) ? userRole.role as any : null;
        return {
          ...profile,
          role
        };
      });

      setUsers(usersWithRoles);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al cargar usuarios",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: UserWithRole) => {
    setEditingUser(user);
    setEditForm({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      company_function: user.company_function || '',
      role: user.role || 'gestorCO'
    });
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: editForm.first_name || null,
          last_name: editForm.last_name || null,
          company_function: editForm.company_function || null,
        })
        .eq('user_id', editingUser.user_id);

      if (profileError) throw profileError;

      // Update or insert role
      const { data: existingRole, error: roleCheckError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', editingUser.user_id)
        .single();

      if (roleCheckError && roleCheckError.code !== 'PGRST116') throw roleCheckError;

      if (existingRole) {
        // Update existing role
        const { error: roleUpdateError } = await supabase
          .from('user_roles')
          .update({ role: editForm.role })
          .eq('user_id', editingUser.user_id);

        if (roleUpdateError) throw roleUpdateError;
      } else {
        // Insert new role
        const { error: roleInsertError } = await supabase
          .from('user_roles')
          .insert({
            user_id: editingUser.user_id,
            role: editForm.role
          });

        if (roleInsertError) throw roleInsertError;
      }

      toast({
        title: "Usuario actualizado",
        description: "Los datos del usuario se han actualizado correctamente",
      });

      setEditingUser(null);
      fetchUsers(); // Refresh the list
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al actualizar usuario",
        description: error.message,
      });
    }
  };

  const handleCreateUser = async () => {
    if (!newUserForm.email || !newUserForm.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Email y contraseña son requeridos",
      });
      return;
    }

    try {
      setCreating(true);

      const { data, error } = await supabase.functions.invoke('create-user', {
        body: {
          email: newUserForm.email,
          password: newUserForm.password,
          first_name: newUserForm.first_name || null,
          last_name: newUserForm.last_name || null,
          company_function: newUserForm.company_function || null,
          role: newUserForm.role,
        }
      });

      if (error) throw error;

      toast({
        title: "Usuario creado",
        description: `Usuario ${newUserForm.email} creado exitosamente`,
      });

      // Reset form
      setNewUserForm({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        company_function: '',
        role: 'gestorCO'
      });

      // Refresh the users list
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al crear usuario",
        description: error.message,
      });
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (user: UserWithRole) => {
    try {
      // Delete user role first
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', user.user_id);

      if (roleError) throw roleError;

      // Delete profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', user.user_id);

      if (profileError) throw profileError;

      // Delete from auth.users (this is done through the admin API)
      const { error: authError } = await supabase.auth.admin.deleteUser(user.user_id);

      if (authError) throw authError;

      toast({
        title: "Usuario eliminado",
        description: `Usuario ${user.email} eliminado exitosamente`,
      });

      fetchUsers(); // Refresh the list
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al eliminar usuario",
        description: error.message,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getRoleBadgeColor = (role: string | null) => {
    const colors = {
      super_admin: 'bg-purple-100 text-purple-800 border-purple-300',
      admin: 'bg-red-100 text-red-800 border-red-300',
      gestorRH: 'bg-blue-100 text-blue-800 border-blue-300',
      gestorCO: 'bg-green-100 text-green-800 border-green-300',
      user: 'bg-gray-100 text-gray-800 border-gray-300',
    };
    return colors[role as keyof typeof colors] || colors.user;
  };

  const getRoleLabel = (role: string | null) => {
    const labels = {
      super_admin: 'Super Admin',
      admin: 'Admin',
      gestorRH: 'Gestor RH',
      gestorCO: 'Gestor CO',
      user: 'Usuario',
    };
    return labels[role as keyof typeof labels] || 'Usuario';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando usuarios...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Gestión de Usuarios
            </CardTitle>
            <CardDescription>
              Administrar usuarios registrados y sus roles (Solo Super Admin)
            </CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Usuario</DialogTitle>
                <DialogDescription>
                  Crea un nuevo usuario en el sistema con email y contraseña
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new_email" className="text-right">
                    Email *
                  </Label>
                  <Input
                    id="new_email"
                    type="email"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, email: e.target.value }))}
                    className="col-span-3"
                    placeholder="usuario@tortracs.net"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new_password" className="text-right">
                    Contraseña *
                  </Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, password: e.target.value }))}
                    className="col-span-3"
                    placeholder="Contraseña temporal"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new_first_name" className="text-right">
                    Nombre
                  </Label>
                  <Input
                    id="new_first_name"
                    value={newUserForm.first_name}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, first_name: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new_last_name" className="text-right">
                    Apellidos
                  </Label>
                  <Input
                    id="new_last_name"
                    value={newUserForm.last_name}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, last_name: e.target.value }))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new_company_function" className="text-right">
                    Función
                  </Label>
                  <Input
                    id="new_company_function"
                    value={newUserForm.company_function}
                    onChange={(e) => setNewUserForm(prev => ({ ...prev, company_function: e.target.value }))}
                    className="col-span-3"
                    placeholder="Función en la empresa"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="new_role" className="text-right">
                    Rol
                  </Label>
                  <Select 
                    value={newUserForm.role} 
                     onValueChange={(value: 'admin' | 'super_admin' | 'gestorRH' | 'gestorCO') => 
                      setNewUserForm(prev => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gestorRH">Gestor RH</SelectItem>
                      <SelectItem value="gestorCO">Gestor CO</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateUser} disabled={creating}>
                  {creating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creando...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Usuario
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Apellidos</TableHead>
              <TableHead>Función</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Registro</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.first_name || '-'}</TableCell>
                <TableCell>{user.last_name || '-'}</TableCell>
                <TableCell>{user.company_function || '-'}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full border ${getRoleBadgeColor(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(user.created_at)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Editar Usuario</DialogTitle>
                        <DialogDescription>
                          Modifica los datos y rol del usuario {user.email}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="first_name" className="text-right">
                            Nombre
                          </Label>
                          <Input
                            id="first_name"
                            value={editForm.first_name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, first_name: e.target.value }))}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="last_name" className="text-right">
                            Apellidos
                          </Label>
                          <Input
                            id="last_name"
                            value={editForm.last_name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, last_name: e.target.value }))}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="company_function" className="text-right">
                            Función
                          </Label>
                          <Input
                            id="company_function"
                            value={editForm.company_function}
                            onChange={(e) => setEditForm(prev => ({ ...prev, company_function: e.target.value }))}
                            className="col-span-3"
                            placeholder="Función en la empresa"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Rol
                          </Label>
                          <Select value={editForm.role} onValueChange={(value: 'admin' | 'super_admin' | 'gestorRH' | 'gestorCO') => setEditForm(prev => ({ ...prev, role: value }))}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              
                              <SelectItem value="gestorRH">Gestor RH</SelectItem>
                              <SelectItem value="gestorCO">Gestor CO</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleUpdateUser}>
                          <Save className="h-4 w-4 mr-2" />
                          Guardar Cambios
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. El usuario {user.email} será eliminado permanentemente del sistema.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteUser(user)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar Usuario
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {users.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay usuarios registrados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagement;