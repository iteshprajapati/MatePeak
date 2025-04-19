
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
  
  // Update user profile in database
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
      isPaid: data.isPaid,
      hourly_rate: data.pricePerSession,
      bio: data.bio,
      social_links: data.socialLinks,
    })
    .eq('id', user.id);
  
  if (error) throw error;
  
  return { success: true };
}
