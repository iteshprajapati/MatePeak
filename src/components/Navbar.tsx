
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold font-poppins gradient-heading">MatePeak</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-matepeak-primary transition-colors relative group">
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-matepeak-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-matepeak-primary transition-colors">
              Category <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 hidden group-hover:block">
              <Link to="/mentors?category=academic" className="block px-4 py-2 text-gray-700 hover:bg-mentor-light">
                Academic Support
              </Link>
              <Link to="/mentors?category=career" className="block px-4 py-2 text-gray-700 hover:bg-mentor-light">
                Career Guidance
              </Link>
              <Link to="/mentors?category=wellness" className="block px-4 py-2 text-gray-700 hover:bg-mentor-light">
                Wellness & Fitness
              </Link>
              <Link to="/mentors?category=interview" className="block px-4 py-2 text-gray-700 hover:bg-mentor-light">
                Mock Interviews
              </Link>
            </div>
          </div>
          <Link to="/for-experts" className="text-gray-700 hover:text-matepeak-primary transition-colors relative group">
            For Experts
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-matepeak-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button className="bg-matepeak-dark hover:bg-matepeak-secondary text-white">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-matepeak-primary"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 mt-2 shadow-inner">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-matepeak-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <div className="py-2">
              <div className="text-gray-700 font-medium">Categories</div>
              <div className="ml-4 mt-2 flex flex-col space-y-2">
                <Link 
                  to="/mentors?category=academic" 
                  className="text-gray-700 hover:text-matepeak-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Academic Support
                </Link>
                <Link 
                  to="/mentors?category=career" 
                  className="text-gray-700 hover:text-matepeak-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Career Guidance
                </Link>
                <Link 
                  to="/mentors?category=wellness" 
                  className="text-gray-700 hover:text-matepeak-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wellness & Fitness
                </Link>
                <Link 
                  to="/mentors?category=interview" 
                  className="text-gray-700 hover:text-matepeak-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mock Interviews
                </Link>
              </div>
            </div>
            <Link
              to="/for-experts"
              className="text-gray-700 hover:text-matepeak-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              For Experts
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Button className="bg-matepeak-dark hover:bg-matepeak-secondary text-white w-full">
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
