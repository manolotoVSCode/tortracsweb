import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin, Facebook } from 'lucide-react';
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
              <h3 className="text-xl font-heading font-bold">
                <span className="text-white">TORT</span>
                <span className="text-white/80">RACS</span>
              </h3>
            </div>
            <p className="text-white/80 font-body text-sm mb-2">
              Soluciones de transporte confiables
            </p>
            <p className="text-white/80 font-body text-sm">
              © TORTRACS 2025. Todos los derechos reservados.
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

          {/* Addresses */}
          <div className="text-left">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-white/80 font-body text-xs">
                <div className="text-left">
                  <p className="font-semibold text-white mb-1">Corporativo</p>
                  <p>Alejandro Dumas, 145</p>
                  <p>11550, Polanco, Miguel Hidalgo</p>
                  <p>CDMX</p>
                </div>
              </div>
              <div className="text-white/80 font-body text-xs">
                <div className="text-left">
                  <p className="font-semibold text-white mb-1">Patio Cuatitlán</p>
                  <p>Calle 5, 14</p>
                  <p>54879, La Palma, Cuatlitlán</p>
                  <p>Estado de México</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;