import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormSectionProps } from "@/types/supabase";

interface ProfessionalBody {
  id: number;
  name: string;
  membershipDate?: Date;
  certificate?: File;
}

const professionalBodies = [
  "Kenya Medical Practitioners and Dentists Council",
  "Engineering Board of Kenya",
  "Law Society of Kenya",
  "Institute of Certified Public Accountants of Kenya",
  "Pharmacy and Poisons Board",
  "Other"
];

const ProfessionalBodiesSection = ({ onComplete }: FormSectionProps) => {
  const [isMember, setIsMember] = useState("yes");
  const [bodies, setBodies] = useState<ProfessionalBody[]>([{ id: 1, name: "" }]);

  const addBody = () => {
    const newId = bodies.length > 0 ? Math.max(...bodies.map(b => b.id)) + 1 : 1;
    setBodies([...bodies, { id: newId, name: "" }]);
  };

  const handleBodyChange = (id: number, field: keyof ProfessionalBody, value: any) => {
    setBodies(prevBodies => prevBodies.map(body => 
      body.id === id ? { ...body, [field]: value } : body
    ));
  };

  const handleNext = () => {
    onComplete({
      professionalBodies: isMember === "yes" ? bodies : []
    });
  };

  const handlePrevious = () => {
    // This would navigate back to the previous section
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label>Are you a member of any professional body? <span className="text-red-500">*</span></Label>
        <RadioGroup value={isMember} onValueChange={setIsMember}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="member-yes" />
            <Label htmlFor="member-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="member-no" />
            <Label htmlFor="member-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {isMember === "yes" && (
        <>
          {bodies.map((body, index) => (
            <div key={body.id} className="space-y-6">
              <h3 className="text-lg font-medium">Professional Body #{index + 1}</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Professional Body <span className="text-red-500">*</span></Label>
                  <Select 
                    onValueChange={(value) => handleBodyChange(body.id, "name", value)}
                    value={body.name}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select professional body" />
                    </SelectTrigger>
                    <SelectContent>
                      {professionalBodies.map((name) => (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Membership Date <span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !body.membershipDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {body.membershipDate ? format(body.membershipDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={body.membershipDate}
                        onSelect={(date) => handleBodyChange(body.id, "membershipDate", date)}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Membership Certificate</Label>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center justify-center gap-2"
                      type="button"
                      onClick={() => document.getElementById(`membership-certificate-${body.id}`)?.click()}
                    >
                      <Upload size={16} />
                      Upload Certificate
                    </Button>
                    <input
                      id={`membership-certificate-${body.id}`}
                      type="file"
                      accept="application/pdf,image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleBodyChange(body.id, "certificate", e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Upload your membership certificate (PDF, JPG, or PNG format)</p>
                </div>
              </div>
            </div>
          ))}

          <Button 
            type="button" 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={addBody}
          >
            <Plus size={16} />
            Add Another Professional Body
          </Button>
        </>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="outline" type="button" onClick={handlePrevious}>Previous: Short Courses</Button>
        <Button type="button" onClick={handleNext}>Next: Publications</Button>
      </div>
    </div>
  );
};

export default ProfessionalBodiesSection;
