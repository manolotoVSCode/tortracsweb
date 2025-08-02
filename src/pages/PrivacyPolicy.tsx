import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/hooks/useLanguage';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <LanguageProvider>
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

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <p className="text-secondary font-body leading-relaxed text-lg">
                TORTRACS, S.A. de C.V., con domicilio en Alejandro Dumas, 145, 11550, Polanco, Miguel Hidalgo, CDMX, es responsable del tratamiento de sus datos personales conforme a lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
              </p>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                Uso de Datos Personales
              </h2>
              <p className="text-secondary font-body leading-relaxed">
                Los datos personales que recabamos (como nombre, correo electrónico, teléfono, empresa o ubicación) serán utilizados con la finalidad de ofrecerle información sobre nuestros servicios de transporte, generar cotizaciones, establecer comunicación comercial, y dar seguimiento a solicitudes realizadas a través de nuestro sitio web.
              </p>
            </CardContent>
          </Card>

          {/* Data Sharing and Security */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                Compartimiento y Seguridad de Datos
              </h2>
              <p className="text-secondary font-body leading-relaxed">
                No compartimos su información con terceros, salvo que sea necesario para cumplir con obligaciones legales o contractuales. Implementamos medidas de seguridad físicas, administrativas y tecnológicas para proteger sus datos contra daño, pérdida, alteración, destrucción o uso indebido.
              </p>
            </CardContent>
          </Card>

          {/* ARCO Rights */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                Derechos ARCO
              </h2>
              <p className="text-secondary font-body leading-relaxed">
                Usted tiene derecho a acceder, rectificar, cancelar u oponerse (ARCO) al tratamiento de sus datos personales mediante una solicitud escrita al correo: comercial@tortracs.net
              </p>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                Actualizaciones
              </h2>
              <p className="text-secondary font-body leading-relaxed">
                Nos reservamos el derecho de actualizar este aviso en cualquier momento. Cualquier cambio será publicado en este mismo sitio web.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
    </LanguageProvider>
  );
};

export default PrivacyPolicy;