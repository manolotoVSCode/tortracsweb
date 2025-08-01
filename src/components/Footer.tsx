import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin, Facebook } from 'lucide-react';
import tortracsLogo from '@/assets/tortracs-logo-text-only.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-end">
          {/* Logo, Company Name and Addresses */}
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-heading font-bold leading-tight">
                <span className="text-white">TORT</span>
                <span className="text-white/80">RACS</span>
              </h3>
            </div>
            <p className="text-white/80 font-body text-xs leading-tight -mt-1 mb-3">
              Soluciones de transporte confiables
            </p>
            
            {/* Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-white/80 font-body" style={{ fontSize: '0.625rem' }}>
                <p className="font-semibold text-white mb-1">Corporativo</p>
                <p>Alejandro Dumas, 145</p>
                <p>11550, Polanco, Miguel Hidalgo</p>
                <p>CDMX</p>
              </div>
              <div className="text-white/80 font-body" style={{ fontSize: '0.625rem' }}>
                <p className="font-semibold text-white mb-1">Patio Cuatitlán</p>
                <p>Calle 5, 14</p>
                <p>54879, La Palma, Cuatlitlán</p>
                <p>Estado de México</p>
              </div>
            </div>
          </div>

          {/* Copyright, Privacy and Social Links */}
          <div className="flex flex-col items-end text-right space-y-2">
            <p className="text-white/80 font-body text-xs">
              © TORTRACS 2025. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="/privacy-policy"
                className="text-white/80 hover:text-white font-body text-xs transition-colors duration-200"
              >
                {t('footer.privacy')}
              </a>
              <a 
                href="https://www.linkedin.com/company/tortracs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a 
                href="https://www.facebook.com/share/16wkxqY6nD/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;