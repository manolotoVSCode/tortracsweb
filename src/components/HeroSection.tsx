import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { ArrowRight, Truck, Shield, Clock, MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-trucks-motion.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-corporate overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Flota de camiones TORTRACS" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-professional opacity-90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/20">
                <Truck className="h-4 w-4 mr-2" />
                Líder en Transporte de Carga
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-white leading-tight">
                <span className="block">Soluciones</span>
                <span className="block">Logísticas</span>
                <span className="block text-white/80">Profesionales</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 font-body leading-relaxed max-w-2xl">
                Transportamos tu carga con tecnología avanzada, rastreo 24/7 y el más alto 
                nivel de seguridad en México y Norteamérica.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-4 h-auto shadow-professional transition-all duration-300 hover:scale-105"
              >
                Solicitar Cotización
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold text-lg px-8 py-4 h-auto transition-all duration-300"
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver Servicios
              </Button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3 text-white/90">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">100% Seguro</p>
                  <p className="text-sm text-white/70">Carga protegida</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-white/90">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">24/7 Rastreo</p>
                  <p className="text-sm text-white/70">Monitoreo continuo</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-white/90">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Cobertura Total</p>
                  <p className="text-sm text-white/70">México y EEUU</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="lg:flex lg:justify-end animate-slide-up">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-professional max-w-md w-full">
              <h3 className="text-2xl font-heading font-bold text-primary mb-6">
                Nuestra Experiencia
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-secondary font-medium">Años de experiencia</span>
                  <span className="text-3xl font-bold text-primary">15+</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-secondary font-medium">Clientes satisfechos</span>
                  <span className="text-3xl font-bold text-primary">1000+</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-secondary font-medium">Unidades en flota</span>
                  <span className="text-3xl font-bold text-primary">200+</span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-secondary font-medium">Entregas exitosas</span>
                  <span className="text-3xl font-bold text-primary">99.9%</span>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-corporate-light rounded-lg">
                <p className="text-sm text-secondary font-medium text-center">
                  ✓ Certificaciones ISO y C-TPAT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center text-white/60">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full mb-2 relative">
            <div className="w-1 h-3 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
          </div>
          <span className="text-xs font-medium">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;