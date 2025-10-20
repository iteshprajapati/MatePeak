
import { supabase } from "@/integrations/supabase/client";
import { FormValues } from "@/hooks/useExpertOnboardingForm";

export async function updateExpertProfile(data: FormValues) {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("You must be logged in to complete onboarding");
  }
  
  // Convert availability array to a JSON string
  const availabilityJson = JSON.stringify(data.availability);
  
  // First, check if profile exists
  const { data: existingProfile } = await supabase
    .from('expert_profiles')
    .select('id')
    .eq('id', user.id)
    .single();

  if (existingProfile) {
    // Update existing profile
    const { error } = await supabase
      .from('expert_profiles')
      .update({
        full_name: data.fullName,
        username: data.username,
        category: data.category,
        services: {
          oneOnOneSession: data.oneOnOneSession,
          chatAdvice: data.chatAdvice,
          digitalProducts: data.digitalProducts,
          notes: data.notes,
        },
        availability_json: availabilityJson,
        ispaid: data.isPaid,
        pricing: data.pricePerSession,
        bio: data.bio,
        social_links: data.socialLinks,
      })
      .eq('id', user.id);
    
    if (error) throw error;
  } else {
    // Insert new profile
    const { error } = await supabase
      .from('expert_profiles')
      .insert({
        id: user.id,
        full_name: data.fullName,
        username: data.username,
        category: data.category,
        services: {
          oneOnOneSession: data.oneOnOneSession,
          chatAdvice: data.chatAdvice,
          digitalProducts: data.digitalProducts,
          notes: data.notes,
        },
        availability_json: availabilityJson,
        ispaid: data.isPaid,
        pricing: data.pricePerSession,
        bio: data.bio,
        social_links: data.socialLinks,
      });
    
    if (error) throw error;
  }
  
  return { success: true, username: data.username };
}
