
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle, ArrowRight, Star, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { mentors } from "@/data/mentors";
import MentorCard from "@/components/MentorCard";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/mentors?search=${searchQuery}`;
  };

  const featuredMentors = mentors.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-mentor-light to-purple-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-heading">
              Find Your Perfect Mentor
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Connect with expert mentors for personalized guidance in academics, career, wellness, and more.
            </p>
            
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
              <div className="flex items-center bg-white rounded-lg shadow-lg overflow-hidden">
                <Search className="ml-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="What do you need help with? E.g., 'Resume review' or 'Data structures'"
                  className="w-full py-4 px-4 outline-none text-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit" 
                  className="bg-mentor-primary hover:bg-mentor-secondary text-white m-1 py-6"
                >
                  Search
                </Button>
              </div>
            </form>
            
            <div className="flex flex-wrap justify-center mt-8 gap-4">
              <Link to="/mentors?category=academic">
                <Button variant="outline" className="border-mentor-primary text-mentor-primary">
                  Academic Support
                </Button>
              </Link>
              <Link to="/mentors?category=career">
                <Button variant="outline" className="border-mentor-primary text-mentor-primary">
                  Career Guidance
                </Button>
              </Link>
              <Link to="/mentors?category=wellness">
                <Button variant="outline" className="border-mentor-primary text-mentor-primary">
                  Wellness & Fitness
                </Button>
              </Link>
              <Link to="/mentors?category=interview">
                <Button variant="outline" className="border-mentor-primary text-mentor-primary">
                  Mock Interviews
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How SparkMentor Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect with the right mentor for your needs in just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-mentor-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-mentor-primary" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Find Your Mentor</h3>
              <p className="text-gray-600">
                Search for mentors by category, keywords, or browse through our curated list of experts.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-mentor-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-mentor-primary" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Book a Session</h3>
              <p className="text-gray-600">
                Select a time that works for you and describe what you'd like to discuss in your session.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="bg-mentor-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-mentor-primary" size={24} />
              </div>
              <h3 className="text-xl font-medium mb-2">Connect & Grow</h3>
              <p className="text-gray-600">
                Join your scheduled session and get personalized guidance to help you achieve your goals.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button variant="outline" className="border-mentor-primary text-mentor-primary">
                Learn More About How It Works
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Mentors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Mentors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with our top-rated mentors who are ready to help you succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredMentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/mentors">
              <Button className="bg-mentor-primary hover:bg-mentor-secondary text-white">
                View All Mentors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SparkMentor</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform offers unique benefits designed to help college students succeed with the right guidance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6">
              <CheckCircle className="text-mentor-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Verified Experts</h3>
              <p className="text-gray-600">
                Our mentors go through a rigorous verification process to ensure you're getting advice from qualified professionals.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-mentor-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Personalized Guidance</h3>
              <p className="text-gray-600">
                Get tailored advice specific to your unique goals, challenges, and circumstances.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-mentor-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Book sessions at times that work for you, with options for different session durations.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-mentor-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Our secure payment system ensures your transactions are protected, with automatic refunds if needed.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-mentor-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Session ratings and reviews help maintain high-quality mentorship experiences for all students.
              </p>
            </div>
            
            <div className="p-6">
              <CheckCircle className="text-mentor-primary mb-4" size={32} />
              <h3 className="text-xl font-medium mb-2">Diverse Expertise</h3>
              <p className="text-gray-600">
                Find mentors across multiple disciplines, from academic subjects to career guidance and wellness.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students who've found success through our mentorship platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "My mentor helped me completely restructure my resume and prepare for interviews. I landed an internship at my dream company thanks to her guidance!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="ml-3">
                  <h4 className="font-medium">Ananya Patel</h4>
                  <p className="text-gray-500 text-sm">Computer Science Student</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "I was struggling with data structures until I found my mentor on SparkMentor. His teaching approach made complex concepts easy to understand. My grades improved significantly!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="ml-3">
                  <h4 className="font-medium">Rohan Sharma</h4>
                  <p className="text-gray-500 text-sm">Engineering Student</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "The wellness sessions have transformed how I manage stress during exam periods. My mentor provided practical techniques that have improved my mental health and academic performance."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                <div className="ml-3">
                  <h4 className="font-medium">Kavya Singh</h4>
                  <p className="text-gray-500 text-sm">Psychology Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-mentor-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Mentor?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join SparkMentor today and connect with experts who can help you achieve your academic and career goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="bg-white text-mentor-primary hover:bg-gray-100 text-lg px-8 py-6">
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
