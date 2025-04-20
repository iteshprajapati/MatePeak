
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar } from "lucide-react";

interface HowItWorksProps {
  sectionRef: React.RefObject<HTMLDivElement>;
}

const HowItWorks = ({ sectionRef }: HowItWorksProps) => {
  return (
    <section className="py-16 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-matepeak-primary">How Matepeak Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to connect with the right mentor for your needs in just a few simple steps.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-matepeak-primary" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Find Your Mentor</h3>
            <p className="text-gray-600">
              Search for mentors by category, keywords, or browse through our curated list of experts.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-matepeak-primary" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Book a Session</h3>
            <p className="text-gray-600">
              Select a time that works for you and describe what you'd like to discuss in your session.
            </p>
          </div>
          
          <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-matepeak-primary" size={24} />
            </div>
            <h3 className="text-xl font-medium mb-2">Connect & Grow</h3>
            <p className="text-gray-600">
              Join your scheduled session and get personalized guidance to help you achieve your goals.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/how-it-works">
            <Button variant="outline" className="border-matepeak-primary text-matepeak-primary hover:bg-gray-100">
              Learn More About How It Works
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
