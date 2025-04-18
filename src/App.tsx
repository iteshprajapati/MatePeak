
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MentorSearch from "./pages/MentorSearch";
import MentorProfile from "./pages/MentorProfile";
import BookingPage from "./pages/BookingPage";
import BookingSuccess from "./pages/BookingSuccess";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import ExpertSignup from "./pages/ExpertSignup";
import ExpertLogin from "./pages/ExpertLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentors" element={<MentorSearch />} />
          <Route path="/mentors/:id" element={<MentorProfile />} />
          <Route path="/book/:id" element={<BookingPage />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/expert/signup" element={<ExpertSignup />} />
          <Route path="/expert/login" element={<ExpertLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
