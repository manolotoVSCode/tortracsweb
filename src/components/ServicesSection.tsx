import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { EditableText } from '@/components/EditableText';
import { Truck, Package, Container, Zap, Users, Route } from 'lucide-react';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: 'Users',
      title: t('services.dedicated.title'),
      description: t('services.dedicated.description'),
    },
    {
      icon: 'Zap',
      title: t('services.spot.title'),
      description: t('services.spot.description'),
    },
    {
      icon: 'Container',
      title: t('services.containers.title'),
      description: t('services.containers.description'),
    },
    {
      icon: 'Package',
      title: t('services.ltl.title'),
      description: t('services.ltl.description'),
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            {t('services.title')}
          </h2>
          <EditableText
            contentKey="services.subtitle"
            fallback={t('services.subtitle')}
            as="p"
            className="text-lg text-secondary font-body max-w-4xl mx-auto leading-relaxed"
          />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-tortracs rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon === 'Users' && <Users className="h-10 w-10 text-white" />}
                    {service.icon === 'Zap' && <Zap className="h-10 w-10 text-white" />}
                    {service.icon === 'Container' && <Container className="h-10 w-10 text-white" />}
                    {service.icon === 'Package' && <Package className="h-10 w-10 text-white" />}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  {service.title}
                </h3>
                <p className="text-secondary font-body leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;