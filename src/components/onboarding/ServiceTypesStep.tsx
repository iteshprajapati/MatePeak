
import { UseFormReturn } from "react-hook-form";
import { Video, MessageSquare, ShoppingBag, FileText, CheckCircle2, Sparkles } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

const services = [
  {
    name: "oneOnOneSession",
    icon: Video,
    label: "1-on-1 Session",
    description: "Offer personal one-on-one video or voice call sessions with mentees.",
  },
  {
    name: "chatAdvice",
    icon: MessageSquare,
    label: "Chat Advice",
    description: "Provide advice and guidance through text-based chat.",
  },
  {
    name: "digitalProducts",
    icon: ShoppingBag,
    label: "Digital Products",
    description: "Sell courses, ebooks, or other digital products.",
  },
  {
    name: "notes",
    icon: FileText,
    label: "Notes / Bootcamp Materials",
    description: "Share study notes, bootcamp materials, and other educational resources.",
  },
];

export default function ServiceTypesStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-matepeak-primary/10 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-matepeak-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Service Types</h3>
          <p className="text-gray-600 text-sm">Select the types of services you'd like to offer</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <FormField
              key={service.name}
              control={form.control}
              name={service.name}
              render={({ field }) => (
              <FormItem className="group">
                <FormControl>
                  <div className={`flex items-start space-x-4 rounded-lg border-2 p-4 transition-all cursor-pointer ${
                    field.value 
                      ? 'border-matepeak-primary bg-matepeak-primary/5 shadow-md' 
                      : 'border-gray-200 hover:border-matepeak-primary/50 hover:shadow-sm'
                  }`}
                  onClick={() => field.onChange(!field.value)}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      field.value ? 'bg-matepeak-primary text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {field.value ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <FormLabel className="text-base font-semibold cursor-pointer">
                        {service.label}
                      </FormLabel>
                      <FormDescription className="mt-1 text-sm">
                        {service.description}
                      </FormDescription>
                    </div>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-1 pointer-events-none"
                      tabIndex={-1}
                    />
                  </div>
                </FormControl>
              </FormItem>
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
