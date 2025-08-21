import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Save, X } from 'lucide-react';
import { useEditableContent } from '@/hooks/useEditableContent';
import { cn } from '@/lib/utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditableRichTextProps {
  contentKey: string;
  fallback: string;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

export const EditableRichText = ({
  contentKey,
  fallback,
  className,
  as: Component = 'div'
}: EditableRichTextProps) => {
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

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
  };

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'align'
  ];

  if (!canEdit()) {
    return (
      <Component 
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  if (isEditing) {
    return (
      <div className="relative group">
        <div className="space-y-4">
          <ReactQuill
            value={editValue}
            onChange={setEditValue}
            modules={modules}
            formats={formats}
            theme="snow"
            className="bg-background"
          />
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
      <Component 
        className={cn(className, "relative")}
        dangerouslySetInnerHTML={{ __html: content }}
      >
      </Component>
      <Button
        size="sm"
        variant="ghost"
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background border shadow-sm"
        onClick={startEdit}
      >
        <Edit className="w-3 h-3" />
      </Button>
    </div>
  );
};