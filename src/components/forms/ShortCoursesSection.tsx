
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShortCourse {
  id: number;
  name: string;
  completionDate?: Date;
  certificate?: File;
}

const ShortCoursesSection = () => {
  const [courses, setCourses] = useState<ShortCourse[]>([{ id: 1, name: "" }]);

  const addCourse = () => {
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { id: newId, name: "" }]);
  };

  const handleCourseChange = (id: number, field: keyof ShortCourse, value: any) => {
    setCourses(prevCourses => prevCourses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  return (
    <div className="space-y-8">
      {courses.map((course, index) => (
        <div key={course.id} className="space-y-4">
          <h3 className="text-lg font-medium">Short Course #{index + 1}</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`course-name-${course.id}`}>Course Name <span className="text-red-500">*</span></Label>
              <Input 
                id={`course-name-${course.id}`}
                placeholder="e.g., Project Management Fundamentals"
                value={course.name}
                onChange={(e) => handleCourseChange(course.id, "name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Completion Date <span className="text-red-500">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !course.completionDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {course.completionDate ? format(course.completionDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={course.completionDate}
                    onSelect={(date) => handleCourseChange(course.id, "completionDate", date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`certificate-${course.id}`}>Certificate</Label>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2"
                type="button"
                onClick={() => document.getElementById(`certificate-upload-${course.id}`)?.click()}
              >
                <Upload size={16} />
                Upload Certificate
              </Button>
              <input
                id={`certificate-upload-${course.id}`}
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleCourseChange(course.id, "certificate", e.target.files[0]);
                  }
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Upload your certificate for this course (PDF, JPG, or PNG format)</p>
          </div>
        </div>
      ))}

      <Button 
        type="button" 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={addCourse}
      >
        <Plus size={16} />
        Add Another Short Course
      </Button>

      <div className="flex justify-between mt-6">
        <Button variant="outline" type="button">Previous: Experience</Button>
        <Button type="button">Next: Professional Bodies</Button>
      </div>
    </div>
  );
};

export default ShortCoursesSection;
