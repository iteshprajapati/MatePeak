
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 gradient-heading">SparkMentor</h3>
            <p className="text-gray-600 mb-4">
              Connecting college students with the right mentors for personalized growth in academics, career, wellness, and more.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-mentor-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-mentor-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-mentor-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-mentor-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mentors?category=academic" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  Academic Support
                </Link>
              </li>
              <li>
                <Link to="/mentors?category=career" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link to="/mentors?category=wellness" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  Wellness & Fitness
                </Link>
              </li>
              <li>
                <Link to="/mentors?category=interview" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  Mock Interviews
                </Link>
              </li>
              <li>
                <Link to="/mentors?category=project" className="text-gray-600 hover:text-mentor-primary transition-colors">
                  Project Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-800 font-medium mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-mentor-primary mr-3 mt-0.5" />
                <span className="text-gray-600">
                  SparkMentor, Bangalore, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-mentor-primary mr-3" />
                <span className="text-gray-600">+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-mentor-primary mr-3" />
                <span className="text-gray-600">support@sparkmentor.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} SparkMentor. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-600 text-sm hover:text-mentor-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-600 text-sm hover:text-mentor-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-600 text-sm hover:text-mentor-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
