
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Clock, PlusCircle, X } from "lucide-react";
import {
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${hour}:00 ${ampm}`;
});

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  day: string;
  slots: TimeSlot[];
}

export default function AvailabilityStep({ form }: { form: UseFormReturn<any> }) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [timeZone, setTimeZone] = useState("");
  
  // Get user's timezone
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZone(tz);
  }, []);
  
  // Update form value when availability changes
  useEffect(() => {
    form.setValue("availability", availability);
  }, [availability, form]);
  
  const handleDayToggle = (value: string[]) => {
    setSelectedDays(value);
    
    // Add new days to availability
    const newDays = value.filter(day => !availability.find(a => a.day === day));
    if (newDays.length > 0) {
      setAvailability([
        ...availability,
        ...newDays.map(day => ({ day, slots: [] })),
      ]);
    }
    
    // Remove days from availability
    const daysToKeep = value;
    setAvailability(availability.filter(a => daysToKeep.includes(a.day)));
  };
  
  const addTimeSlot = (day: string) => {
    setAvailability(prev => 
      prev.map(a => 
        a.day === day 
          ? { 
              ...a, 
              slots: [...(a.slots || []), { start: "9:00 AM", end: "5:00 PM" }] 
            } 
          : a
      )
    );
  };
  
  const removeTimeSlot = (day: string, index: number) => {
    setAvailability(prev => 
      prev.map(a => 
        a.day === day 
          ? { 
              ...a, 
              slots: a.slots.filter((_, i) => i !== index) 
            } 
          : a
      )
    );
  };
  
  const updateTimeSlot = (day: string, index: number, field: 'start' | 'end', value: string) => {
    setAvailability(prev => 
      prev.map(a => 
        a.day === day 
          ? { 
              ...a, 
              slots: a.slots.map((slot, i) => 
                i === index 
                  ? { ...slot, [field]: value } 
                  : slot
              ) 
            } 
          : a
      )
    );
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Availability</h3>
      <p className="text-gray-600 mb-4">
        Set your weekly availability for mentoring sessions.
        <span className="block mt-1 text-sm">Your detected timezone: {timeZone}</span>
      </p>
      
      <FormField
        control={form.control}
        name="availability"
        render={() => (
          <FormItem>
            <FormLabel>Select Days You're Available</FormLabel>
            <ToggleGroup 
              type="multiple" 
              className="justify-start flex-wrap"
              value={selectedDays}
              onValueChange={handleDayToggle}
            >
              {DAYS.map((day) => (
                <ToggleGroupItem key={day} value={day} aria-label={day} className="my-1">
                  {day.substring(0, 3)}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </FormItem>
        )}
      />
      
      {availability.length > 0 && (
        <div className="space-y-4 mt-6">
          <h4 className="font-medium">Set Time Slots</h4>
          
          {availability.map((dayAvail) => (
            <Collapsible key={dayAvail.day} className="border rounded-md p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <span className="font-medium">{dayAvail.day}</span>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="pt-4 space-y-3">
                {(dayAvail.slots || []).map((slot, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <Select
                      value={slot.start}
                      onValueChange={(value) => updateTimeSlot(dayAvail.day, index, 'start', value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Start" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={`start-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <span>to</span>
                    
                    <Select
                      value={slot.end}
                      onValueChange={(value) => updateTimeSlot(dayAvail.day, index, 'end', value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_SLOTS.map((time) => (
                          <SelectItem key={`end-${time}`} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTimeSlot(dayAvail.day, index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => addTimeSlot(dayAvail.day)}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Time Slot
                </Button>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
}
