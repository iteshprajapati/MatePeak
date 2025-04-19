
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import BasicInfoStep from "@/components/onboarding/BasicInfoStep";
import ServiceTypesStep from "@/components/onboarding/ServiceTypesStep";
import AvailabilityStep from "@/components/onboarding/AvailabilityStep";
import PricingStep from "@/components/onboarding/PricingStep";
import ProfileSetupStep from "@/components/onboarding/ProfileSetupStep";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";

// Define the schema for each step
const basicInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, underscores, and hyphens"),
  category: z.string().min(1, "Please select a category"),
});

const serviceTypesSchema = z.object({
  oneOnOneSession: z.boolean().optional(),
  chatAdvice: z.boolean().optional(),
  digitalProducts: z.boolean().optional(),
  notes: z.boolean().optional(),
});

const availabilitySchema = z.object({
  availability: z.array(
    z.object({
      day: z.string(),
      slots: z.array(
        z.object({
          start: z.string(),
          end: z.string(),
        })
      ).optional(),
    })
  ).optional(),
});

const pricingSchema = z.object({
  isPaid: z.boolean(),
  pricePerSession: z.number().optional().nullable(),
});

const profileSetupSchema = z.object({
  profilePicture: z.any().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  socialLinks: z.object({
    linkedin: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
    instagram: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
    twitter: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
  }).optional(),
});

// Combine all schemas
const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...serviceTypesSchema.shape,
  ...availabilitySchema.shape,
  ...pricingSchema.shape,
  ...profileSetupSchema.shape,
});

type FormValues = z.infer<typeof formSchema>;

export default function ExpertOnboarding() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const totalSteps = 5;
  
  // Create form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
      category: "",
      oneOnOneSession: false,
      chatAdvice: false,
      digitalProducts: false,
      notes: false,
      availability: [],
      isPaid: true,
      pricePerSession: 0,
      bio: "",
      socialLinks: {
        linkedin: "",
        instagram: "",
        twitter: "",
      },
    },
    mode: "onChange",
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to complete onboarding");
        navigate("/expert/login");
        return;
      }
      
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
          availability: data.availability,
          isPaid: data.isPaid,
          hourly_rate: data.pricePerSession,
          bio: data.bio,
          social_links: data.socialLinks,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast.success("Profile created successfully!");
      navigate(`/expert/dashboard`);
    } catch (error: any) {
      console.error("Error creating profile:", error);
      toast.error(error.message || "Failed to create profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle specific validation for current step
  const handleNext = async () => {
    let isValid = false;
    
    // Validate the current step
    try {
      switch (step) {
        case 1:
          isValid = await form.trigger(['fullName', 'username', 'category']);
          break;
        case 2:
          isValid = true; // All fields are optional here
          break;
        case 3:
          isValid = true; // Availability is optional
          break;
        case 4:
          isValid = await form.trigger(['isPaid', 'pricePerSession']);
          break;
        case 5:
          isValid = await form.trigger(['bio', 'socialLinks']);
          
          if (isValid) {
            await form.handleSubmit(onSubmit)();
            return;
          }
          break;
      }
      
      if (isValid) {
        setStep(prev => Math.min(prev + 1, totalSteps));
      }
    } catch (err) {
      console.error("Validation error:", err);
    }
  };
  
  const handleBack = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };
  
  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfoStep form={form} />;
      case 2:
        return <ServiceTypesStep form={form} />;
      case 3:
        return <AvailabilityStep form={form} />;
      case 4:
        return <PricingStep form={form} />;
      case 5:
        return <ProfileSetupStep form={form} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex flex-col items-center">
      <OnboardingHeader />
      
      <Card className="w-full max-w-2xl shadow-lg bg-white">
        <CardContent className="p-6">
          <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
          
          <Form {...form}>
            <form className="space-y-6">
              {renderStep()}
              
              <div className="flex justify-between pt-6">
                {step > 1 ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button 
                  type="button" 
                  onClick={handleNext}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : step === totalSteps ? "Complete" : "Next"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
