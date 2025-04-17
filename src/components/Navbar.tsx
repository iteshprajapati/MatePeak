
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
          <span className="text-2xl font-bold gradient-heading">SparkMentor</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-mentor-primary transition-colors">
            Home
          </Link>
          <Link to="/mentors" className="text-gray-700 hover:text-mentor-primary transition-colors">
            Find Mentors
          </Link>
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-mentor-primary transition-colors">
              Categories <ChevronDown className="ml-1 h-4 w-4" />
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
          <Link to="/how-it-works" className="text-gray-700 hover:text-mentor-primary transition-colors">
            How It Works
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="border-mentor-primary text-mentor-primary hover:bg-mentor-light">
            <Link to="/login">Log In</Link>
          </Button>
          <Button className="bg-mentor-primary hover:bg-mentor-secondary text-white">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-mentor-primary"
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
              className="text-gray-700 hover:text-mentor-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/mentors"
              className="text-gray-700 hover:text-mentor-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Mentors
            </Link>
            <div className="py-2">
              <div className="text-gray-700 font-medium">Categories</div>
              <div className="ml-4 mt-2 flex flex-col space-y-2">
                <Link 
                  to="/mentors?category=academic" 
                  className="text-gray-700 hover:text-mentor-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Academic Support
                </Link>
                <Link 
                  to="/mentors?category=career" 
                  className="text-gray-700 hover:text-mentor-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Career Guidance
                </Link>
                <Link 
                  to="/mentors?category=wellness" 
                  className="text-gray-700 hover:text-mentor-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wellness & Fitness
                </Link>
                <Link 
                  to="/mentors?category=interview" 
                  className="text-gray-700 hover:text-mentor-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mock Interviews
                </Link>
              </div>
            </div>
            <Link
              to="/how-it-works"
              className="text-gray-700 hover:text-mentor-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <div className="flex flex-col space-y-3 pt-2">
              <Button variant="outline" className="border-mentor-primary text-mentor-primary w-full">
                <Link to="/login" className="w-full">Log In</Link>
              </Button>
              <Button className="bg-mentor-primary hover:bg-mentor-secondary text-white w-full">
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
