import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { mentors } from "@/data/mentors";
import MentorCard from "@/components/MentorCard";
import AnimatedSearchBar from "@/components/AnimatedSearchBar";

const Index = () => {
  const featuredMentors = mentors.slice(0, 6);
  
  // Refs for scroll animation sections
  const sectionRefs = {
    howItWorks: useRef<HTMLDivElement>(null),
    mentors: useRef<HTMLDivElement>(null),
  };

  // Handle scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up', 'opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all section refs
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        ref.current.classList.add('opacity-0');
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);
  
  const categories = [
    "Recent Graduates",
    "Academic Support",
    "Mock Interviews",
    "Resume Review",
    "Health"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
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
      
      {/* How It Works */}
      <section className="py-16 bg-white" ref={sectionRefs.howItWorks}>
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
      
      {/* Featured Mentors Sections */}
      <section className="py-16 bg-gray-50" ref={sectionRefs.mentors}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-matepeak-primary">Our Mentors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with our top-rated mentors across various categories who are ready to help you succeed.
            </p>
          </div>
          
          {categories.map((category) => {
            const categoryMentors = mentors.filter(m => 
              m.categories.includes(category)
            ).slice(0, 4);

            return (
              <div key={category} className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">{category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryMentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Link to={`/mentors?category=${encodeURIComponent(category)}`}>
                    <Button variant="outline" className="border-matepeak-primary text-matepeak-primary hover:bg-gray-100">
                      View All {category} Mentors
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
          
          <div className="text-center mt-12">
            <Link to="/mentors">
              <Button className="bg-matepeak-dark hover:bg-matepeak-secondary text-white">
                View All Mentors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
