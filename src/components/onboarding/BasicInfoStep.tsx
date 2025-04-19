
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Basic Information</h3>
      <p className="text-gray-600 mb-4">Let's start with some basic details about you.</p>
      
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <span className="text-gray-500 pr-2">matepeak.com/</span>
                <Input placeholder="johndoe" {...field} />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category of Expertise</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
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
  );
}
