import { supabase } from "@/integrations/supabase/client";

/**
 * Get admin dashboard metrics
 */
export async function getAdminMetrics() {
  const { data, error } = await supabase.functions.invoke('admin-metrics');
  
  if (error) {
    console.error('Error fetching admin metrics:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to fetch metrics',
      data: null 
    };
  }
  
  return data;
}

/**
 * Get all institutions
 */
export async function getInstitutions() {
  const { data, error } = await supabase
    .from('institutions')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching institutions:', error);
    return { success: false, error: error.message, data: [] };
  }
  
  return { success: true, data };
}

/**
 * Create or update institution
 */
export async function upsertInstitution(institutionData: {
  id?: string;
  name: string;
  domain_email: string;
  verified: boolean;
  admin_contact?: string;
}) {
  const { data, error } = await supabase
    .from('institutions')
    .upsert(institutionData)
    .select()
    .single();
  
  if (error) {
    console.error('Error upserting institution:', error);
    return { success: false, error: error.message, data: null };
  }
  
  return { success: true, data };
}

/**
 * Verify user's institution
 */
export async function verifyUserInstitution(email: string) {
  const domain = email.split('@')[1];
  
  const { data, error } = await supabase
    .from('institutions')
    .select('*')
    .eq('domain_email', domain)
    .eq('verified', true)
    .single();
  
  if (error) {
    return { success: false, verified: false, institution: null };
  }
  
  return { success: true, verified: true, institution: data };
}
