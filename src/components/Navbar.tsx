
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleExpertClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate('/expert/dashboard');
    } else {
      navigate('/expert/signup');
    }
  };

  return (
    <nav className="bg-matepeak-primary py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/14bf0eea-1bc9-4675-9231-356df10eb82d.png" 
            alt="MatePeak Logo"
            className="h-8 mr-2"
          />
          <span className="text-2xl font-bold font-poppins text-white">MatePeak</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-[#FFD966] transition-colors relative group">
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#FFD966] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
          <div className="relative group">
            <button className="flex items-center text-white hover:text-[#FFD966] transition-colors">
              Category <ChevronDown className="ml-1 h-4 w-4 text-white" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-matepeak-primary rounded-md shadow-lg py-2 z-10 hidden group-hover:block transition-all duration-300 hover:block" 
                 style={{ transitionDelay: "0.2s" }}>
              <div className="py-2 px-1">
                <Link to="/mentors?category=academic" className="block px-4 py-2 text-white hover:bg-matepeak-secondary hover:text-[#FFD966] rounded-md mx-1">
                  Academic Support
                </Link>
                <Link to="/mentors?category=career" className="block px-4 py-2 text-white hover:bg-matepeak-secondary hover:text-[#FFD966] rounded-md mx-1">
                  Career Guidance
                </Link>
                <Link to="/mentors?category=wellness" className="block px-4 py-2 text-white hover:bg-matepeak-secondary hover:text-[#FFD966] rounded-md mx-1">
                  Wellness & Fitness
                </Link>
                <Link to="/mentors?category=interview" className="block px-4 py-2 text-white hover:bg-matepeak-secondary hover:text-[#FFD966] rounded-md mx-1">
                  Mock Interviews
                </Link>
              </div>
            </div>
          </div>
          <Link to="/for-experts" className="text-white hover:text-[#FFD966] transition-colors relative group">
            For Experts
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#FFD966] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            className="bg-white text-matepeak-primary hover:bg-[#FFD966] font-bold rounded-lg transition-colors duration-300"
            onClick={handleExpertClick}
          >
            Become an Expert
          </Button>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-[#FFD966]"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-matepeak-primary py-4 px-4 mt-2 shadow-inner">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="py-2">
              <div className="text-white font-medium">Categories</div>
              <div className="ml-4 mt-2 flex flex-col space-y-2">
                <Link 
                  to="/mentors?category=academic" 
                  className="text-white hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Academic Support
                </Link>
                <Link 
                  to="/mentors?category=career" 
                  className="text-white hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Career Guidance
                </Link>
                <Link 
                  to="/mentors?category=wellness" 
                  className="text-white hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wellness & Fitness
                </Link>
                <Link 
                  to="/mentors?category=interview" 
                  className="text-white hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mock Interviews
                </Link>
              </div>
            </div>
            <Link
              to="/for-experts"
              className="text-white hover:text-gray-200 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              For Experts
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Button className="bg-white text-matepeak-primary hover:bg-gray-100 w-full font-bold rounded-lg">
                <Link to="/signup" className="w-full">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
