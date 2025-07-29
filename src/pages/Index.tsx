import { LanguageProvider } from '@/hooks/useLanguage';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ValueSection from '@/components/ValueSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navbar />
        <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ValueSection />
      <ClientsSection />
      <ContactSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
