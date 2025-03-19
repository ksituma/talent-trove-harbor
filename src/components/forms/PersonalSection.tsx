import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormSectionProps } from "@/types/supabase";

const ethnicityOptions = [
  "Asian/Asian British",
  "Black/African/Caribbean/Black British",
  "Mixed/Multiple ethnic groups",
  "White",
  "Other ethnic group",
  "Prefer not to say",
];

const countryOptions = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Ireland",
  "New Zealand",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Other",
];

const disabilityTypeOptions = [
  "Visual Impairment",
  "Hearing Impairment",
  "Physical Disability",
  "Cognitive Disability",
  "Speech Disability",
  "Other"
];

const PersonalSection = ({ onComplete }: FormSectionProps) => {
  const [date, setDate] = useState<Date>();
  const [hasDisability, setHasDisability] = useState<string>("no");

  const handleNext = () => {
    onComplete({
      personal: {
        firstName: document.getElementById("firstName") ? (document.getElementById("firstName") as HTMLInputElement).value : "",
        lastName: document.getElementById("lastName") ? (document.getElementById("lastName") as HTMLInputElement).value : "",
        dob: date
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
          <Input id="firstName" placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="middleName">Middle Name</Label>
          <Input id="middleName" placeholder="David" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
          <Input id="lastName" placeholder="Doe" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Physical Address <span className="text-red-500">*</span></Label>
        <Input id="address" placeholder="123 Main St, City, Country" />
      </div>

      <div className="space-y-2">
        <Label>Gender <span className="text-red-500">*</span></Label>
        <RadioGroup defaultValue="male">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
          <Input id="email" type="email" placeholder="john.doe@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
          <Input id="phone" placeholder="+254 123 456 789" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Date of Birth <span className="text-red-500">*</span></Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>Ethnicity <span className="text-red-500">*</span></Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select your ethnicity" />
            </SelectTrigger>
            <SelectContent>
              {ethnicityOptions.map((ethnicity) => (
                <SelectItem key={ethnicity} value={ethnicity}>
                  {ethnicity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Home County <span className="text-red-500">*</span></Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select your home county" />
          </SelectTrigger>
          <SelectContent>
            {countryOptions.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Are you living with a disability? <span className="text-red-500">*</span></Label>
        <RadioGroup 
          value={hasDisability} 
          onValueChange={setHasDisability}
          defaultValue="no"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="disability-yes" />
            <Label htmlFor="disability-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="disability-no" />
            <Label htmlFor="disability-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {hasDisability === "yes" && (
        <div className="space-y-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <div className="space-y-2">
            <Label htmlFor="disability-type">Nature of Disability <span className="text-red-500">*</span></Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select disability type" />
              </SelectTrigger>
              <SelectContent>
                {disabilityTypeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="disability-certificate">Disability Certificate <span className="text-red-500">*</span></Label>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                type="button"
                onClick={() => document.getElementById('disability-certificate-upload')?.click()}
              >
                <Upload size={16} />
                Upload Certificate
              </Button>
              <input
                id="disability-certificate-upload"
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, JPG, PNG (Max: 5MB)</p>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button type="button" onClick={handleNext}>Next: Education</Button>
      </div>
    </div>
  );
};

export default PersonalSection;
