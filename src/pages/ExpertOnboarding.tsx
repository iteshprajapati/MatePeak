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
      navigate("/expert/dashboard");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-matepeak-primary/5 py-12 flex flex-col items-center px-4">
      <OnboardingHeader />
      
      <Card className="w-full max-w-3xl shadow-2xl bg-white border-t-4 border-matepeak-primary animate-fade-in">
        <CardContent className="p-8">
          <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
          
          <div className="mt-8 mb-6">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-matepeak-primary to-[#FFD966] transition-all duration-500 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
          
          <Form {...form}>
            <form className="space-y-8">
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
