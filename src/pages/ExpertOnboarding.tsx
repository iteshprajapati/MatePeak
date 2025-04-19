
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

import { Form } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import OnboardingHeader from "@/components/onboarding/OnboardingHeader";
import BasicInfoStep from "@/components/onboarding/BasicInfoStep";
import ServiceTypesStep from "@/components/onboarding/ServiceTypesStep";
import AvailabilityStep from "@/components/onboarding/AvailabilityStep";
import PricingStep from "@/components/onboarding/PricingStep";
import ProfileSetupStep from "@/components/onboarding/ProfileSetupStep";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import StepNavigation from "@/components/onboarding/StepNavigation";
import { useExpertOnboardingForm } from "@/hooks/useExpertOnboardingForm";
import { updateExpertProfile } from "@/services/expertProfileService";

export default function ExpertOnboarding() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const form = useExpertOnboardingForm();
  
  const totalSteps = 5;
  
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      await updateExpertProfile(data);
      toast.success("Profile created successfully!");
      navigate(`/expert/dashboard`);
    } catch (error: any) {
      console.error("Error creating profile:", error);
      toast.error(error.message || "Failed to create profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleNext = async () => {
    let isValid = false;
    
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
              
              <StepNavigation
                currentStep={step}
                totalSteps={totalSteps}
                onBack={handleBack}
                onNext={handleNext}
                isSubmitting={isSubmitting}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
