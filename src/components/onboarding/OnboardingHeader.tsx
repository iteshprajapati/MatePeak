
import { Link } from "react-router-dom";

export default function OnboardingHeader() {
  return (
    <div className="mb-8 text-center">
      <Link to="/" className="inline-block mb-2">
        <h1 className="text-3xl font-bold text-matepeak-primary">MatePeak</h1>
      </Link>
      <h2 className="text-2xl font-semibold">Expert Onboarding</h2>
      <p className="text-gray-600 mt-2">Complete your profile to start mentoring on MatePeak</p>
    </div>
  );
}
