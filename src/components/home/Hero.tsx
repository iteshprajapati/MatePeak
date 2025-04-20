
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSearchBar from "@/components/AnimatedSearchBar";

const Hero = () => {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-matepeak-primary font-poppins">
            Get the cheat codes from the pros
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            No fluff. Just real lessons from real people.
          </p>
          
          <AnimatedSearchBar />
          
          <div className="flex flex-wrap justify-center mt-8 gap-4">
            <Link to="/mentors?category=academic">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                Academic Support
              </Button>
            </Link>
            <Link to="/mentors?category=career">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                Career Guidance
              </Button>
            </Link>
            <Link to="/mentors?category=wellness">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                Wellness & Fitness
              </Button>
            </Link>
            <Link to="/mentors?category=interview">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
                Mock Interviews
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
