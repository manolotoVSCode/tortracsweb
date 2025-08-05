import { useState } from 'react';
import { Button } from '@/components/ui/button';

const HeroImageSelector = () => {
  const [selectedImage, setSelectedImage] = useState<string>('');

  const heroOptions = [
    {
      name: 'Camiones Carretera Dorada',
      path: '/hero-trucks-golden-highway.jpg',
      description: 'Camiones modernos en carretera al atardecer con cielo dramático en tonos dorados y púrpuras'
    },
    {
      name: 'Flota Logística',
      path: '/hero-truck-fleet-logistics.jpg',
      description: 'Flota de camiones blancos y azules en formación en un centro logístico moderno, vista aérea'
    },
    {
      name: 'Camión Desierto Movimiento',
      path: '/hero-truck-desert-motion.jpg',
      description: 'Camión poderoso en movimiento en carretera del desierto con efecto de velocidad'
    },
    {
      name: 'Puerto Industrial',
      path: '/hero-trucks-port-industrial.jpg',
      description: 'Camiones modernos en puerto ocupado con contenedores y grúas, atmósfera industrial'
    },
    {
      name: 'Camiones Eléctricos Futuristas',
      path: '/hero-trucks-electric-future.jpg',
      description: 'Camiones eléctricos futuristas en carretera moderna, tema de energía limpia'
    },
    {
      name: 'Paisaje Montañoso',
      path: '/hero-trucks-mountain-scenic.jpg',
      description: 'Camiones rojos y negros atravesando paisaje montañoso con carreteras serpenteantes'
    },
    {
      name: 'Conductores al Amanecer',
      path: '/hero-trucks-dawn-drivers.jpg',
      description: 'Siluetas de camiones y conductores contra el cielo del amanecer, elemento humano'
    },
    {
      name: 'Transporte Nocturno',
      path: '/hero-trucks-night-city.jpg',
      description: 'Camiones iluminados en carretera nocturna con luces de ciudad de fondo'
    },
    {
      name: 'Actual (Carretera Principal)',
      path: '/hero-trucks-highway.jpg',
      description: 'Imagen hero actual que está siendo usada en el sitio web'
    }
  ];

  const copyImagePath = (path: string) => {
    navigator.clipboard.writeText(path);
  };

  const updateHeroImage = (imagePath: string) => {
    setSelectedImage(imagePath);
    // Aquí se podría implementar la actualización automática del HeroSection
    alert(`Imagen seleccionada: ${imagePath}\n\nPara aplicarla, copia esta ruta y úsala en el componente HeroSection.`);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Selector de Imagen Hero - Camiones
          </h1>
          <p className="text-muted-foreground text-lg">
            Explora diferentes opciones de imágenes hero con temática de camiones y transporte
          </p>
        </div>

        {selectedImage && (
          <div className="mb-8 p-6 bg-primary/10 rounded-lg">
            <h3 className="text-lg font-semibold text-foreground mb-2">Imagen Seleccionada:</h3>
            <p className="text-muted-foreground">{selectedImage}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {heroOptions.map((option, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={option.path} 
                  alt={option.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {option.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {option.description}
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => updateHeroImage(option.path)}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Seleccionar esta imagen
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyImagePath(option.path)}
                    className="w-full"
                  >
                    Copiar ruta
                  </Button>
                </div>
                <div className="mt-3 p-2 bg-muted rounded text-xs text-muted-foreground font-mono">
                  {option.path}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-muted/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Cómo cambiar la imagen hero</h3>
          <div className="space-y-2 text-muted-foreground">
            <p>1. Selecciona la imagen que más te guste haciendo clic en "Seleccionar esta imagen"</p>
            <p>2. Copia la ruta que aparece en el cuadro gris</p>
            <p>3. Ve al componente HeroSection.tsx y reemplaza la ruta actual en la línea 3</p>
            <p>4. La nueva imagen se aplicará automáticamente en el sitio web</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            onClick={() => window.open('/imagenes', '_blank')}
            className="mr-4"
          >
            Ver todas las imágenes disponibles
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open('/', '_blank')}
          >
            Ver sitio web actual
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroImageSelector;