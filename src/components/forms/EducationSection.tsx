import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Upload, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const educationLevelOptions = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate/PhD",
  "Professional Certification",
  "Vocational Training",
  "Other"
];

const EducationSection = () => {
  const [educations, setEducations] = useState([{ id: 1 }]);
  const [graduationDates, setGraduationDates] = useState<{ [key: number]: Date | undefined }>({});

  const addEducationEntry = () => {
    const newId = educations.length > 0 ? Math.max(...educations.map(e => e.id)) + 1 : 1;
    setEducations([...educations, { id: newId }]);
  };

  const removeEducationEntry = (idToRemove: number) => {
    if (educations.length <= 1) return;
    setEducations(educations.filter(edu => edu.id !== idToRemove));
    setGraduationDates(prev => {
      const newDates = { ...prev };
      delete newDates[idToRemove];
      return newDates;
    });
  };

  const handleGraduationDateChange = (date: Date | undefined, id: number) => {
    setGraduationDates(prev => ({
      ...prev,
      [id]: date
    }));
  };

  return (
    <div className="space-y-8">
      {educations.map((education, index) => (
        <div key={education.id} className="space-y-6 border-b pb-8 last:border-b-0">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Education Entry #{index + 1}</h2>
            {educations.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => removeEducationEntry(education.id)}
              >
                <Trash2 size={16} className="mr-2" />
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`education-level-${education.id}`}>Education Level <span className="text-red-500">*</span></Label>
              <Select>
                <SelectTrigger id={`education-level-${education.id}`}>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevelOptions.map((level) => (
                    <SelectItem key={`${education.id}-${level}`} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`institution-${education.id}`}>Institution <span className="text-red-500">*</span></Label>
              <Input 
                id={`institution-${education.id}`} 
                placeholder="University/College Name" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`field-of-study-${education.id}`}>Field of Study</Label>
              <Input 
                id={`field-of-study-${education.id}`} 
                placeholder="e.g., Computer Science" 
              />
            </div>

            <div className="space-y-2">
              <Label>Graduation Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !graduationDates[education.id] && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {graduationDates[education.id] 
                      ? format(graduationDates[education.id] as Date, "PPP") 
                      : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={graduationDates[education.id]}
                    onSelect={(date) => handleGraduationDateChange(date, education.id)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`certificate-${education.id}`}>Certificate</Label>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                type="button"
                onClick={() => document.getElementById(`certificate-upload-${education.id}`)?.click()}
              >
                <Upload size={16} />
                Upload Certificate
              </Button>
              <input
                id={`certificate-upload-${education.id}`}
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload your certificate for this education level (PDF, JPG, or PNG format)</p>
          </div>
        </div>
      ))}

      <Button 
        type="button" 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={addEducationEntry}
      >
        <Plus size={16} />
        Add Another Education Entry
      </Button>

      <div className="flex justify-between mt-6">
        <Button variant="outline" type="button">Previous: Personal</Button>
        <Button type="button">Next: Experience</Button>
      </div>
    </div>
  );
};

export default EducationSection;
