import { useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-4xl font-heading font-bold text-primary mb-2">
            {t('privacy.title')}
          </h1>
          <p className="text-secondary font-body">
            {t('privacy.updated')}
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <p className="text-secondary font-body leading-relaxed text-lg">
                {t('privacy.intro')}
              </p>
            </CardContent>
          </Card>

          {/* Personal Data Collected */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                {t('privacy.data.title')}
              </h2>
              <p className="text-secondary font-body leading-relaxed">
                {t('privacy.data.content')}
              </p>
            </CardContent>
          </Card>

          {/* Processing Purposes */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                {t('privacy.purpose.title')}
              </h2>
              <p className="text-secondary font-body leading-relaxed">
                {t('privacy.purpose.content')}
              </p>
            </CardContent>
          </Card>

          {/* ARCO Rights */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                {t('privacy.rights.title')}
              </h2>
              <p className="text-secondary font-body leading-relaxed">
                {t('privacy.rights.content')}
              </p>
            </CardContent>
          </Card>

          {/* Privacy Contact */}
          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                {t('privacy.contact.title')}
              </h2>
              <p className="text-secondary font-body leading-relaxed">
                {t('privacy.contact.content')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;