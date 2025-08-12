import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

const ServiceFTL = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": typeof window !== 'undefined' ? window.location.origin : '' },
        { "@type": "ListItem", "position": 2, "name": "Servicios", "item": typeof window !== 'undefined' ? `${window.location.origin}/#servicios` : '/#servicios' },
        { "@type": "ListItem", "position": 3, "name": "Transporte FTL" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Transporte FTL (Full Truckload)",
      "provider": { "@type": "Organization", "name": "TORTRACS" },
      "areaServed": ["México", "Norteamérica"],
      "serviceType": "Transporte de carga completa",
      "description": "Transporte FTL con unidades dedicadas, seguridad y rastreo 24/7."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question","name": "¿Qué es FTL?","acceptedAnswer": {"@type": "Answer","text": "FTL (Full Truckload) es el servicio donde una unidad se asigna exclusivamente a tu carga, ideal para altos volúmenes o envíos urgentes."}},
        {"@type": "Question","name": "¿Qué cobertura tienen?","acceptedAnswer": {"@type": "Answer","text": "Cobertura nacional e internacional en corredores México–EE.UU., con coordinación de cruces fronterizos."}},
        {"@type": "Question","name": "¿Cómo monitorean la carga?","acceptedAnswer": {"@type": "Answer","text": "Rastreo GPS 24/7, pruebas de entrega y comunicación proactiva en hitos clave."}}
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Transporte FTL (carga completa) | TORTRACS"
        description="Servicio FTL con unidades dedicadas, seguridad y rastreo 24/7. Cobertura México y Norteamérica."
        canonical="/servicios/ftl"
        image="/hero-trucks-highway.jpg"
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
            <span className="text-primary font-semibold">Transporte FTL</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-primary mb-4">Transporte FTL (Full Truckload)</h1>
            <p className="text-lg text-secondary font-body max-w-3xl">Carga completa con unidad dedicada, ideal para grandes volúmenes o urgencias. Operación segura, puntual y trazable de extremo a extremo.</p>
          </header>

          <section className="grid md:grid-cols-2 gap-8 items-start mb-12">
            <img src="/hero-trucks-golden-highway.jpg" alt="Transporte FTL carga completa TORTRACS" className="w-full rounded-lg shadow-lg" loading="lazy" />
            <article>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">Por qué elegir FTL con TORTRACS</h2>
              <ul className="list-disc pl-5 space-y-2 text-secondary">
                <li>Unidades dedicadas y rutas optimizadas</li>
                <li>Rastreo 24/7 y comunicación proactiva</li>
                <li>Seguridad operativa y cumplimiento normativo</li>
                <li>Tránsitos confiables en corredores clave</li>
              </ul>
            </article>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <details className="bg-card border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">¿Qué diferencia hay entre FTL y LTL?</summary>
                <p className="mt-2 text-secondary">FTL asigna una unidad completa a tu envío; LTL consolida varias cargas en la misma unidad, optimizando costos cuando no ocupas el total del espacio.</p>
              </details>
              <details className="bg-card border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">¿Pueden manejar tránsitos internacionales?</summary>
                <p className="mt-2 text-secondary">Sí, coordinamos cruces fronterizos y contamos con aliados para operaciones México–EE.UU.</p>
              </details>
            </div>
          </section>

          <aside className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="text-xl font-heading font-bold text-primary mb-2">¿Listo para cotizar?</h3>
            <p className="text-secondary mb-4">Comparte tu origen, destino y características de la carga.</p>
            <a href="/#contacto" className="bg-primary text-white px-5 py-3 rounded-md hover:bg-primary/90 inline-block">Solicitar cotización</a>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceFTL;
