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
    'nav.home': 'Inicio',
    'nav.about': 'Sobre TORTRACS',
    'nav.services': 'Servicios',
    'nav.value': 'Oferta de Valor',
    'nav.clients': 'Clientes',
    'nav.contact': 'Contacto',
    
    // Hero Section
    'hero.title': 'Soluciones de transporte de carga confiables en México',
    'hero.subtitle': 'Más de 10 años conectando empresas con servicios de logística seguros, puntuales y especializados',
    'hero.cta': 'Cotiza ahora',
    
    // About Section
    'about.title': 'Sobre TORTRACS',
    'about.history.title': 'Nuestra Historia',
    'about.history.content': 'Empresa mexicana con más de 10 años de experiencia en la industria del transporte nacional terrestre.',
    'about.mission.title': 'Misión',
    'about.mission.content': 'Brindar soluciones integrales de transporte de carga que superen las expectativas de nuestros clientes, garantizando seguridad, puntualidad y calidad en cada servicio.',
    'about.vision.title': 'Visión',
    'about.vision.content': 'Ser la empresa de transporte de carga más confiable y reconocida en México, liderando con innovación y excelencia operativa.',
    'about.values.title': 'Valores',
    'about.values.safety': 'Seguridad: Prioritarias en cada operación',
    'about.values.punctuality': 'Puntualidad: Cumplimos nuestros compromisos',
    'about.values.service': 'Servicio al Cliente: Excelencia en cada interacción',
    'about.metrics.title': 'Métricas Clave',
    'about.metrics.experience': '14+ años de experiencia',
    'about.metrics.routes': '500+ rutas cubiertas',
    'about.metrics.clients': '1000+ clientes satisfechos',
    'about.metrics.fleet': '200+ unidades',
    
    // Services Section
    'services.title': 'Nuestros Servicios',
    'services.ftl.title': 'Servicio Dedicado',
    'services.ftl.description': 'Transporte especializado con unidades dedicadas para su carga.',
    'services.ltl.title': 'Carga Completa',
    'services.ltl.description': 'Consolidación eficiente de cargas optimizando costos y tiempos.',
    'services.refrigerated.title': 'Refrigerados',
    'services.refrigerated.description': 'Cadena de frío controlada para productos que requieren temperatura específica.',
    'services.oversized.title': 'Importación y Exportación',
    'services.oversized.description': 'Servicios especializados en comercio exterior con nuestra filial MS Logistics.',
    'services.customs.title': 'Patios y Resguardos',
    'services.customs.description': 'Patios estratégicamente ubicados en CDMX, Monterrey y Tultitlán para resguardo seguro.',
    
    // Value Proposition
    'value.title': 'Oferta de Valor',
    'value.subtitle': 'Por qué elegir TORTRACS',
    'value.fleet.title': 'Flota Euro VI Moderna',
    'value.fleet.description': 'Unidades de última generación con tecnología avanzada y menor impacto ambiental.',
    'value.tracking.title': 'Rastreo GPS Minuto a Minuto',
    'value.tracking.description': 'Visibilidad completa de sus envíos en tiempo real las 24 horas del día.',
    'value.operators.title': 'Operadores Certificados',
    'value.operators.description': 'Personal altamente capacitado y certificado en estándares internacionales.',
    'value.insurance.title': 'Seguro Integral',
    'value.insurance.description': 'Cobertura completa que protege su mercancía durante todo el trayecto.',
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
    'nav.home': 'Home',
    'nav.about': 'About TORTRACS',
    'nav.services': 'Services',
    'nav.value': 'Value Proposition',
    'nav.clients': 'Clients',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Reliable freight transportation solutions in Mexico',
    'hero.subtitle': 'Over 10 years connecting businesses with safe, punctual and specialized logistics services',
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
    'services.ftl.title': 'Dedicated Service',
    'services.ftl.description': 'Specialized transportation with dedicated units for your cargo.',
    'services.ltl.title': 'Full Load',
    'services.ltl.description': 'Efficient cargo consolidation optimizing costs and delivery times.',
    'services.refrigerated.title': 'Refrigerated',
    'services.refrigerated.description': 'Controlled cold chain for products requiring specific temperature.',
    'services.oversized.title': 'Import and Export',
    'services.oversized.description': 'Specialized foreign trade services through our MS Logistics subsidiary.',
    'services.customs.title': 'Yards and Storage',
    'services.customs.description': 'Strategically located yards in CDMX, Monterrey and Tultitlán for secure storage.',
    
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