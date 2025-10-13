
import { UseFormReturn } from "react-hook-form";
import { User, AtSign, Briefcase, HelpCircle } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define categories
const EXPERTISE_CATEGORIES = [
  "Career Guidance",
  "Academic Support",
  "UPSC Preparation",
  "Design",
  "Coding & Development",
  "Business & Entrepreneurship",
  "Marketing",
  "Finance",
  "Health & Wellness",
  "Creative Arts",
  "Resume Review",
  "Mock Interviews",
  "Language Learning",
  "Public Speaking",
  "Personal Branding",
  "Other",
];

export default function BasicInfoStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <TooltipProvider>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-matepeak-primary/10 flex items-center justify-center">
            <User className="w-6 h-6 text-matepeak-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Basic Information</h3>
            <p className="text-gray-600 text-sm">Let's start with some basic details about you</p>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="group">
              <div className="flex items-center gap-2">
                <FormLabel className="flex items-center gap-2">
                  <User className="w-4 h-4 text-matepeak-primary" />
                  Full Name
                </FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your name will be visible to students on your profile</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <Input 
                  placeholder="John Doe" 
                  {...field} 
                  className="transition-all hover:border-matepeak-primary focus:border-matepeak-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="group">
              <div className="flex items-center gap-2">
                <FormLabel className="flex items-center gap-2">
                  <AtSign className="w-4 h-4 text-matepeak-primary" />
                  Username
                </FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This will be your unique profile URL</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                    matepeak.com/
                  </span>
                  <Input 
                    placeholder="johndoe" 
                    {...field} 
                    className="pl-[140px] transition-all hover:border-matepeak-primary focus:border-matepeak-primary"
                  />
                </div>
              </FormControl>
              <FormDescription className="text-xs">
                Choose a unique username for your profile
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="group">
              <div className="flex items-center gap-2">
                <FormLabel className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-matepeak-primary" />
                  Category of Expertise
                </FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the main area where you provide mentorship</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="transition-all hover:border-matepeak-primary">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EXPERTISE_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TooltipProvider>
  );
}
