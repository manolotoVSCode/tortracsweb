import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, X } from 'lucide-react';
import { useEditableContent } from '@/hooks/useEditableContent';
import { cn } from '@/lib/utils';

interface EditableTextProps {
  contentKey: string;
  fallback: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  type?: 'text' | 'textarea';
}

export const EditableText = ({
  contentKey,
  fallback,
  className,
  as: Component = 'p',
  type = 'text'
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const { getContent, updateContent, canEdit } = useEditableContent();

  const content = getContent(contentKey, fallback);

  const startEdit = () => {
    setEditValue(content);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditValue('');
  };

  const saveEdit = async () => {
    const success = await updateContent(contentKey, editValue);
    if (success) {
      setIsEditing(false);
      setEditValue('');
    }
  };

  if (!canEdit()) {
    return <Component className={className}>{content}</Component>;
  }

  if (isEditing) {
    return (
      <div className="relative group">
        <div className="space-y-2">
          {type === 'textarea' ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="min-h-20"
              rows={4}
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
          )}
          <div className="flex gap-2">
            <Button size="sm" onClick={saveEdit}>
              <Save className="w-3 h-3 mr-1" />
              Guardar
            </Button>
            <Button size="sm" variant="outline" onClick={cancelEdit}>
              <X className="w-3 h-3 mr-1" />
              Cancelar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Component className={cn(className, "relative")}>
        {content}
        <Button
          size="sm"
          variant="ghost"
          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border shadow-sm"
          onClick={startEdit}
        >
          <Edit className="w-3 h-3" />
        </Button>
      </Component>
    </div>
  );
};