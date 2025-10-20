
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Clock, PlusCircle, X, Calendar, HelpCircle, RefreshCw } from "lucide-react";
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
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const ampm = i < 12 ? "AM" : "PM";
  return `${hour}:00 ${ampm}`;
});

const TIMEZONES = [
  { value: "America/New_York", label: "EST (Eastern)" },
  { value: "America/Chicago", label: "CST (Central)" },
  { value: "America/Denver", label: "MST (Mountain)" },
  { value: "America/Los_Angeles", label: "PST (Pacific)" },
  { value: "Europe/London", label: "GMT (London)" },
  { value: "Europe/Paris", label: "CET (Paris)" },
  { value: "Asia/Dubai", label: "GST (Dubai)" },
  { value: "Asia/Kolkata", label: "IST (India)" },
  { value: "Asia/Shanghai", label: "CST (China)" },
  { value: "Asia/Tokyo", label: "JST (Japan)" },
  { value: "Australia/Sydney", label: "AEDT (Sydney)" },
];

const PRESET_TIMES = [
  { label: "Morning", from: "9:00 AM", to: "12:00 PM" },
  { label: "Afternoon", from: "2:00 PM", to: "5:00 PM" },
  { label: "Evening", from: "6:00 PM", to: "9:00 PM" },
];

interface TimeSlot {
  from: string;
  to: string;
  timezone: string;
}

interface DayAvailability {
  day: string;
  from: string;
  to: string;
  timezone: string;
}

export default function AvailabilityStep({ form }: { form: UseFormReturn<any> }) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [timeZone, setTimeZone] = useState("");
  const [repeatWeekly, setRepeatWeekly] = useState(true);
  
  // Get user's timezone
  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const matchedTz = TIMEZONES.find(t => t.value === tz);
    setTimeZone(matchedTz?.value || "Asia/Kolkata");
  }, []);
  
  // Update form value when availability changes
  useEffect(() => {
    const formattedAvailability = availability.map(slot => ({
      day: slot.day,
      from: convertTo24Hour(slot.from),
      to: convertTo24Hour(slot.to),
      timezone: slot.timezone
    }));
    form.setValue("availability", formattedAvailability);
  }, [availability, form]);
  
  
  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = modifier === 'AM' ? '00' : '12';
    } else {
      hours = modifier === 'PM' ? String(parseInt(hours, 10) + 12) : hours;
    }
    return `${hours.padStart(2, '0')}:${minutes || '00'}`;
  };

  const addPresetSlot = (day: string, preset: typeof PRESET_TIMES[0]) => {
    const newSlot: DayAvailability = {
      day,
      from: preset.from,
      to: preset.to,
      timezone: timeZone
    };
    setAvailability(prev => [...prev, newSlot]);
  };

  const addCustomSlot = (day: string) => {
    const newSlot: DayAvailability = {
      day,
      from: "9:00 AM",
      to: "5:00 PM",
      timezone: timeZone
    };
    setAvailability(prev => [...prev, newSlot]);
  };
  
  
  const removeSlot = (index: number) => {
    setAvailability(prev => prev.filter((_, i) => i !== index));
  };
  
  const updateSlot = (index: number, field: keyof DayAvailability, value: string) => {
    setAvailability(prev => 
      prev.map((slot, i) => 
        i === index ? { ...slot, [field]: value } : slot
      )
    );
  };

  const getAvailabilitySummary = (): string => {
    if (availability.length === 0) return "No availability set";
    
    // Group by day and time
    const grouped = availability.reduce((acc, slot) => {
      const key = `${slot.from}-${slot.to}-${slot.timezone}`;
      if (!acc[key]) {
        acc[key] = { days: [], from: slot.from, to: slot.to, timezone: slot.timezone };
      }
      acc[key].days.push(slot.day.substring(0, 3));
      return acc;
    }, {} as Record<string, { days: string[], from: string, to: string, timezone: string }>);

    const summaries = Object.values(grouped).map(group => {
      const dayList = group.days.join(', ');
      const tzAbbr = TIMEZONES.find(tz => tz.value === group.timezone)?.label.match(/\(([^)]+)\)/)?.[1] || group.timezone;
      return `${dayList} (${group.from} - ${group.to} ${tzAbbr})`;
    });

    return repeatWeekly 
      ? `Available every ${summaries.join('; ')}`
      : `Available on ${summaries.join('; ')}`;
  };
  
  return (
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

      {/* Timezone Selection */}
      <div className="space-y-2">
        <Label htmlFor="timezone" className="text-base font-semibold">Select Your Timezone</Label>
        <Select value={timeZone} onValueChange={setTimeZone}>
          <SelectTrigger id="timezone" className="w-full">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent className="bg-background z-50">
            {TIMEZONES.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Repeat Weekly Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-matepeak-primary" />
          <Label htmlFor="repeat-weekly" className="cursor-pointer">Repeat Weekly</Label>
        </div>
        <Switch 
          id="repeat-weekly"
          checked={repeatWeekly}
          onCheckedChange={setRepeatWeekly}
        />
      </div>
      
      <FormField
        control={form.control}
        name="availability"
        render={() => (
          <FormItem>
            <div className="flex items-center gap-2 mb-3">
              <FormLabel className="text-base font-semibold">Add Your Available Slots</FormLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-gray-400 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose preset times or create custom slots for each day</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {/* Day Selection with Preset Times */}
            <div className="space-y-4">
              {DAYS.map((day) => (
                <Collapsible key={day} className="border-2 border-gray-200 rounded-lg p-4 hover:border-matepeak-primary/50 transition-colors">
                  <CollapsibleTrigger className="flex items-center justify-between w-full group">
                    <span className="font-medium text-gray-900 group-hover:text-matepeak-primary transition-colors">
                      {day}
                      <span className="ml-2 text-xs text-gray-500">
                        ({availability.filter(a => a.day === day).length} slot{availability.filter(a => a.day === day).length !== 1 ? 's' : ''})
                      </span>
                    </span>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="pt-4 space-y-3">
                    {/* Preset Time Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      {PRESET_TIMES.map((preset) => (
                        <Button
                          key={preset.label}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addPresetSlot(day, preset)}
                          className="border-matepeak-primary/50 hover:bg-matepeak-primary hover:text-white"
                        >
                          {preset.label}
                        </Button>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addCustomSlot(day)}
                        className="border-gray-300"
                      >
                        Custom
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </FormItem>
        )}
      />
      
      {/* Current Slots Display */}
      {availability.length > 0 && (
        <div className="space-y-3 mt-6">
          <h4 className="font-semibold text-gray-900">Your Time Slots</h4>
          
          {availability.map((slot, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-4 w-4 text-matepeak-primary flex-shrink-0" />
              
              <span className="font-medium text-gray-700 min-w-[80px]">{slot.day}</span>
              
              <Select
                value={slot.from}
                onValueChange={(value) => updateSlot(index, 'from', value)}
              >
                <SelectTrigger className="w-[130px] border-gray-300">
                  <SelectValue placeholder="Start" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={`from-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <span className="text-gray-500 font-medium">to</span>
              
              <Select
                value={slot.to}
                onValueChange={(value) => updateSlot(index, 'to', value)}
              >
                <SelectTrigger className="w-[130px] border-gray-300">
                  <SelectValue placeholder="End" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {TIME_SLOTS.map((time) => (
                    <SelectItem key={`to-${time}`} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={slot.timezone}
                onValueChange={(value) => updateSlot(index, 'timezone', value)}
              >
                <SelectTrigger className="w-[140px] border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {TIMEZONES.map((tz) => (
                    <SelectItem key={tz.value} value={tz.value}>
                      {tz.label.match(/\(([^)]+)\)/)?.[1]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSlot(index)}
                className="hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Preview Summary */}
      {availability.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-matepeak-primary/5 to-matepeak-secondary/5 border-matepeak-primary/20">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-matepeak-primary mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Availability Summary</h4>
              <p className="text-sm text-gray-700">{getAvailabilitySummary()}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
