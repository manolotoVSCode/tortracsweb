import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';
import { MapPin, Phone, Mail, Clock, Linkedin } from 'lucide-react';
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Cotización enviada",
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
                      required
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
                    required
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
          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  {t('contact.info.title')}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-secondary font-body">
                      {t('contact.info.address')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-primary" />
                    <p className="text-secondary font-body">
                      {t('contact.info.phone')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <p className="text-secondary font-body">
                      {t('contact.info.email')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6 text-primary" />
                    <p className="text-secondary font-body">
                      {t('contact.info.hours')}
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
                </div>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3595.1234567890!2d-100.31234567890!3d25.67890123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMonterrey%2C%20Nuevo%20Le%C3%B3n!5e0!3m2!1ses!2smx!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TORTRACS Monterrey Office"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;