import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

const ServiceLTL = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": typeof window !== 'undefined' ? window.location.origin : '' },
        { "@type": "ListItem", "position": 2, "name": "Servicios", "item": typeof window !== 'undefined' ? `${window.location.origin}/#servicios` : '/#servicios' },
        { "@type": "ListItem", "position": 3, "name": "Transporte LTL" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Transporte LTL (Less-Than-Truckload)",
      "provider": { "@type": "Organization", "name": "TORTRACS" },
      "areaServed": ["México", "Norteamérica"],
      "serviceType": "Transporte de carga consolidada",
      "description": "Consolidación LTL para optimizar costos y tiempos con trazabilidad completa."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question","name": "¿Cuándo me conviene LTL?","acceptedAnswer": {"@type": "Answer","text": "Cuando tu volumen no requiere una unidad completa. Compartes espacio y costos, manteniendo visibilidad."}},
        {"@type": "Question","name": "¿Cómo aseguran la integridad de la carga?","acceptedAnswer": {"@type": "Answer","text": "Procesos de consolidación controlados, sellos, evidencia de carga y manejo especializado por tipo de mercancía."}}
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Transporte LTL (carga consolidada) | TORTRACS"
        description="Servicio LTL para cargas parciales con optimización de costos y trazabilidad."
        canonical="/servicios/ltl"
        image="/hero-trucks-row.jpg"
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
            <span className="text-primary font-semibold">Transporte LTL</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-primary mb-4">Transporte LTL (Less-Than-Truckload)</h1>
            <p className="text-lg text-secondary font-body max-w-3xl">Optimiza costos con consolidación inteligente y tiempos competitivos, manteniendo la trazabilidad en todo momento.</p>
          </header>

          <section className="grid md:grid-cols-2 gap-8 items-start mb-12">
            <img src="/hero-trucks-mountain-scenic.jpg" alt="Transporte LTL carga consolidada TORTRACS" className="w-full rounded-lg shadow-lg" loading="lazy" />
            <article>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">Beneficios del LTL</h2>
              <ul className="list-disc pl-5 space-y-2 text-secondary">
                <li>Pagas solo por el espacio que necesitas</li>
                <li>Rutas planificadas y ventanas de entrega</li>
                <li>Reducción de huella ambiental</li>
                <li>Seguimiento y evidencia de entrega</li>
              </ul>
            </article>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <details className="bg-card border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">¿Qué dimensiones y peso aceptan?</summary>
                <p className="mt-2 text-secondary">Manejamos rangos flexibles según ruta y tipo de producto. Cuéntanos tu caso para dimensionar la solución.</p>
              </details>
              <details className="bg-card border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">¿Cómo cotizo un envío LTL?</summary>
                <p className="mt-2 text-secondary">Comparte origen, destino, medidas, peso y tipo de mercancía. Te enviaremos la mejor alternativa.</p>
              </details>
            </div>
          </section>

          <aside className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="text-xl font-heading font-bold text-primary mb-2">¿Listo para cotizar?</h3>
            <p className="text-secondary mb-4">Envíanos los detalles de tu carga para una propuesta a medida.</p>
            <a href="/#contacto" className="bg-primary text-white px-5 py-3 rounded-md hover:bg-primary/90 inline-block">Solicitar cotización</a>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceLTL;
