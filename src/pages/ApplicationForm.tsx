import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInMonths } from "date-fns";
import { CalendarIcon, Plus, Upload, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const ApplicationForm = () => {
  const [date, setDate] = useState<Date>();
  const [hasDisability, setHasDisability] = useState<string>("no");
  const [educations, setEducations] = useState([{ id: 1 }]);
  const [graduationDates, setGraduationDates] = useState<{ [key: number]: Date | undefined }>({});
  
  const [experiences, setExperiences] = useState([{ id: 1 }]);
  const [startDates, setStartDates] = useState<{ [key: number]: Date | undefined }>({});
  const [endDates, setEndDates] = useState<{ [key: number]: Date | undefined }>({});
  const [totalExperience, setTotalExperience] = useState({ years: 0, months: 0 });

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

  const jobGroupOptions = [
    "Group A",
    "Group B", 
    "Group C",
    "Group D",
    "Group E",
    "Other"
  ];

  const addEducationEntry = () => {
    const newId = educations.length > 0 ? Math.max(...educations.map(e => e.id)) + 1 : 1;
    setEducations([...educations, { id: newId }]);
  };

  const handleGraduationDateChange = (date: Date | undefined, id: number) => {
    setGraduationDates(prev => ({
      ...prev,
      [id]: date
    }));
  };

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
    <div className="container py-8 mx-auto max-w-5xl">
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold mb-2">Job Application Form</h1>
        <p className="text-gray-500 mb-6">
          Please fill out all required fields to submit your application.
        </p>

        <Tabs defaultValue="personal">
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="courses">Short Courses</TabsTrigger>
            <TabsTrigger value="bodies">Professional Bodies</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="referees">Referees</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="education" className="space-y-8">
            {educations.map((education, index) => (
              <div key={education.id} className="space-y-6 border-b pb-8 last:border-b-0">
                <h2 className="text-lg font-semibold">Education Entry #{index + 1}</h2>
                
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
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="courses">
            <ShortCoursesSection />
          </TabsContent>

          <TabsContent value="bodies">
            <ProfessionalBodiesSection />
          </TabsContent>

          <TabsContent value="publications">
            <PublicationsSection />
          </TabsContent>

          <TabsContent value="referees">
            <RefereesSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicationForm;
