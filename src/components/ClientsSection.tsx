import { useLanguage } from '@/hooks/useLanguage';

const ClientsSection = () => {
  const { t } = useLanguage();

  const clients = [
    'Nestlé', 'Kimberly-Clark', 'Purina', 'Kellogg\'s',
    'Real', 'Pappel Packaging', 'Neto', 'Sinax',
    'Mabe', 'AKSI', 'Unilever', 'IMASA'
  ];

  return (
    <section id="clientes" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            {t('clients.title')}
          </h2>
          <p className="text-xl text-secondary font-body max-w-3xl mx-auto">
            {t('clients.subtitle')}
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center min-h-[120px]"
            >
              <span className="text-lg font-semibold text-secondary text-center">
                {client}
              </span>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <p className="text-lg text-secondary font-body">
            {t('clients.trust')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;