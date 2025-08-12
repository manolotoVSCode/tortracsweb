import SEO from '@/components/SEO';

const DownloadHero = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/hero-image-download.jpg';
    link.download = 'hero-trucks-highway.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <SEO title="Descargar imagen hero | TORTRACS" description="Descarga la imagen hero del sitio." canonical="/download-hero" noIndex />
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Descargar Imagen Hero</h1>
        <p className="text-muted-foreground">
          Haz clic derecho en la imagen y selecciona "Guardar imagen como..." o usa el botón de descarga.
        </p>
        
        <div className="space-y-4">
          <img 
            src="/hero-image-download.jpg" 
            alt="Hero Image" 
            className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
            style={{ maxHeight: '400px' }}
          />
          
          <button
            onClick={handleDownload}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Descargar Imagen
          </button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>También puedes acceder directamente a:</p>
          <a 
            href="/hero-image-download.jpg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            /hero-image-download.jpg
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadHero;