
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const departments = [
  "Administration",
  "Finance",
  "Human Resources", 
  "Information Technology",
  "Legal",
  "Marketing",
  "Operations",
  "Research and Policy",
  "Sales",
  "Supply Chain"
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];

const experienceLevels = [
  "Entry Level",
  "1+ years",
  "2+ years",
  "3+ years",
  "5+ years",
  "7+ years",
  "10+ years",
  "15+ years"
];

const educationLevels = [
  "High School",
  "Certificate",
  "Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Certification"
];

// Create schema for job form
const formSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  department: z.string({
    required_error: "Please select a department",
  }),
  location: z.string().min(2, { message: "Location is required" }),
  type: z.string({
    required_error: "Please select job type",
  }),
  experience: z.string({
    required_error: "Please select required experience",
  }),
  education: z.string({
    required_error: "Please select required education",
  }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  requirements: z.string().min(10, { message: "At least one requirement is needed" }),
  responsibilities: z.string().min(10, { message: "At least one responsibility is needed" }),
  salary_range: z.string().optional(),
  closing_date: z.date({
    required_error: "Please select a closing date",
  }),
  status: z.string().default("Open")
});

type FormValues = z.infer<typeof formSchema>;

interface JobFormProps {
  onSuccess?: () => void;
  initialValues?: Partial<FormValues & { 
    requirements: string[] | string, 
    responsibilities: string[] | string 
  }>;
  isEdit?: boolean;
  jobId?: number;
}

export default function JobForm({ onSuccess, initialValues, isEdit = false, jobId }: JobFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Convert array to string for form display if needed
  const requirementsString = Array.isArray(initialValues?.requirements) 
    ? initialValues?.requirements.join("\n") 
    : initialValues?.requirements || "";
    
  const responsibilitiesString = Array.isArray(initialValues?.responsibilities) 
    ? initialValues?.responsibilities.join("\n") 
    : initialValues?.responsibilities || "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues?.title || "",
      department: initialValues?.department || "",
      location: initialValues?.location || "",
      type: initialValues?.type || "",
      experience: initialValues?.experience || "",
      education: initialValues?.education || "",
      description: initialValues?.description || "",
      requirements: requirementsString,
      responsibilities: responsibilitiesString,
      salary_range: initialValues?.salary_range || "",
      closing_date: initialValues?.closing_date ? new Date(initialValues.closing_date) : undefined,
      status: initialValues?.status || "Open"
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Process string lists to array
      const requirementsArray = data.requirements
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");
        
      const responsibilitiesArray = data.responsibilities
        .split("\n")
        .map(item => item.trim())
        .filter(item => item !== "");

      const jobData = {
        title: data.title,
        department: data.department,
        location: data.location,
        type: data.type,
        experience: data.experience,
        education: data.education,
        description: data.description,
        requirements: requirementsArray,
        responsibilities: responsibilitiesArray,
        salary_range: data.salary_range,
        closing_date: data.closing_date.toISOString().split("T")[0],
        status: data.status
      };

      if (isEdit && jobId) {
        // Update existing job
        const { error } = await supabase
          .from("jobs")
          .update(jobData)
          .eq("id", jobId);
          
        if (error) throw error;
        
        toast({
          title: "Job Updated",
          description: "The job posting has been updated successfully."
        });
      } else {
        // Create new job
        const { error } = await supabase
          .from("jobs")
          .insert(jobData);
          
        if (error) throw error;
        
        toast({
          title: "Job Created",
          description: "The new job posting has been created successfully."
        });
      }
      
      // Reset form and notify parent component
      if (!isEdit) {
        form.reset();
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "There was an error submitting the job."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Senior Research Officer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Nairobi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Type</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Experience</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((exp) => (
                        <SelectItem key={exp} value={exp}>
                          {exp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Education</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((edu) => (
                        <SelectItem key={edu} value={edu}>
                          {edu}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="salary_range"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Range (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. KSh 80,000 - 120,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="closing_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Application Closing Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Provide a detailed description of the job..."
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements (One per line)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Bachelor's degree in relevant field
5+ years of experience in similar role
Strong communication skills
Proficiency in MS Office"
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsibilities (One per line)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Lead research projects from conception to completion
Prepare and present research findings
Mentor junior researchers
Collaborate with partner organizations"
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Update Job" : "Create Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
