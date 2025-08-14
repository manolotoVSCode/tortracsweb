import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, Mail, Phone, Clock } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'contact' | 'job';
  name: string;
  email: string;
}

const SuccessModal = ({ isOpen, onClose, type, name, email }: SuccessModalProps) => {
  const isContact = type === 'contact';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary">
            {isContact ? '¡Cotización enviada!' : '¡Aplicación enviada!'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-center">
          <p className="text-lg text-secondary">
            Hola <span className="font-semibold text-primary">{name}</span>, 
            {isContact 
              ? ' hemos recibido tu solicitud de cotización correctamente.'
              : ' hemos recibido tu aplicación correctamente.'
            }
          </p>
          
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-center space-x-2 text-sm text-secondary">
              <Mail className="w-4 h-4" />
              <span>Se ha enviado una confirmación a: <span className="font-medium">{email}</span></span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-secondary">
              <Clock className="w-4 h-4" />
              <span>
                {isContact 
                  ? 'Te contactaremos dentro de las próximas 24 horas'
                  : 'Revisaremos tu perfil y te contactaremos pronto'
                }
              </span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-secondary">
              <Phone className="w-4 h-4" />
              <span>¿Urgente? Llámanos: +52 55 9057 4880</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {isContact 
              ? 'Mientras tanto, puedes seguirnos en nuestras redes sociales para conocer más sobre TORTRACS.'
              : 'Mantente al pendiente de tu correo electrónico para próximas comunicaciones.'
            }
          </p>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button 
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-white px-8"
          >
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;