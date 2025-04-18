
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MentorProfile } from '@/components/MentorCard';

export function useAISearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMentors = async (query: string): Promise<MentorProfile[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query }
      });

      if (error) throw error;
      return data.mentors;
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search mentors. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { searchMentors, isLoading, error };
}
