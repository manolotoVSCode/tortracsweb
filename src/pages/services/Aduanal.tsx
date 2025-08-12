import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Link } from 'react-router-dom';

const ServiceAduanal = () => {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": typeof window !== 'undefined' ? window.location.origin : '' },
        { "@type": "ListItem", "position": 2, "name": "Servicios", "item": typeof window !== 'undefined' ? `${window.location.origin}/#servicios` : '/#servicios' },
        { "@type": "ListItem", "position": 3, "name": "Gestión Aduanal" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Gestión aduanal y cruce fronterizo",
      "provider": { "@type": "Organization", "name": "TORTRACS" },
      "areaServed": ["México", "Norteamérica"],
      "serviceType": "Aduanas",
      "description": "Coordinación aduanal y logística de cruce con documentación y cumplimiento normativo."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {"@type": "Question","name": "¿Qué documentación requieren?","acceptedAnswer": {"@type": "Answer","text": "Factura, lista de empaque, pedimento y permisos según fracción arancelaria. Te guiamos paso a paso."}},
        {"@type": "Question","name": "¿En qué cruces operan?","acceptedAnswer": {"@type": "Answer","text": "Trabajamos en principales cruces México–EE.UU. con tiempos controlados y coordinación con agentes aduanales."}}
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Gestión aduanal y cruce fronterizo | TORTRACS"
        description="Coordinación aduanal integral y cruces México–EE.UU. con cumplimiento y visibilidad."
        canonical="/servicios/gestion-aduanal"
        image="/hero-trucks-port-industrial.jpg"
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
            <span className="text-primary font-semibold">Gestión Aduanal</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-primary mb-4">Gestión aduanal y cruce fronterizo</h1>
            <p className="text-lg text-secondary font-body max-w-3xl">Simplificamos la documentación, cumplimiento y coordinación para un cruce eficiente y sin contratiempos.</p>
          </header>

          <section className="grid md:grid-cols-2 gap-8 items-start mb-12">
            <img src="/hero-trucks-port-industrial.jpg" alt="Gestión aduanal y cruce fronterizo TORTRACS" className="w-full rounded-lg shadow-lg" loading="lazy" />
            <article>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">Qué incluye</h2>
              <ul className="list-disc pl-5 space-y-2 text-secondary">
                <li>Asesoría documental y clasificación arancelaria</li>
                <li>Coordinación con agentes aduanales</li>
                <li>Programación y seguimiento del cruce</li>
                <li>Gestión de incidencias en frontera</li>
              </ul>
            </article>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <details className="bg-card border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">¿Pueden apoyar con permisos especiales?</summary>
                <p className="mt-2 text-secondary">Sí, te orientamos sobre permisos y requisitos específicos según producto y destino.</p>
              </details>
              <details className="bg-card border rounded-md p-4">
                <summary className="font-semibold cursor-pointer">¿Cuál es el tiempo típico de cruce?</summary>
                <p className="mt-2 text-secondary">Depende del puerto y horario. Planificamos para minimizar tiempos de espera y costos asociados.</p>
              </details>
            </div>
          </section>

          <aside className="bg-primary/10 border border-primary/20 rounded-lg p-6">
            <h3 className="text-xl font-heading font-bold text-primary mb-2">¿Listo para cotizar?</h3>
            <p className="text-secondary mb-4">Te ayudamos con la documentación y coordinación completa.</p>
            <a href="/#contacto" className="bg-primary text-white px-5 py-3 rounded-md hover:bg-primary/90 inline-block">Solicitar cotización</a>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceAduanal;
