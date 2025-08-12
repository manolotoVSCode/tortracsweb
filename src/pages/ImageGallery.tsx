import SEO from '@/components/SEO';

const ImageGallery = () => {
  // Images from public/lovable-uploads/
  const uploadedImages = [
    '/lovable-uploads/0beca359-2968-4f97-8e63-6add53ecd970.png',
    '/lovable-uploads/1715beb4-224e-4da9-ad38-df744dfde59e.png',
    '/lovable-uploads/1c996aad-4723-4bfd-b242-49779f6e4727.png',
    '/lovable-uploads/2179f01b-3cc1-451a-be0b-b66c19194984.png',
    '/lovable-uploads/21da500a-61df-407b-b77b-4d48bed21bda.png',
    '/lovable-uploads/47c5580b-9cbb-4f66-a988-6ef271c02eb9.png',
    '/lovable-uploads/6280365e-4158-42bd-a433-080acd9db5a6.png',
    '/lovable-uploads/68ddff29-13d9-4d92-af21-54df77c890f3.png',
    '/lovable-uploads/76973531-d659-4d5b-a54e-a92e2f5428f8.png',
    '/lovable-uploads/8b86123b-67c7-480b-ae7e-bf0a3ce594ed.png',
    '/lovable-uploads/9c72013a-e408-41e3-8e6e-ca90ff1b00b9.png',
    '/lovable-uploads/a3df1d4b-926d-405b-97d2-074cccd50059.png',
    '/lovable-uploads/b5ae9603-7647-474a-ad09-3f2212df0c52.png',
    '/lovable-uploads/ca140bfc-afdd-4be5-b784-ff798cecdc12.png',
    '/lovable-uploads/d7506ec2-2f27-430a-8578-25afe0c45e65.png',
    '/lovable-uploads/db1e1dcd-725e-4168-a8f7-aac25fa99daf.png',
    '/lovable-uploads/e7abedb3-166d-493a-95f0-76e67c80a936.png',
    '/lovable-uploads/walmart-logo.png',
  ];

  // Hero images from public/
  const heroImages = [
    '/hero-image-download.jpg',
    '/hero-trucks-highway.jpg',
  ];

  // Placeholder images from Unsplash
  const placeholderImages = [
    {
      id: 'photo-1649972904349-6e44c42644a7',
      description: 'Mujer sentada en la cama usando una laptop',
      url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
    },
    {
      id: 'photo-1488590528505-98d2b5aba04b',
      description: 'Laptop gris encendida',
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
    },
    {
      id: 'photo-1518770660439-4636190af475',
      description: 'Fotografía macro de una placa de circuito negra',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
    },
    {
      id: 'photo-1461749280684-dccba630e2f6',
      description: 'Monitor mostrando programación Java',
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6'
    },
    {
      id: 'photo-1485827404703-89b55fcc595e',
      description: 'Robot blanco cerca de una pared marrón',
      url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
    },
    {
      id: 'photo-1526374965328-7f61d4dc18c5',
      description: 'Escena de la película Matrix',
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
    },
    {
      id: 'photo-1470813740244-df37b8c1edcb',
      description: 'Noche estrellada azul',
      url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb'
    },
    {
      id: 'photo-1500375592092-40eb2168fd21',
      description: 'Ola del océano en una playa',
      url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21'
    },
    {
      id: 'photo-1482881497185-d4a9ddbe4151',
      description: 'Arena del desierto',
      url: 'https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151'
    },
    {
      id: 'photo-1523712999610-f77fbcfc3843',
      description: 'Bosque iluminado por rayos de sol',
      url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843'
    },
    {
      id: 'photo-1506744038136-46273834b3fb',
      description: 'Cuerpo de agua rodeado de árboles',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    },
    {
      id: 'photo-1517022812141-23620928006d',
      description: 'Rebaño de ovejas corriendo en un campo verde',
      url: 'https://images.unsplash.com/photo-1517022812141-23620928006d'
    },
    {
      id: 'photo-1582562124811-c09040d0a901',
      description: 'Gato atigrado naranja y blanco',
      url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901'
    },
    {
      id: 'photo-1441057206919-63d19fac2369',
      description: 'Dos pingüinos parados en una roca',
      url: 'https://images.unsplash.com/photo-1441057206919-63d19fac2369'
    },
    {
      id: 'photo-1501286353178-1ec881214838',
      description: 'Mono sosteniendo una cáscara de plátano',
      url: 'https://images.unsplash.com/photo-1501286353178-1ec881214838'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <SEO title="Galería de imágenes | TORTRACS" description="Recursos visuales de la flota y logística de TORTRACS." canonical="/imagenes" noIndex />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Galería de Imágenes Disponibles
          </h1>
          <p className="text-muted-foreground text-lg">
            Todas las imágenes disponibles en el proyecto para usar en diferentes secciones
          </p>
        </div>

        {/* Hero Images */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Imágenes Hero</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroImages.map((src, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={src} 
                  alt={`Hero ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Ruta: {src}</p>
                  <button
                    onClick={() => copyToClipboard(src)}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/90"
                  >
                    Copiar ruta
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Uploaded Images */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Imágenes Subidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {uploadedImages.map((src, index) => (
              <div key={index} className="bg-card rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={src} 
                  alt={`Upload ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-2 truncate" title={src}>
                    {src.split('/').pop()}
                  </p>
                  <button
                    onClick={() => copyToClipboard(src)}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/90"
                  >
                    Copiar ruta
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Placeholder Images from Unsplash */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Imágenes de Unsplash</h2>
          <p className="text-muted-foreground mb-6">
            Estas imágenes están disponibles desde Unsplash y pueden usarse directamente:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {placeholderImages.map((img) => (
              <div key={img.id} className="bg-card rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={img.url} 
                  alt={img.description}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-medium text-foreground mb-1">{img.description}</p>
                  <p className="text-xs text-muted-foreground mb-3">{img.id}</p>
                  <button
                    onClick={() => copyToClipboard(img.url)}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm hover:bg-primary/90 w-full"
                  >
                    Copiar URL
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">Cómo usar estas imágenes</h3>
          <div className="space-y-3 text-muted-foreground">
            <p><strong>Para imágenes locales:</strong> Usa la ruta directamente en tu código (ej: "/hero-trucks-highway.jpg")</p>
            <p><strong>Para imágenes de Unsplash:</strong> Usa la URL completa (ej: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7")</p>
            <p><strong>En React:</strong> Puedes usarlas en atributos src de img o como backgroundImage en CSS</p>
            <p><strong>Optimización:</strong> Las imágenes de Unsplash permiten parámetros de redimensionado añadiendo "?w=800&h=600" al final de la URL</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImageGallery;