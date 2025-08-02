import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';


const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">
            Aviso de Privacidad
          </h1>
          <p className="text-secondary font-body">
            Fecha de última actualización: 01 agosto 2025
          </p>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <div className="mb-6">
            <p className="text-secondary font-body leading-relaxed">
              TORTRACS, S.A. de C.V., con domicilio en Alejandro Dumas, 145, 11550, Polanco, Miguel Hidalgo, CDMX, es responsable del tratamiento de sus datos personales conforme a lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
            </p>
          </div>

          {/* Data Usage */}
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold text-primary mb-3">
              Uso de Datos Personales
            </h2>
            <p className="text-secondary font-body leading-relaxed text-sm">
              Los datos personales que recabamos (como nombre, correo electrónico, teléfono, empresa o ubicación) serán utilizados con la finalidad de ofrecerle información sobre nuestros servicios de transporte, generar cotizaciones, establecer comunicación comercial, y dar seguimiento a solicitudes realizadas a través de nuestro sitio web.
            </p>
          </div>

          {/* Data Sharing and Security */}
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold text-primary mb-3">
              Compartimiento y Seguridad de Datos
            </h2>
            <p className="text-secondary font-body leading-relaxed text-sm">
              No compartimos su información con terceros, salvo que sea necesario para cumplir con obligaciones legales o contractuales. Implementamos medidas de seguridad físicas, administrativas y tecnológicas para proteger sus datos contra daño, pérdida, alteración, destrucción o uso indebido.
            </p>
          </div>

          {/* ARCO Rights */}
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold text-primary mb-3">
              Derechos ARCO
            </h2>
            <p className="text-secondary font-body leading-relaxed text-sm">
              Usted tiene derecho a acceder, rectificar, cancelar u oponerse (ARCO) al tratamiento de sus datos personales mediante una solicitud escrita al correo: comercial@tortracs.net
            </p>
          </div>

          {/* Updates */}
          <div className="mb-6">
            <h2 className="text-2xl font-heading font-bold text-primary mb-3">
              Actualizaciones
            </h2>
            <p className="text-secondary font-body leading-relaxed text-sm">
              Nos reservamos el derecho de actualizar este aviso en cualquier momento. Cualquier cambio será publicado en este mismo sitio web.
            </p>
          </div>
        </div>
      </div>
      
      <div className="pb-12"></div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;