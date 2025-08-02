import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { Link, useLocation } from 'react-router-dom';
import tortracsLogo from '@/assets/tortracs-logo-text-only.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  const navItems = [
    { key: 'nav.about', href: '#sobre-tortracs', isHash: true },
    { key: 'nav.services', href: '#servicios', isHash: true },
    { key: 'nav.value', href: '#oferta-valor', isHash: true },
    { key: 'nav.clients', href: '#clientes', isHash: true },
    { key: 'nav.jobs', href: '/bolsa-de-trabajo', isHash: false },
    { key: 'nav.contact', href: '#contacto', isHash: true },
  ];

  const handleNavClick = (href: string, isHash: boolean) => {
    if (location.pathname !== '/' && isHash) {
      // If we're not on home page and clicking a hash link, go home first
      window.location.href = '/' + href;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24 py-2">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-3xl md:text-4xl font-heading font-bold">
                <span className="text-primary">TORT</span>
                <span className="text-secondary">RACS</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                item.isHash ? (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => handleNavClick(item.href, item.isHash)}
                    className="text-secondary hover:text-primary px-3 py-2 text-sm font-semibold transition-colors duration-200"
                  >
                    {t(item.key)}
                  </a>
                ) : (
                  <Link
                    key={item.key}
                    to={item.href}
                    className="text-secondary hover:text-primary px-3 py-2 text-sm font-semibold transition-colors duration-200"
                  >
                    {t(item.key)}
                  </Link>
                )
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
                item.isHash ? (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => {
                      handleNavClick(item.href, item.isHash);
                      setIsOpen(false);
                    }}
                    className="text-secondary hover:text-primary block px-3 py-2 text-base font-semibold transition-colors duration-200"
                  >
                    {t(item.key)}
                  </a>
                ) : (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-secondary hover:text-primary block px-3 py-2 text-base font-semibold transition-colors duration-200"
                  >
                    {t(item.key)}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;