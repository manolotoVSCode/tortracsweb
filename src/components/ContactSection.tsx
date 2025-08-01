import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { MapPin, Phone, Mail, Clock, Linkedin, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle phone input to allow only numbers
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.company || !formData.email) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
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
      // Create email body
      const emailBody = `
Solicitud de Cotización - TORTRACS

Nombre: ${formData.name}
Empresa: ${formData.company}
Email: ${formData.email}
Teléfono: ${formData.phone}

Mensaje:
${formData.message}
      `;

      // Create mailto link
      const mailtoLink = `mailto:comercial@tortracs.net?subject=Solicitud de Cotización&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      toast({
        title: "Cotización enviada correctamente",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al enviar la cotización. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-secondary font-body">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        {t('contact.form.name')}
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        {t('contact.form.email')}
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        {t('contact.form.phone')}
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ejemplo: 5512345678"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-primary mb-2">
                        {t('contact.form.company')}
                      </label>
                      <Input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">
                      {t('contact.form.message')}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
                  >
                    {t('contact.form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  Datos de Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-primary" />
                    <p className="text-secondary font-body">
                      +52 55 9057 4880
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <p className="text-secondary font-body">
                      comercial@tortracs.net
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <p className="text-secondary font-body">
                      Lunes a Sábados de 8:00 a 18:00
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Linkedin className="h-6 w-6 text-primary" />
                    <a 
                      href="https://www.linkedin.com/company/tortracs" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent font-body underline"
                    >
                      LinkedIn - TORTRACS
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Facebook className="h-6 w-6 text-primary" />
                    <a 
                      href="https://www.facebook.com/share/16wkxqY6nD/?mibextid=wwXIfr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-accent font-body underline"
                    >
                      Facebook - TORTRACS
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;