
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-matepeak-primary pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/b5453978-cecb-49b4-9519-4d389449e3c4.png" 
                alt="MatePeak Logo" 
                className="h-16"
              />
            </div>
            <p className="text-gray-300 mb-6 text-lg">
              Connecting college students with the right mentors for personalized growth in academics, career, wellness, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300 transition-colors transform hover:scale-110 duration-200">
                <Facebook size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors transform hover:scale-110 duration-200">
                <Twitter size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors transform hover:scale-110 duration-200">
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors transform hover:scale-110 duration-200">
                <Linkedin size={24} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-6 text-xl">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative inline-block">
                    Home
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative inline-block">
                    Find Mentors
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative inline-block">
                    How It Works
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative inline-block">
                    About Us
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-medium mb-6 text-xl">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/mentors?category=academic" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative inline-block">
                    Academic Support
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/mentors?category=career" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative inline-block">
                    Career Guidance
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/mentors?category=wellness" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative inline-block">
                    Wellness & Fitness
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/mentors?category=interview" className="text-gray-300 hover:text-white transition-colors relative group">
                  <span className="relative inline-block">
                    Mock Interviews
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              &copy; {new Date().getFullYear()} MatePeak. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors relative group">
                <span className="relative inline-block">
                  Privacy Policy
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors relative group">
                <span className="relative inline-block">
                  Terms of Service
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </Link>
              <Link to="/cookies" className="text-gray-300 hover:text-white transition-colors relative group">
                <span className="relative inline-block">
                  Cookie Policy
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
