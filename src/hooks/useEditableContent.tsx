import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';

interface EditableContent {
  id: string;
  content_key: string;
  content_value: string;
  content_type: string;
  section: string;
  created_at: string;
  updated_at: string;
  updated_by: string | null;
}

export const useEditableContent = () => {
  const [content, setContent] = useState<Record<string, EditableContent>>({});
  const [loading, setLoading] = useState(true);
  const { userRole, session } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('editable_content')
        .select('*');

      if (error) throw error;

      const contentMap = data.reduce((acc, item) => {
        acc[item.content_key] = item;
        return acc;
      }, {} as Record<string, EditableContent>);

      setContent(contentMap);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (contentKey: string, newValue: string) => {
    if (userRole !== 'super_admin') {
      toast({
        title: "Sin permisos",
        description: "Solo los Super Admins pueden editar contenido",
        variant: "destructive",
      });
      return false;
    }

    try {
      
      const { error } = await supabase
        .from('editable_content')
        .update({ 
          content_value: newValue,
          updated_by: session?.user?.id 
        })
        .eq('content_key', contentKey);

      if (error) throw error;

      // Update local state
      setContent(prev => ({
        ...prev,
        [contentKey]: {
          ...prev[contentKey],
          content_value: newValue
        }
      }));

      toast({
        title: "Contenido actualizado",
        description: "Los cambios se han guardado exitosamente",
      });

      return true;
    } catch (error) {
      console.error('Error updating content:', error);
      toast({
        title: "Error",
        description: "No se pudo guardar el contenido",
        variant: "destructive",
      });
      return false;
    }
  };

  const getContent = (key: string, fallback: string = '') => {
    return content[key]?.content_value || fallback;
  };

  const canEdit = () => {
    return userRole === 'super_admin';
  };

  return {
    content,
    loading,
    updateContent,
    getContent,
    canEdit
  };
};