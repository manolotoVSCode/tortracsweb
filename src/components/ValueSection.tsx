import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { EditableText } from '@/components/EditableText';
import { Award, Satellite, MonitorSpeaker, GraduationCap, Wrench, Quote, Handshake } from 'lucide-react';
import canacarLogo from '/lovable-uploads/db1e1dcd-725e-4168-a8f7-aac25fa99daf.png';
import anerpvLogo from '/lovable-uploads/0beca359-2968-4f97-8e63-6add53ecd970.png';

const ValueSection = () => {
  const { t } = useLanguage();

  const differentiators = [
    {
      icon: Award,
      title: t('value.operators.title'),
      description: t('value.operators.description'),
    },
    {
      icon: Satellite,
      title: t('value.tracking.title'),
      description: t('value.tracking.description'),
    },
    {
      icon: MonitorSpeaker,
      title: t('value.monitoring.title'),
      description: t('value.monitoring.description'),
    },
    {
      icon: GraduationCap,
      title: t('value.training.title'),
      description: t('value.training.description'),
    },
    {
      icon: Wrench,
      title: t('value.infrastructure.title'),
      description: t('value.infrastructure.description'),
    },
    {
      icon: Handshake,
      title: t('value.alliance.title'),
      description: t('value.alliance.description'),
    },
  ];

  const testimonials = [
    {
      content: t('value.testimonial1.content'),
      author: t('value.testimonial1.author'),
    },
    {
      content: t('value.testimonial2.content'),
      author: t('value.testimonial2.author'),
    },
  ];

  return (
    <section id="oferta-valor" className="py-20 bg-tortracs-light-blue">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            <span className="text-tortracs-navy">{t('value.title').split(' ')[0]}</span>{' '}
            <span>{t('value.title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <EditableText
            contentKey="value.subtitle"
            fallback={t('value.subtitle')}
            as="p"
            className="text-xl text-secondary font-body"
          />
        </div>

        {/* Differentiators */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {differentiators.map((item, index) => (
            <Card 
              key={index} 
              className="border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {item.icon === Award && <Award className="h-8 w-8 text-white" />}
                    {item.icon === Satellite && <Satellite className="h-8 w-8 text-white" />}
                    {item.icon === MonitorSpeaker && <MonitorSpeaker className="h-8 w-8 text-white" />}
                    {item.icon === GraduationCap && <GraduationCap className="h-8 w-8 text-white" />}
                    {item.icon === Wrench && <Wrench className="h-8 w-8 text-white" />}
                    {item.icon === Handshake && <Handshake className="h-8 w-8 text-white" />}
                  </div>
                </div>
                <h3 className="text-lg font-heading font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-secondary font-body text-sm leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials - Hidden temporarily */}
        <div className="mb-16 hidden">
          <h3 className="text-3xl font-heading font-bold text-primary text-center mb-12">
            {t('value.testimonials.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-secondary font-body text-lg italic mb-6 leading-relaxed">
                    {testimonial.content}
                  </p>
                  <p className="text-primary font-semibold">
                    {testimonial.author}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Associations */}
        <div className="text-center">
          <h3 className="text-3xl font-heading font-bold text-primary mb-8">
            {t('value.associations')}
          </h3>
          <div className="flex justify-center items-center space-x-20">
            {/* CANACAR Logo */}
            <div className="flex items-center justify-center">
              <img 
                src={canacarLogo} 
                alt="CANACAR" 
                className="w-60 h-auto object-contain filter grayscale"
              />
            </div>
            
            {/* ANERPV Logo */}
            <div className="flex items-center justify-center">
              <img 
                src={anerpvLogo} 
                alt="ANERPV" 
                className="w-60 h-auto object-contain filter grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;