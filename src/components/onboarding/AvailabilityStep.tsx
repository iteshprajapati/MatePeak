
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Clock, PlusCircle, X, Calendar, HelpCircle } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <TooltipProvider>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-matepeak-primary/10 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-matepeak-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Availability</h3>
            <p className="text-gray-600 text-sm">Set your weekly availability for mentoring sessions</p>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Your detected timezone: <span className="font-semibold">{timeZone}</span>
          </p>
        </div>
        
        <FormField
          control={form.control}
          name="availability"
          render={() => (
            <FormItem>
              <div className="flex items-center gap-2 mb-3">
                <FormLabel className="text-base font-semibold">Select Days You're Available</FormLabel>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Choose the days when you can offer mentoring sessions</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <ToggleGroup 
                type="multiple" 
                className="justify-start flex-wrap gap-2"
                value={selectedDays}
                onValueChange={handleDayToggle}
              >
                {DAYS.map((day) => (
                  <ToggleGroupItem 
                    key={day} 
                    value={day} 
                    aria-label={day} 
                    className="data-[state=on]:bg-matepeak-primary data-[state=on]:text-white hover:bg-matepeak-primary/10 transition-all"
                  >
                    {day.substring(0, 3)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FormItem>
          )}
        />
        
        {availability.length > 0 && (
          <div className="space-y-3 mt-6 animate-fade-in">
            <h4 className="font-semibold text-gray-900">Set Time Slots</h4>
            
            {availability.map((dayAvail) => (
              <Collapsible key={dayAvail.day} className="border-2 border-gray-200 rounded-lg p-4 hover:border-matepeak-primary/50 transition-colors">
                <CollapsibleTrigger className="flex items-center justify-between w-full group">
                  <span className="font-medium text-gray-900 group-hover:text-matepeak-primary transition-colors">
                    {dayAvail.day}
                    <span className="ml-2 text-xs text-gray-500">
                      ({(dayAvail.slots || []).length} slot{(dayAvail.slots || []).length !== 1 ? 's' : ''})
                    </span>
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 hover:bg-matepeak-primary/10"
                    type="button"
                  >
                    <PlusCircle className="h-4 w-4 text-matepeak-primary" />
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="pt-4 space-y-3">
                  {(dayAvail.slots || []).map((slot, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-4 w-4 text-matepeak-primary flex-shrink-0" />
                      <Select
                        value={slot.start}
                        onValueChange={(value) => updateTimeSlot(dayAvail.day, index, 'start', value)}
                      >
                        <SelectTrigger className="w-[130px] border-gray-300">
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
                      
                      <span className="text-gray-500 font-medium">to</span>
                      
                      <Select
                        value={slot.end}
                        onValueChange={(value) => updateTimeSlot(dayAvail.day, index, 'end', value)}
                      >
                        <SelectTrigger className="w-[130px] border-gray-300">
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
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 w-full border-matepeak-primary text-matepeak-primary hover:bg-matepeak-primary hover:text-white"
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
    </TooltipProvider>
  );
}
