
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { mentors } from "@/data/mentors";
import MentorCard from "@/components/MentorCard";
import AnimatedSearchBar from "@/components/AnimatedSearchBar";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  const featuredMentors = mentors.slice(0, 6);
  
  // Refs for scroll animation sections
  const sectionRefs = {
    howItWorks: useRef<HTMLDivElement>(null),
    mentors: useRef<HTMLDivElement>(null),
    benefits: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-matepeak-primary">
              Matepeak
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
      
      {/* Featured Mentors */}
      <section className="py-16 bg-gray-50" ref={sectionRefs.mentors}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-matepeak-primary">Featured Mentors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with our top-rated mentors who are ready to help you succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
          
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
      
      {/* Benefits Section */}
      <section className="py-16 bg-white" ref={sectionRefs.benefits}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-matepeak-primary">Why Choose Matepeak</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique benefits designed to help college students succeed with the right guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6">
              <CheckCircle className="text-matepeak-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Verified Experts</h3>
              <p className="text-gray-600">
                Our mentors go through a rigorous verification process to ensure you're getting advice from qualified professionals.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-matepeak-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">
                Get tailored advice specific to your unique goals, challenges, and circumstances.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-matepeak-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Book sessions at times that work for you, with options for different session durations.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-matepeak-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Our secure payment system ensures your transactions are protected, with automatic refunds if needed.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-matepeak-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Session ratings and reviews help maintain high-quality mentorship experiences for all students.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-matepeak-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Diverse Expertise</h3>
              <p className="text-gray-600">
                Find mentors across multiple disciplines, from academic subjects to career guidance and wellness.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact/Feedback Section */}
      <section className="py-16 bg-gray-50" ref={sectionRefs.contact}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-matepeak-primary">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-matepeak-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Mentor?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Matepeak today and connect with experts who can help you achieve your academic and career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-white text-matepeak-dark hover:bg-gray-100 text-lg px-8 py-6">
                Get Started
              </Button>
            </Link>
            <Link to="/mentors">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Browse Mentors
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
