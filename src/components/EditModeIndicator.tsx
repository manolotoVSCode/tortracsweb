import { useEditableContent } from '@/hooks/useEditableContent';
import { Badge } from '@/components/ui/badge';
import { Edit } from 'lucide-react';

export const EditModeIndicator = () => {
  const { canEdit } = useEditableContent();

  if (!canEdit()) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <Badge variant="secondary" className="bg-primary text-white shadow-lg">
        <Edit className="w-3 h-3 mr-1" />
        Modo Edición Activo
      </Badge>
    </div>
  );
};