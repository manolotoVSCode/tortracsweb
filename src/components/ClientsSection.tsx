import { useLanguage } from '@/hooks/useLanguage';
import kelloggLogo from '/lovable-uploads/68ddff29-13d9-4d92-af21-54df77c890f3.png';
import italikaLogo from '/lovable-uploads/21da500a-61df-407b-b77b-4d48bed21bda.png';
import aksiLogo from '/lovable-uploads/2179f01b-3cc1-451a-be0b-b66c19194984.png';
import mabeLogo from '/lovable-uploads/76973531-d659-4d5b-a54e-a92e2f5428f8.png';
import netoLogo from '/lovable-uploads/1715beb4-224e-4da9-ad38-df744dfde59e.png';
import purinaLogo from '/lovable-uploads/1c996aad-4723-4bfd-b242-49779f6e4727.png';
import kimberlyClarkLogo from '/lovable-uploads/a3df1d4b-926d-405b-97d2-074cccd50059.png';
import nestleLogo from '/lovable-uploads/e7abedb3-166d-493a-95f0-76e67c80a936.png';
import whirlpoolLogo from '/lovable-uploads/47c5580b-9cbb-4f66-a988-6ef271c02eb9.png';
import heinzLogo from '/lovable-uploads/d7506ec2-2f27-430a-8578-25afe0c45e65.png';
import oxxoLogo from '/lovable-uploads/ca140bfc-afdd-4be5-b784-ff798cecdc12.png';
import walmartLogo from '/lovable-uploads/6280365e-4158-42bd-a433-080acd9db5a6.png';

const ClientsSection = () => {
  const { t } = useLanguage();

  const clients = [
    { name: 'Walmart', logo: walmartLogo },
    { name: 'OXXO', logo: oxxoLogo },
    { name: 'Italika', logo: italikaLogo },
    { name: 'Nestlé', logo: nestleLogo },
    { name: 'Kimberly-Clark', logo: kimberlyClarkLogo },
    { name: 'Purina', logo: purinaLogo },
    { name: "Kellogg's", logo: kelloggLogo },
    { name: 'Neto', logo: netoLogo },
    { name: 'Mabe', logo: mabeLogo },
    { name: 'AKSI', logo: aksiLogo },
    { name: 'Whirlpool', logo: whirlpoolLogo },
    { name: 'Heinz', logo: heinzLogo }
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center min-h-[120px]"
            >
              <img 
                src={client.logo} 
                alt={client.name} 
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;