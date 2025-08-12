import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import ValueSection from '@/components/ValueSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Index = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TORTRACS",
      "url": typeof window !== 'undefined' ? window.location.origin : '',
      "logo": typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : '/favicon.ico',
      "areaServed": ["México", "Norteamérica"],
      "description": "Soluciones de transporte de carga: FTL, LTL, refrigerados y gestión aduanal."
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "TORTRACS",
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    }
  ];
  return (
    <div className="min-h-screen">
        <SEO title="Transporte de carga en México | TORTRACS" description="Transporte de carga FTL y LTL, refrigerados y gestión aduanal. Flota moderna con rastreo 24/7." canonical="/" image="/hero-trucks-highway.jpg" jsonLd={jsonLd} />
        <Navbar />
        <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ValueSection />
      <ClientsSection />
      <ContactSection />
        <Footer />
      </div>
  );
};

export default Index;
