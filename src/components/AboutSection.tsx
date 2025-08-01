import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { History, Target, Eye, Heart, TrendingUp, Users, MapPin, Truck, Shield, Handshake, Zap, Compass, Route } from 'lucide-react';

const AboutSection = () => {
  const { t } = useLanguage();

  const metrics = [
    { icon: TrendingUp, label: t('about.metrics.experience'), key: 'experience' },
    { icon: MapPin, label: t('about.metrics.routes'), key: 'routes' },
    { icon: Users, label: t('about.metrics.clients'), key: 'clients' },
    { icon: Truck, label: t('about.metrics.fleet'), key: 'fleet' },
    { icon: Shield, label: t('about.metrics.carbonFootprint'), key: 'carbonFootprint' },
    { icon: Route, label: t('about.metrics.kilometers'), key: 'kilometers' },
  ];

  const values = [
    { icon: Shield, text: t('about.values.safety') },
    { icon: Handshake, text: t('about.values.responsibility') },
    { icon: Heart, text: t('about.values.closeness') },
    { icon: Eye, text: t('about.values.transparency') },
    { icon: Zap, text: t('about.values.resilience') },
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

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - History */}
          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <History className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-heading font-bold text-primary">
                    {t('about.history.title')}
                  </h3>
                </div>
                <p className="text-secondary text-lg leading-relaxed font-body">
                  {t('about.history.content')}
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
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

            {/* Vision */}
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

          {/* Right Column - Values & Metrics */}
          <div className="space-y-8">
            {/* Values */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  {t('about.values.title')}
                </h3>
                <div className="space-y-4">
                  {values.map((value, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <value.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <p className="text-secondary font-body text-lg">{value.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                  {t('about.metrics.title')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <metric.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <p className="text-primary font-heading font-bold text-sm">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;