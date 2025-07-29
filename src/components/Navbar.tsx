import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import tortracsLogo from '@/assets/tortracs-logo-text-only.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const navItems = [
    { key: 'nav.home', href: '#inicio' },
    { key: 'nav.about', href: '#sobre-tortracs' },
    { key: 'nav.services', href: '#servicios' },
    { key: 'nav.value', href: '#oferta-valor' },
    { key: 'nav.contact', href: '#contacto' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24 py-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <h1 className="text-3xl md:text-4xl font-heading font-bold">
                <span className="text-primary">TORT</span>
                <span className="text-secondary">RACS</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-secondary hover:text-primary px-3 py-2 text-sm font-semibold transition-colors duration-200"
                >
                  {t(item.key)}
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
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="font-semibold">{language.toUpperCase()}</span>
            </Button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-secondary hover:text-primary block px-3 py-2 text-base font-semibold transition-colors duration-200"
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