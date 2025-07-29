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
            {/* Corporate Office */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  {t('contact.info.corporate')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-secondary font-body">
                      {t('contact.info.corporate.address')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-secondary font-body">
                        Comercial: {t('contact.info.commercial.phone')}
                      </p>
                      <p className="text-secondary font-body">
                        RH: {t('contact.info.hr.phone')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-secondary font-body">
                        {t('contact.info.commercial.email')}
                      </p>
                      <p className="text-secondary font-body">
                        {t('contact.info.hr.email')}
                      </p>
                    </div>
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

            {/* Operations */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  {t('contact.info.operations')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <p className="text-secondary font-body">
                      {t('contact.info.operations.address')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Maps */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.4985986728623!2d-99.19397062471431!3d19.43226394189033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d201f5b4b0b5a7%3A0x8b0c8b5c6a5e4b5c!2sAlejandro%20Dumas%20145%2C%20Polanco%2C%20Polanco%20IV%20Secc%2C%20Miguel%20Hidalgo%2C%2011550%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses!2smx!4v1642857490000"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="TORTRACS Ciudad de México Office"
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