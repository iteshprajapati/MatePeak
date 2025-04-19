
import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isSubmitting: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isSubmitting,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between pt-6">
      {currentStep > 1 ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          disabled={isSubmitting}
        >
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      <Button 
        type="button" 
        onClick={onNext}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving..." : currentStep === totalSteps ? "Complete" : "Next"}
      </Button>
    </div>
  );
}
