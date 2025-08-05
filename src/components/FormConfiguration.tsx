import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Settings, Edit, Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface FormConfig {
  id: string;
  form_type: string;
  from_email: string;
  to_email: string;
  subject: string;
  template_content: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const FormConfiguration = () => {
  const [configs, setConfigs] = useState<FormConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingConfig, setEditingConfig] = useState<FormConfig | null>(null);
  const [editForm, setEditForm] = useState({
    from_email: '',
    to_email: '',
    subject: '',
    template_content: '',
    is_active: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('form_configurations')
        .select('*')
        .order('form_type');

      if (error) throw error;

      setConfigs(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al cargar configuraciones",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditConfig = (config: FormConfig) => {
    setEditingConfig(config);
    setEditForm({
      from_email: config.from_email,
      to_email: config.to_email,
      subject: config.subject,
      template_content: config.template_content || '',
      is_active: config.is_active
    });
  };

  const handleUpdateConfig = async () => {
    if (!editingConfig) return;

    try {
      const { error } = await supabase
        .from('form_configurations')
        .update({
          from_email: editForm.from_email,
          to_email: editForm.to_email,
          subject: editForm.subject,
          template_content: editForm.template_content || null,
          is_active: editForm.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingConfig.id);

      if (error) throw error;

      toast({
        title: "Configuración actualizada",
        description: "Los cambios se han guardado correctamente",
      });

      setEditingConfig(null);
      fetchConfigs(); // Refresh the list
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error al actualizar configuración",
        description: error.message,
      });
    }
  };

  const getFormTypeName = (formType: string) => {
    const names = {
      contact_notification: 'Notificación de Contacto (TORTRACS)',
      contact_confirmation: 'Confirmación de Contacto (Usuario)',
      job_notification: 'Notificación de Trabajo (TORTRACS)',
      job_confirmation: 'Confirmación de Trabajo (Usuario)',
      rejection_notification: 'Notificación de Rechazo'
    };
    return names[formType as keyof typeof names] || formType;
  };

  const getFormTypeDescription = (formType: string) => {
    const descriptions = {
      contact_notification: 'Email enviado a TORTRACS cuando se recibe una nueva solicitud de cotización',
      contact_confirmation: 'Email de confirmación enviado al usuario que envió la solicitud',
      job_notification: 'Email enviado a TORTRACS cuando se recibe una nueva aplicación de trabajo',
      job_confirmation: 'Email de confirmación enviado al usuario que aplicó al trabajo',
      rejection_notification: 'Email enviado a candidatos cuando su aplicación es rechazada'
    };
    return descriptions[formType as keyof typeof descriptions] || '';
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Cargando configuraciones...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Configuración de Formularios
        </CardTitle>
        <CardDescription>
          Configurar emails y parámetros de los formularios del sitio web (Solo Super Admin)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo de Formulario</TableHead>
              <TableHead>De (From)</TableHead>
              <TableHead>Para (To)</TableHead>
              <TableHead>Asunto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {configs.map((config) => (
              <TableRow key={config.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{getFormTypeName(config.form_type)}</div>
                    <div className="text-sm text-muted-foreground">
                      {getFormTypeDescription(config.form_type)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{config.from_email}</TableCell>
                <TableCell className="font-mono text-sm">{config.to_email || <span className="text-muted-foreground italic">Sin configurar</span>}</TableCell>
                <TableCell className="max-w-xs truncate">{config.subject}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    config.is_active 
                      ? 'bg-green-100 text-green-800 border border-green-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {config.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditConfig(config)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Configurar {getFormTypeName(config.form_type)}</DialogTitle>
                        <DialogDescription>
                          {getFormTypeDescription(config.form_type)}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="from_email" className="text-right">
                            De (From)
                          </Label>
                          <Input
                            id="from_email"
                            type="email"
                            value={editForm.from_email}
                            onChange={(e) => setEditForm(prev => ({ ...prev, from_email: e.target.value }))}
                            className="col-span-3"
                            placeholder="no-reply@tortracs.net"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="to_email" className="text-right">
                            Para (To)
                          </Label>
                          <Input
                            id="to_email"
                            type="email"
                            value={editForm.to_email}
                            onChange={(e) => setEditForm(prev => ({ ...prev, to_email: e.target.value }))}
                            className="col-span-3"
                            placeholder="destinatario@tortracs.net"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="subject" className="text-right">
                            Asunto
                          </Label>
                          <Input
                            id="subject"
                            value={editForm.subject}
                            onChange={(e) => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
                            className="col-span-3"
                            placeholder="Asunto del email"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="template_content" className="text-right mt-2">
                            Cuerpo del Email
                          </Label>
                          <div className="col-span-3">
                            <ReactQuill
                              theme="snow"
                              value={editForm.template_content}
                              onChange={(value) => setEditForm(prev => ({ ...prev, template_content: value }))}
                              style={{ minHeight: '150px' }}
                              modules={{
                                toolbar: [
                                  [{ 'header': [1, 2, 3, false] }],
                                  ['bold', 'italic', 'underline'],
                                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                  ['link'],
                                  [{ 'color': [] }, { 'background': [] }],
                                  ['clean']
                                ]
                              }}
                              placeholder="Escriba aquí el contenido del email..."
                            />
                            <p className="text-sm text-muted-foreground mt-2">
                              Tip: Use variables como {"{{"} name {"}"}, {"{{"} email {"}"}, {"{{"} company {"}"} para personalizar el mensaje
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="is_active" className="text-right">
                            Activo
                          </Label>
                          <Switch
                            id="is_active"
                            checked={editForm.is_active}
                            onCheckedChange={(checked) => setEditForm(prev => ({ ...prev, is_active: checked }))}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleUpdateConfig}>
                          <Save className="h-4 w-4 mr-2" />
                          Guardar Cambios
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {configs.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No hay configuraciones disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormConfiguration;