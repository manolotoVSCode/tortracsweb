import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const navItems = [
    { key: 'nav.about', href: '#sobre-tortracs' },
    { key: 'nav.services', href: '#servicios' },
    { key: 'nav.value', href: '#oferta-valor' },
    { key: 'nav.clients', href: '#clientes' },
    { key: 'nav.jobs', href: '/bolsa-de-trabajo' },
    { key: 'nav.contact', href: '#contacto' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200/20 shadow-medium transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 py-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#inicio" className="flex items-center group">
              <div className="relative">
                <h1 className="text-3xl md:text-4xl font-heading font-bold transition-all duration-300 group-hover:scale-105">
                  <span className="text-primary">TORT</span>
                  <span className="text-secondary">RACS</span>
                </h1>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-corporate transition-all duration-300 group-hover:w-full"></div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="relative px-4 py-2 text-secondary hover:text-primary font-medium transition-all duration-300 group rounded-lg hover:bg-corporate-light"
                >
                  <span className="relative z-10">{t(item.key)}</span>
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Language Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2 hover:bg-corporate-light transition-all duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="font-semibold">{language.toUpperCase()}</span>
            </Button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-corporate-light transition-all duration-200"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200/20">
            <div className="px-2 pt-4 pb-6 space-y-2 bg-white/95 backdrop-blur-md">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="block px-4 py-3 text-secondary hover:text-primary hover:bg-corporate-light font-medium transition-all duration-200 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;