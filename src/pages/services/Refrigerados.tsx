import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

const ServiceRefrigerados = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": typeof window !== 'undefined' ? window.location.origin : '' },
        { "@type": "ListItem", "position": 2, "name": "Servicios", "item": typeof window !== 'undefined' ? `${window.location.origin}/#servicios` : '/#servicios' },
        { "@type": "ListItem", "position": 3, "name": "Transporte Refrigerado" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Transporte refrigerado y temperatura controlada",
      "provider": { "@type": "Organization", "name": "TORTRACS" },
      "areaServed": ["México", "Norteamérica"],
      "serviceType": "Refrigerados",
      "description": "Cadena de frío confiable para alimentos, farmacéuticos y bienes sensibles."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question","name": "¿Qué rangos de temperatura manejan?","acceptedAnswer": {"@type": "Answer","text": "Rangos desde congelado hasta refrigerado. Monitoreo continuo y registros por viaje."}},
        {"@type": "Question","name": "¿Cómo garantizan la cadena de frío?","acceptedAnswer": {"@type": "Answer","text": "Unidades certificadas, calibración, sellos y evidencia de temperatura en ruta y entrega."}}
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Transporte refrigerado y temperatura controlada | TORTRACS"
        description="Cadena de frío confiable para alimentos, farmacéuticos y productos sensibles con monitoreo continuo."
        canonical="/servicios/refrigerados"
        image="/hero-trucks-electric-future.jpg"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <nav aria-label="breadcrumb" className="text-sm text-secondary mb-6">
            <Link to="/" className="story-link">Inicio</Link>
            <span className="mx-2">/</span>
            <a href="/#servicios" className="story-link">Servicios</a>
            <span className="mx-2">/</span>
            <span className="text-primary font-semibold">Transporte Refrigerado</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-primary mb-4">Transporte refrigerado y temperatura controlada</h1>
            <p className="text-lg text-secondary font-body max-w-3xl">Cuidado integral de la cadena de frío para asegurar calidad, seguridad y cumplimiento en cada entrega.</p>
          </header>

          <section className="grid md:grid-cols-2 gap-8 items-start mb-12">
            <img src="/hero-trucks-night-city.jpg" alt="Transporte refrigerado y temperatura controlada TORTRACS" className="w-full rounded-lg shadow-lg" loading="lazy" />
            <article>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">Capacidades clave</h2>
              <ul className="list-disc pl-5 space-y-2 text-secondary">
                <li>Unidades refrigeradas certificadas</li>
                <li>Monitoreo y registros de temperatura</li>
                <li>Manejo especializado por categoría</li>
                <li>Respuesta 24/7 a eventos críticos</li>
              </ul>
            </article>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <details className="bg-card border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">¿Atienden múltiples puntos de entrega?</summary>
                <p className="mt-2 text-secondary">Sí, diseñamos rutas multistop manteniendo la temperatura objetivo y ventanas de entrega.</p>
              </details>
              <details className="bg-card border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">¿Entregan evidencia de temperatura?</summary>
                <p className="mt-2 text-secondary">Compartimos registros y bitácoras de temperatura como parte de la prueba de entrega.</p>
              </details>
            </div>
          </section>

          <aside className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="text-xl font-heading font-bold text-primary mb-2">¿Listo para cotizar?</h3>
            <p className="text-secondary mb-4">Compártenos tu perfil de temperatura, volúmenes y destinos.</p>
            <a href="/#contacto" className="bg-primary text-white px-5 py-3 rounded-md hover:bg-primary/90 inline-block">Solicitar cotización</a>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceRefrigerados;
