
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInMonths } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const jobGroupOptions = [
  "Group A",
  "Group B", 
  "Group C",
  "Group D",
  "Group E",
  "Other"
];

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([{ id: 1 }]);
  const [startDates, setStartDates] = useState<{ [key: number]: Date | undefined }>({});
  const [endDates, setEndDates] = useState<{ [key: number]: Date | undefined }>({});
  const [totalExperience, setTotalExperience] = useState({ years: 0, months: 0 });

  const addExperienceEntry = () => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1;
    setExperiences([...experiences, { id: newId }]);
  };

  const removeExperienceEntry = (idToRemove: number) => {
    if (experiences.length <= 1) {
      return;
    }
    
    setExperiences(experiences.filter(exp => exp.id !== idToRemove));
    
    setStartDates(prev => {
      const newDates = { ...prev };
      delete newDates[idToRemove];
      return newDates;
    });
    
    setEndDates(prev => {
      const newDates = { ...prev };
      delete newDates[idToRemove];
      return newDates;
    });
  };

  const handleStartDateChange = (date: Date | undefined, id: number) => {
    setStartDates(prev => ({
      ...prev,
      [id]: date
    }));
  };

  const handleEndDateChange = (date: Date | undefined, id: number) => {
    setEndDates(prev => ({
      ...prev,
      [id]: date
    }));
  };

  useEffect(() => {
    let totalMonths = 0;
    
    experiences.forEach(exp => {
      const start = startDates[exp.id];
      const end = endDates[exp.id] || new Date();
      
      if (start) {
        totalMonths += differenceInMonths(end, start);
      }
    });
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    setTotalExperience({ years, months });
  }, [experiences, startDates, endDates]);

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <div key={experience.id} className="space-y-6 border-b pb-8 last:border-b-0">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Work Experience #{index + 1}</h2>
            {experiences.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => removeExperienceEntry(experience.id)}
              >
                <Trash2 size={16} className="mr-2" />
                Remove
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`organization-${experience.id}`}>Organization <span className="text-red-500">*</span></Label>
              <Input 
                id={`organization-${experience.id}`} 
                placeholder="Company Name" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`designation-${experience.id}`}>Designation <span className="text-red-500">*</span></Label>
              <Input 
                id={`designation-${experience.id}`} 
                placeholder="Your Position" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`job-group-${experience.id}`}>Job Group <span className="text-red-500">*</span></Label>
              <Input 
                id={`job-group-${experience.id}`} 
                placeholder="e.g., A, B, C, D" 
              />
            </div>

            <div className="space-y-2">
              <Label>Start Date <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDates[experience.id] && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDates[experience.id] 
                      ? format(startDates[experience.id] as Date, "PPP") 
                      : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDates[experience.id]}
                    onSelect={(date) => handleStartDateChange(date, experience.id)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDates[experience.id] && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDates[experience.id] 
                    ? format(endDates[experience.id] as Date, "PPP") 
                    : <span>Pick a date or leave blank if current job</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDates[experience.id]}
                  onSelect={(date) => handleEndDateChange(date, experience.id)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
      
      <Button 
        type="button" 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={addExperienceEntry}
      >
        <Plus size={16} />
        Add Another Experience Entry
      </Button>

      <div className="p-4 bg-gray-50 rounded-md mt-4">
        <p className="text-lg font-medium">
          Total Work Experience: {totalExperience.years} years {totalExperience.months} months
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" type="button">Previous: Education</Button>
        <Button type="button">Next: Short Courses</Button>
      </div>
    </div>
  );
};

export default ExperienceSection;
