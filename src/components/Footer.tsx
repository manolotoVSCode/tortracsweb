import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo and Company Name */}
          <div>
            <h3 className="text-2xl font-heading font-bold mb-2">TORTRACS</h3>
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
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
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