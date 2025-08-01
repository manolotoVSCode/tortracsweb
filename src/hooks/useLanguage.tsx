import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  es: {
    // Navigation
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.value': 'Oferta de Valor',
    'nav.clients': 'Clientes',
    'nav.jobs': 'Bolsa de Trabajo',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.title': 'Soluciones de transporte terrestre en México',
    'hero.subtitle': 'Más de 10 años ofreciendo servicios de logística flexibles y confiables',
    'hero.cta': 'Cotiza ahora',
    
    // About Section
    'about.title': 'Nosotros',
    'about.history.title': 'Nuestra Historia',
    'about.history.content': 'TORTRACS nació en 2014 con dos camiones y una visión clara: construir una empresa de transporte seria, eficiente y con futuro. Su fundador, Gilberto Guzmán, asumió el reto desde el terreno, moviendo arena y grava en los primeros trayectos.\n\nHoy, más de una década después, operamos con una flota de más de 80 unidades, brindando soluciones logísticas a clientes AAA, y respondiendo con puntualidad, seguridad y control en cada entrega.\n\nNuestro crecimiento ha sido posible gracias a decisiones firmes y una cultura de trabajo enfocada en el largo plazo. El órgano de gobierno actual cuenta con socios estratégicos de alto valor, con un respaldo financiero sólido que nos permite planear con visión, invertir con responsabilidad y operar sin atajos.\n\nSeguimos creciendo, pero sin olvidar de dónde venimos. En TORTRACS, hacemos que las cosas lleguen. Y lleguen bien.',
    'about.mission.title': 'Misión',
    'about.mission.content': 'Empresa de transporte enfocada en generar confianza y resultados sostenibles. Operamos con altos estándares de seguridad, cuidamos el impacto de cada kilómetro recorrido y apostamos por relaciones duraderas con nuestros clientes, nuestra gente y el entorno. Convertimos la logística en una experiencia eficiente, humana y preparada para los retos del camino.',
    'about.vision.title': 'Visión',
    'about.vision.content': 'Construir una operación de transporte sólida, eficiente y con propósito, capaz de mantenerse firme ante los retos del entorno, generar valor real para clientes y comunidades, y dejar huella por la forma en que hacemos las cosas, no por el tamaño.',
    'about.values.title': 'Nuestros Valores',
    'about.values.safety': 'Seguridad: Cada trayecto inicia con una prioridad: que personas, carga y unidades lleguen sanas y completas. La prevención es parte de nuestra operación diaria.',
    'about.values.responsibility': 'Responsabilidad: Somos conscientes del entorno en el que operamos. Cuidamos el medio ambiente y actuamos con respeto hacia las comunidades donde tenemos presencia.',
    'about.values.closeness': 'Cercanía: Escuchamos, respondemos y acompañamos. Construimos relaciones de confianza, con presencia directa y comunicación abierta en todo momento.',
    'about.values.transparency': 'Transparencia: Monitoreamos cada ruta en tiempo real y compartimos decisiones con nuestros clientes. La visibilidad es parte de nuestro servicio, no un extra.',
    'about.values.resilience': 'Resiliencia: Adaptarnos es parte del camino. Respondemos con rapidez, firmeza y sin perder calidad, incluso ante entornos cambiantes o imprevistos.',
    'about.values.commitment': 'Compromiso: Lo que hacemos, lo hacemos bien. Nuestra meta es la excelencia operativa y el cumplimiento constante, sin atajos ni excusas.',
    'about.metrics.title': 'Métricas Clave',
    'about.metrics.experience': '10+ años de experiencia',
    'about.metrics.routes': '500+ rutas',
    'about.metrics.clients': '70+ clientes satisfechos',
    'about.metrics.fleet': '80+ unidades',
    'about.metrics.carbonFootprint': 'Huella de carbono neutral',
    'about.metrics.kilometers': '6+ millones de km/año',
    
    // Services Section
    'services.title': 'Servicios',
    'services.subtitle': 'En TORTRACS ofrecemos soluciones de transporte flexibles, seguras y con control total sobre la operación. Nos adaptamos a las necesidades específicas de cada cliente, sin comprometer la calidad ni la puntualidad.',
    'services.dedicated.title': 'Servicio dedicado',
    'services.dedicated.description': 'Operaciones asignadas por completo a un solo cliente, con unidades, rutas y seguimiento exclusivo. Ideal para quienes necesitan constancia, control y alta disponibilidad.',
    'services.spot.title': 'Viajes spot',
    'services.spot.description': 'Cobertura puntual para necesidades urgentes o no recurrentes. Agilidad en la respuesta, trazabilidad en ruta y ejecución sin sorpresas.',
    'services.containers.title': 'Transporte de contenedores',
    'services.containers.description': 'Movemos carga contenerizada con conocimiento operativo y procesos claros en cada tramo. Coordinamos eficientemente puerto, patio y destino final.',
    'services.ltl.title': 'Servicio LTL (carga consolidada)',
    'services.ltl.description': 'Para quienes no requieren una unidad completa. Agrupamos cargas de distintos clientes optimizando espacio, tiempos y costos, sin perder trazabilidad.',
    
    // Value Proposition
    'value.title': 'Oferta de Valor',
    'value.subtitle': 'Por qué elegir TORTRACS',
    'value.operators.title': 'Operadores certificados',
    'value.operators.description': 'Personal capacitado, evaluado y alineado a estándares de seguridad y cumplimiento.',
    'value.tracking.title': 'Tecnología satelital en cada unidad',
    'value.tracking.description': 'Monitoreo en tiempo real para trazabilidad, control y respuesta inmediata.',
    'value.monitoring.title': 'Centro de monitoreo 24/7',
    'value.monitoring.description': 'Supervisión continua de rutas, eventos y entregas desde nuestras instalaciones.',
    'value.training.title': 'Formación continua',
    'value.training.description': 'Escuela de operadores propia para garantizar calidad y profesionalismo constante.',
    'value.infrastructure.title': 'Infraestructura propia',
    'value.infrastructure.description': 'Taller mecánico, área de chapa y pintura, y tanque de diésel para consumo interno que aseguran autonomía y eficiencia.',
    'value.testimonials.title': 'Lo que dicen nuestros clientes',
    'value.testimonial1.content': '"TORTRACS ha sido nuestro socio estratégico por más de 5 años. Su puntualidad y seguridad son excepcionales."',
    'value.testimonial1.author': '- María González, Directora Logística, Grupo Industrial del Norte',
    'value.testimonial2.content': '"El rastreo en tiempo real nos da la tranquilidad que necesitamos. Servicio 100% confiable."',
    'value.testimonial2.author': '- Carlos Mendoza, Gerente de Operaciones, TechCorp México',
    'value.certifications': 'Certificaciones',
    
    // Clients Section
    'clients.title': 'Nuestros Principales Clientes',
    'clients.subtitle': 'Empresas líderes confían en nuestros servicios de transporte',
    'clients.trust': 'Más de 1000+ empresas confían en TORTRACS',
    
    // Contact Section
    'contact.title': 'Contacto',
    'contact.subtitle': 'Cotiza tu envío hoy mismo',
    'contact.form.name': 'Nombre completo',
    'contact.form.email': 'Correo electrónico',
    'contact.form.phone': 'Teléfono',
    'contact.form.company': 'Empresa',
    'contact.form.message': 'Mensaje',
    'contact.form.submit': 'Enviar cotización',
    'contact.info.title': 'Información de contacto',
    'contact.info.corporate': 'Corporativo',
    'contact.info.operations': 'Operaciones',
    'contact.info.corporate.address': 'Paseo de los Laureles 458A - PH1, Bosques de las Lomas, Ciudad de México, 05120',
    'contact.info.operations.address': 'Av. Estado de México S/N esq. Sn. José, Solidaridad, Tultitlán, Estado de México, 54948',
    'contact.info.commercial.phone': '+52 55 6214 4126',
    'contact.info.commercial.email': 'gvtalavera@tortracs.net',
    'contact.info.hr.phone': '+52 55 6802 4701',
    'contact.info.hr.email': 'administracionrh@tortracs.net',
    'contact.info.hours': 'Lunes a Viernes: 8:00 AM - 6:00 PM',
    
    // Footer
    'footer.privacy': 'Aviso de Privacidad',
    'footer.copyright': '© TORTRACS 2025. Todos los derechos reservados.',
    
    // Privacy Policy
    'privacy.title': 'Aviso de Privacidad',
    'privacy.updated': 'Actualizado: julio 2025',
    'privacy.intro': 'TORTRACS, S.A. de C.V., con domicilio en Alejandro Dumas 145, Polanco, Polanco IV Secc, Miguel Hidalgo, 11550 Ciudad de México, CDMX, es responsable del tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
    'privacy.data.title': 'Datos Personales Recabados',
    'privacy.data.content': 'Nombre completo, correo electrónico, teléfono, empresa, información de contacto y datos necesarios para la prestación de servicios de transporte.',
    'privacy.purpose.title': 'Finalidades del Tratamiento',
    'privacy.purpose.content': 'Prestación de servicios de transporte, contacto comercial, facturación, cumplimiento de obligaciones contractuales y legales.',
    'privacy.rights.title': 'Derechos ARCO',
    'privacy.rights.content': 'Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales, así como a revocar su consentimiento.',
    'privacy.contact.title': 'Contacto para Privacidad',
    'privacy.contact.content': 'Para ejercer sus derechos ARCO, contacte a: administracionrh@tortracs.net o al teléfono +52 55 6802 4701.',
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.value': 'Value Proposition',
    'nav.clients': 'Clients',
    'nav.jobs': 'Job Board',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Ground transportation solutions in Mexico',
    'hero.subtitle': 'Over 10 years offering flexible and reliable logistics services',
    'hero.cta': 'Get Quote',
    
    // About Section
    'about.title': 'About TORTRACS',
    'about.history.title': 'Our History',
    'about.history.content': 'Founded in 2010, TORTRACS has grown to become a leading freight transportation company in Mexico.',
    'about.mission.title': 'Mission',
    'about.mission.content': 'To provide comprehensive freight transportation solutions that exceed our clients\' expectations, ensuring safety, punctuality, and quality in every service.',
    'about.vision.title': 'Vision',
    'about.vision.content': 'To be the most reliable and recognized freight transportation company in Mexico, leading with innovation and operational excellence.',
    'about.values.title': 'Values',
    'about.values.safety': 'Safety: Priority in every operation',
    'about.values.punctuality': 'Punctuality: We keep our commitments',
    'about.values.service': 'Customer Service: Excellence in every interaction',
    'about.metrics.title': 'Key Metrics',
    'about.metrics.experience': '14+ years of experience',
    'about.metrics.routes': '500+ routes covered',
    'about.metrics.clients': '1000+ satisfied clients',
    'about.metrics.fleet': '200+ units',
    
    // Services Section
    'services.title': 'Our Services',
    'services.dedicated.title': 'Dedicated Scheme',
    'services.dedicated.description': 'Exclusive transport with units specifically assigned for your operations.',
    'services.spot.title': 'Spot Services',
    'services.spot.description': 'Flexible transport solutions for immediate and urgent needs.',
    'services.containers.title': 'Container Transport',
    'services.containers.description': 'Specialized handling of maritime containers from ports to final destination.',
    'services.ltl.title': 'LTL Service',
    'services.ltl.description': 'Optimized partial load for smaller volume shipments with maximum efficiency.',
    
    // Value Proposition
    'value.title': 'Value Proposition',
    'value.subtitle': 'Why choose TORTRACS',
    'value.fleet.title': 'Modern Euro VI Fleet',
    'value.fleet.description': 'Latest generation units with advanced technology and lower environmental impact.',
    'value.tracking.title': 'Minute-by-Minute GPS Tracking',
    'value.tracking.description': 'Complete visibility of your shipments in real-time 24 hours a day.',
    'value.operators.title': 'Certified Operators',
    'value.operators.description': 'Highly trained personnel certified in international standards.',
    'value.insurance.title': 'Comprehensive Insurance',
    'value.insurance.description': 'Complete coverage that protects your merchandise throughout the journey.',
    'value.testimonials.title': 'What our clients say',
    'value.testimonial1.content': '"TORTRACS has been our strategic partner for over 5 years. Their punctuality and safety are exceptional."',
    'value.testimonial1.author': '- María González, Logistics Director, Northern Industrial Group',
    'value.testimonial2.content': '"Real-time tracking gives us the peace of mind we need. 100% reliable service."',
    'value.testimonial2.author': '- Carlos Mendoza, Operations Manager, TechCorp México',
    'value.certifications': 'Certifications',
    
    // Clients Section
    'clients.title': 'Our Main Clients',
    'clients.subtitle': 'Leading companies trust our transportation services',
    'clients.trust': 'More than 1000+ companies trust TORTRACS',
    
    // Contact Section
    'contact.title': 'Contact',
    'contact.subtitle': 'Quote your shipment today',
    'contact.form.name': 'Full name',
    'contact.form.email': 'Email address',
    'contact.form.phone': 'Phone',
    'contact.form.company': 'Company',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send quote',
    'contact.info.title': 'Contact information',
    'contact.info.corporate': 'Corporate',
    'contact.info.operations': 'Operations',
    'contact.info.corporate.address': 'Paseo de los Laureles 458A - PH1, Bosques de las Lomas, Ciudad de México, 05120',
    'contact.info.operations.address': 'Av. Estado de México S/N esq. Sn. José, Solidaridad, Tultitlán, Estado de México, 54948',
    'contact.info.commercial.phone': '+52 55 6214 4126',
    'contact.info.commercial.email': 'gvtalavera@tortracs.net',
    'contact.info.hr.phone': '+52 55 6802 4701',
    'contact.info.hr.email': 'administracionrh@tortracs.net',
    'contact.info.hours': 'Monday to Friday: 8:00 AM - 6:00 PM',
    
    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.copyright': '© TORTRACS 2025. All rights reserved.',
    
    // Privacy Policy
    'privacy.title': 'Privacy Policy',
    'privacy.updated': 'Updated: July 2025',
    'privacy.intro': 'TORTRACS, S.A. de C.V., located at Alejandro Dumas 145, Polanco, Polanco IV Secc, Miguel Hidalgo, 11550 Ciudad de México, CDMX, is responsible for the processing of your personal data in accordance with the Federal Law on Protection of Personal Data Held by Private Parties.',
    'privacy.data.title': 'Personal Data Collected',
    'privacy.data.content': 'Full name, email address, phone number, company, contact information and data necessary for the provision of transportation services.',
    'privacy.purpose.title': 'Processing Purposes',
    'privacy.purpose.content': 'Provision of transportation services, commercial contact, billing, compliance with contractual and legal obligations.',
    'privacy.rights.title': 'ARCO Rights',
    'privacy.rights.content': 'You have the right to Access, Rectify, Cancel or Object to the processing of your personal data, as well as to revoke your consent.',
    'privacy.contact.title': 'Privacy Contact',
    'privacy.contact.content': 'To exercise your ARCO rights, contact: administracionrh@tortracs.net or phone +52 55 6802 4701.',
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};