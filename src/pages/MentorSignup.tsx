
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { GraduationCap, Briefcase, Heart, Code, BookOpen, Palette, TrendingUp, Users, CheckCircle2, XCircle } from "lucide-react";

const expertiseOptions = [
  { value: "Career Coaching", icon: Briefcase, color: "bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-400" },
  { value: "Academic Support", icon: GraduationCap, color: "bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-400" },
  { value: "Mental Health", icon: Heart, color: "bg-pink-50 border-pink-200 hover:bg-pink-100 hover:border-pink-400" },
  { value: "Programming & Tech", icon: Code, color: "bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-400" },
  { value: "Test Preparation", icon: BookOpen, color: "bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-400" },
  { value: "Creative Arts", icon: Palette, color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-400" },
  { value: "Business & Finance", icon: TrendingUp, color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400" },
  { value: "Leadership & Development", icon: Users, color: "bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-400" },
];

export default function MentorSignup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExpertise, setSelectedExpertise] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  const validateUsernameFormat = (value: string): string | null => {
    if (!value) return "Username is required";
    if (value.length > 30) return "Username must be less than 30 characters";
    if (!/^[a-z]/.test(value)) return "Username must start with a letter";
    if (!/^[a-z0-9._]+$/.test(value)) return "Username can only contain lowercase letters, numbers, periods, and underscores";
    if (/[._]{2,}/.test(value)) return "Username cannot contain consecutive periods or underscores";
    return null;
  };

  const checkUsernameAvailability = async (value: string) => {
    const formatError = validateUsernameFormat(value);
    if (formatError) {
      setUsernameError(formatError);
      setUsernameValid(false);
      setUsernameSuggestions([]);
      return;
    }

    setIsCheckingUsername(true);
    try {
      const { data, error } = await supabase
        .from("expert_profiles")
        .select("username")
        .ilike("username", value)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setUsernameError("Username is already taken");
        setUsernameValid(false);
        
        // Generate suggestions
        const suggestions = [
          `${value}_${Math.floor(Math.random() * 1000)}`,
          `${value}.mentor`,
          `${value}_expert`
        ];
        setUsernameSuggestions(suggestions);
      } else {
        setUsernameError("");
        setUsernameValid(true);
        setUsernameSuggestions([]);
      }
    } catch (error) {
      console.error("Error checking username:", error);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  useEffect(() => {
    if (!username) {
      setUsernameError("");
      setUsernameValid(false);
      setUsernameSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      checkUsernameAvailability(username);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [username]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    if (!usernameValid) {
      toast.error("Please choose a valid and available username");
      return;
    }
    
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const fullName = formData.get("fullName") as string;
    
    if (!selectedExpertise) {
      toast.error("Please select your area of expertise");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username,
            expertise: selectedExpertise,
            role: 'mentor'
          }
        },
      });

      if (error) {
        console.error('Signup error:', error);
        
        // Handle specific error cases with better messages
        if (error.message.includes('fetch')) {
          toast.error("Connection error. Please check your internet connection and try again.");
        } else if (error.message.includes('User already registered')) {
          toast.error("An account with this email already exists. Please try logging in.");
        } else if (error.message.includes('Invalid email')) {
          toast.error("Please enter a valid email address.");
        } else if (error.message.includes('Password')) {
          toast.error("Password must be at least 6 characters long.");
        } else if (error.message.includes('rate limit') || error.message.includes('too many')) {
          toast.error("Too many attempts. Please wait a moment and try again.");
        } else {
          toast.error(error.message || "Failed to create account. Please try again.");
        }
        return;
      }

      // With email confirmation disabled, session should be available immediately
      if (data.session) {
        toast.success("Account created successfully! Redirecting to onboarding...");
        navigate("/expert/onboarding");
      } else {
        toast.error("Failed to create session. Please try logging in.");
        navigate("/expert/login");
      }
    } catch (error: any) {
      console.error('Unexpected error during signup:', error);
      
      // Handle network and other errors
      if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('network'))) {
        toast.error("Unable to connect to server. Please check your internet connection.");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create a Mentor Account"
      description="Share your expertise and help students succeed"
      footer="Already have an account?"
      footerLink="/expert/login"
      footerLinkText="Sign in"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            required
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="relative">
            <Input
              id="username"
              name="username"
              type="text"
              required
              maxLength={30}
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              className={usernameError ? "border-destructive" : usernameValid ? "border-green-500" : ""}
            />
            {isCheckingUsername && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}
            {!isCheckingUsername && username && usernameValid && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
            {!isCheckingUsername && username && usernameError && (
              <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-destructive" />
            )}
          </div>
          {usernameError && (
            <p className="text-sm text-destructive">{usernameError}</p>
          )}
          {usernameSuggestions.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Try these instead:</p>
              <div className="flex gap-2 flex-wrap">
                {usernameSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setUsername(suggestion)}
                    className="text-sm px-2 py-1 rounded bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="expertise">Select Your Expertise</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {expertiseOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedExpertise(option.value)}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-lg border-2 
                    transition-all duration-200 
                    ${selectedExpertise === option.value 
                      ? 'ring-2 ring-matepeak-primary ring-offset-2 border-matepeak-primary bg-matepeak-primary/5' 
                      : option.color
                    }
                  `}
                >
                  <Icon className={`h-6 w-6 ${selectedExpertise === option.value ? 'text-matepeak-primary' : 'text-gray-700'}`} />
                  <span className={`text-sm font-medium text-center ${selectedExpertise === option.value ? 'text-matepeak-primary' : 'text-gray-700'}`}>
                    {option.value}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setPasswordError("");
            }}
          />
          {passwordError && (
            <p className="text-sm text-destructive">{passwordError}</p>
          )}
        </div>
        <Button 
          className="w-full" 
          type="submit" 
          disabled={isLoading || !usernameValid || !password || !confirmPassword || password !== confirmPassword || password.length < 6 || isCheckingUsername}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Want to join as a student?{" "}
        <a href="/student/signup" className="text-matepeak-primary hover:underline font-medium">
          Sign up as student
        </a>
      </p>
    </AuthLayout>
  );
}
