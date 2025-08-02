
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { History, Target, Eye, Heart, TrendingUp, Users, MapPin, Truck, Shield, Handshake, Zap, Compass, Route } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);

  const metrics = [
    { icon: TrendingUp, label: '10+', subtext: 'Años de experiencia', percentage: 85, color: '#3B82F6' },
    { icon: MapPin, label: '500+', subtext: 'Rutas', percentage: 90, color: '#10B981' },
    { icon: Users, label: '70+', subtext: 'Clientes satisfechos', percentage: 75, color: '#F59E0B' },
    { icon: Truck, label: '80+', subtext: 'Unidades', percentage: 80, color: '#EF4444' },
    { icon: Shield, label: 'Neutral', subtext: 'Huella de carbono', percentage: 70, color: '#8B5CF6' },
    { icon: Route, label: '6M+', subtext: 'Km/año recorridos', percentage: 95, color: '#06B6D4' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (metricsRef.current) {
      observer.observe(metricsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const CircularProgress = ({ percentage, color, size = 120, strokeWidth = 8, delay = 0 }: {
    percentage: number;
    color: string;
    size?: number;
    strokeWidth?: number;
    delay?: number;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? offset : circumference}
            className="transition-all duration-2000 ease-out"
            style={{ transitionDelay: `${delay}ms` }}
          />
        </svg>
      </div>
    );
  };

  const values = [
    { icon: Zap, text: t('about.values.resilience') },
    { icon: Shield, text: t('about.values.safety') },
    { icon: Handshake, text: t('about.values.responsibility') },
    { icon: Eye, text: t('about.values.transparency') },
    { icon: Compass, text: t('about.values.commitment') },
  ];

  return (
    <section id="sobre-tortracs" className="py-20 bg-tortracs-light-gray">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            {t('about.title')}
          </h2>
        </div>

        <div className="space-y-12">
          {/* Nuestra Historia - Full Width */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <History className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-3xl font-heading font-bold text-primary">
                  {t('about.history.title')}
                </h3>
              </div>
              <div className="text-secondary text-lg leading-relaxed font-body whitespace-pre-line">
                {t('about.history.content')}
              </div>
            </CardContent>
          </Card>

          {/* Misión y Visión - Two Columns */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Misión */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-heading font-bold text-primary">
                    {t('about.mission.title')}
                  </h3>
                </div>
                <p className="text-secondary text-lg leading-relaxed font-body">
                  {t('about.mission.content')}
                </p>
              </CardContent>
            </Card>

            {/* Visión */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-heading font-bold text-primary">
                    {t('about.vision.title')}
                  </h3>
                </div>
                <p className="text-secondary text-lg leading-relaxed font-body">
                  {t('about.vision.content')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Nuestros Valores - Full Width */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-3xl font-heading font-bold text-primary mb-8 text-center">
                {t('about.values.title')}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="text-center p-6 rounded-lg bg-background/50">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="text-xl font-heading font-bold text-primary mb-3 text-center">
                      {value.text.split(':')[0]}
                    </h4>
                    <p className="text-secondary font-body text-base leading-relaxed text-justify">
                      {value.text.split(':').slice(1).join(':').trim()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Métricas - Full Width with Circular Graphics */}
          <Card className="border-none shadow-lg" ref={metricsRef}>
            <CardContent className="p-8">
              <h3 className="text-3xl font-heading font-bold text-primary mb-12 text-center">
                {t('about.metrics.title')}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center group">
                    <div className="relative mb-4 inline-block">
                      <CircularProgress 
                        percentage={metric.percentage} 
                        color={metric.color}
                        delay={index * 200}
                      />
                      {/* Content inside circle */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <metric.icon className="h-8 w-8 mb-2" style={{ color: metric.color }} />
                        <p className="text-lg font-heading font-bold leading-tight" style={{ color: metric.color }}>
                          {metric.label}
                        </p>
                      </div>
                    </div>
                    {/* Comment below circle */}
                    <p className="text-secondary font-body text-sm">
                      {metric.subtext}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
