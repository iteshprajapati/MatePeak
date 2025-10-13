
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import RoleSelectionModal from "./RoleSelectionModal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStartedClick = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      navigate('/expert/dashboard');
    } else {
      setIsRoleModalOpen(true);
    }
  };

  const handleSignInClick = () => {
    navigate('/expert/login');
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

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost"
            className="text-white hover:text-[#FFD966] hover:bg-white/10 font-medium"
            onClick={handleSignInClick}
          >
            Sign In
          </Button>
          <Button 
            className="bg-white text-matepeak-primary hover:bg-[#FFD966] font-bold rounded-lg transition-colors duration-300"
            onClick={handleGetStartedClick}
          >
            Get Started
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
          <div className="flex flex-col space-y-3">
            <Button 
              variant="ghost"
              className="text-white hover:text-[#FFD966] hover:bg-white/10 w-full font-medium justify-start"
              onClick={() => {
                handleSignInClick();
                setIsMenuOpen(false);
              }}
            >
              Sign In
            </Button>
            <Button 
              className="bg-white text-matepeak-primary hover:bg-gray-100 w-full font-bold rounded-lg"
              onClick={() => {
                handleGetStartedClick();
                setIsMenuOpen(false);
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}

      <RoleSelectionModal 
        open={isRoleModalOpen} 
        onOpenChange={setIsRoleModalOpen} 
      />
    </nav>
  );
};

export default Navbar;
