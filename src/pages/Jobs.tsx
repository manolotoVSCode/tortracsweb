import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Users, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { LanguageProvider } from '@/hooks/useLanguage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';

const Jobs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    department: '',
    fullName: '',
    phone: '',
    email: '',
    cv: null as File | null,
  });

  const departments = [
    'Mecánica',
    'Operación', 
    'Administración',
    'Monitoreo',
    'Ventas',
    'Compras/Almacén'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: numericValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (allowedTypes.includes(file.type)) {
        setFormData(prev => ({
          ...prev,
          cv: file
        }));
      } else {
        toast({
          title: "Error",
          description: "Solo se permiten archivos PDF o Word (.doc, .docx)",
          variant: "destructive",
        });
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.department || !formData.fullName || !formData.email || !formData.cv) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios y adjunte su CV.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Por favor ingrese un email válido.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('=== STARTING JOB APPLICATION SUBMISSION ===');
      console.log('Form data:', formData);
      // Upload CV file to Supabase Storage
      const fileExt = formData.cv.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('cv-uploads')
        .upload(filePath, formData.cv);

      if (uploadError) {
        throw uploadError;
      }

      // Save job application to database
      const { error: dbError } = await supabase
        .from('job_applications')
        .insert({
          department: formData.department,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          cv_filename: formData.cv.name,
          cv_file_path: filePath,
        });

      if (dbError) {
        throw dbError;
      }

      // Send notification emails
      console.log('Sending job notification email...');
      try {
        const { data, error: emailError } = await supabase.functions.invoke('send-job-notification', {
          body: {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            department: formData.department,
            cv_filename: formData.cv.name,
          },
        });

        if (emailError) {
          console.error('Email notification failed:', emailError);
          toast({
            title: "Error al enviar notificación",
            description: `Error: ${emailError.message || 'Error desconocido'}`,
            variant: "destructive",
          });
        } else {
          console.log('Email notification sent successfully:', data);
        }
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        toast({
          title: "Error al enviar notificación",
          description: `Error: ${emailError.message || 'Error desconocido'}`,
          variant: "destructive",
        });
      }

      toast({
        title: "Aplicación enviada correctamente",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      
      setFormData({
        department: '',
        fullName: '',
        phone: '',
        email: '',
        cv: null,
      });
      
      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Error submitting job application:', error);
      toast({
        title: "Error",
        description: "Hubo un error al enviar la aplicación. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Header */}
            <div className="text-center mb-12">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="mb-8 text-primary hover:text-primary/80"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
              
              <div className="flex justify-center mb-6">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Briefcase className="h-12 w-12 text-primary" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Bolsa de Trabajo
              </h1>
              
              <p className="text-xl text-secondary font-body max-w-3xl mx-auto leading-relaxed">
                Únete a nuestro equipo de profesionales comprometidos con la excelencia en el transporte. 
                En TORTRACS valoramos el talento, la dedicación y la pasión por brindar soluciones logísticas 
                de calidad. Descubre las oportunidades que tenemos para ti y forma parte de nuestra familia.
              </p>
            </div>

            {/* Application Form */}
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center mb-8">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    Formulario de Aplicación
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Department Selection */}
                  <div>
                    <Label htmlFor="department" className="text-primary font-semibold mb-2 block">
                      Departamento *
                    </Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Personal Information */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-primary font-semibold mb-2 block">
                        Nombre completo *
                      </Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-primary font-semibold mb-2 block">
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ejemplo: 5512345678"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-primary font-semibold mb-2 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <Label htmlFor="cv-upload" className="text-primary font-semibold mb-2 block">
                      Curriculum Vitae * (PDF o Word)
                    </Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <div className="space-y-2">
                        <Input
                          id="cv-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Label
                          htmlFor="cv-upload"
                          className="cursor-pointer text-primary hover:text-primary/80 font-medium"
                        >
                          Haz clic para seleccionar tu CV
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Formatos permitidos: PDF, DOC, DOCX (máx. 10MB)
                        </p>
                        {formData.cv && (
                          <p className="text-sm text-primary font-medium">
                            Archivo seleccionado: {formData.cv.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 text-lg"
                  >
                    Enviar Aplicación
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Jobs;