import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin, Facebook, MapPin } from 'lucide-react';
import tortracsLogo from '@/assets/tortracs-logo-text-only.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Logo and Company Name */}
          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-2xl font-heading font-bold">
                <span className="text-white">TORT</span>
                <span className="text-white/80">RACS</span>
              </h3>
            </div>
            <p className="text-white/80 font-body">
              Soluciones de transporte confiables
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-6">
              <a 
                href="/privacy-policy"
                className="text-white/80 hover:text-white font-body transition-colors duration-200"
              >
                {t('footer.privacy')}
              </a>
              <a 
                href="https://www.linkedin.com/company/tortracs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://www.facebook.com/share/16wkxqY6nD/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Addresses and Copyright */}
          <div className="text-right">
            <div className="space-y-3 mb-4">
              <div className="text-white/80 font-body text-sm">
                <div className="flex items-start justify-end space-x-2 mb-2">
                  <div className="text-right">
                    <p className="font-semibold text-white">Corporativo</p>
                    <p>Alejandro Dumas, 145</p>
                    <p>11550, Polanco, Miguel Hidalgo</p>
                    <p>CDMX</p>
                  </div>
                  <MapPin className="h-4 w-4 text-white/60 mt-1 flex-shrink-0" />
                </div>
              </div>
              <div className="text-white/80 font-body text-sm">
                <div className="flex items-start justify-end space-x-2">
                  <div className="text-right">
                    <p className="font-semibold text-white">Patio Cuatitlán</p>
                    <p>Calle 5, 14</p>
                    <p>54879, La Palma, Cuatlitlán</p>
                    <p>Estado de México</p>
                  </div>
                  <MapPin className="h-4 w-4 text-white/60 mt-1 flex-shrink-0" />
                </div>
              </div>
            </div>
            <p className="text-white/80 font-body text-sm">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;