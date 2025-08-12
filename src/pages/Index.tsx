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
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question","name": "¿Qué servicios ofrecen?","acceptedAnswer": {"@type": "Answer","text": "FTL (carga completa), LTL (consolidada), refrigerados y gestión aduanal para cruces México–EE.UU."}},
        {"@type": "Question","name": "¿Tienen cobertura nacional?","acceptedAnswer": {"@type": "Answer","text": "Sí, cobertura en CDMX, MTY, GDL, Bajío y corredores a frontera con rastreo 24/7."}},
        {"@type": "Question","name": "¿Cómo solicito una cotización?","acceptedAnswer": {"@type": "Answer","text": "Desde el formulario de contacto indicando origen, destino, dimensiones/peso y tipo de mercancía."}}
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {"@type": "SiteNavigationElement", "name": "FTL", "url": typeof window !== 'undefined' ? `${window.location.origin}/servicios/ftl` : '/servicios/ftl'},
        {"@type": "SiteNavigationElement", "name": "LTL", "url": typeof window !== 'undefined' ? `${window.location.origin}/servicios/ltl` : '/servicios/ltl'},
        {"@type": "SiteNavigationElement", "name": "Refrigerados", "url": typeof window !== 'undefined' ? `${window.location.origin}/servicios/refrigerados` : '/servicios/refrigerados'},
        {"@type": "SiteNavigationElement", "name": "Gestión Aduanal", "url": typeof window !== 'undefined' ? `${window.location.origin}/servicios/gestion-aduanal` : '/servicios/gestion-aduanal'}
      ]
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
