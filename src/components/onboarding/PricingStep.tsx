
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function PricingStep({ form }: { form: UseFormReturn<any> }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Session Pricing</h3>
      <p className="text-gray-600 mb-4">Set your pricing for mentoring sessions.</p>
      
      <FormField
        control={form.control}
        name="isPaid"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Paid Sessions</FormLabel>
              <FormDescription>
                Toggle on to offer paid sessions, off for free sessions.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      {form.watch("isPaid") && (
        <FormField
          control={form.control}
          name="pricePerSession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per session (INR)</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">₹</span>
                  <Input
                    type="number"
                    placeholder="1000"
                    className="pl-8"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
}
