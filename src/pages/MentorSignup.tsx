
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

export default function MentorSignup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;
    const expertise = formData.get("expertise") as string;

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            expertise: expertise,
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

      toast.success("Account created successfully! Please check your email to confirm your account.");
      
      // If user was created successfully, navigate to onboarding flow
      if (data.user) {
        navigate("/expert/onboarding");
      } else {
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
          <Label htmlFor="expertise">Area of Expertise</Label>
          <Input
            id="expertise"
            name="expertise"
            type="text"
            required
            placeholder="e.g., Career Coaching, Academic Support"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
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
