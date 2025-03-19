import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormSectionProps } from "@/types/supabase";

interface Referee {
  id: number;
  name: string;
  designation: string;
  organization: string;
  mobile: string;
  email: string;
}

const RefereesSection = ({ onComplete }: FormSectionProps) => {
  const [referees, setReferees] = useState<Referee[]>([{ 
    id: 1, 
    name: "", 
    designation: "",
    organization: "",
    mobile: "",
    email: ""
  }]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const addReferee = () => {
    const newId = referees.length > 0 ? Math.max(...referees.map(r => r.id)) + 1 : 1;
    setReferees([...referees, { 
      id: newId, 
      name: "", 
      designation: "",
      organization: "",
      mobile: "",
      email: ""
    }]);
  };

  const handleRefereeChange = (id: number, field: keyof Referee, value: string) => {
    setReferees(prevReferees => prevReferees.map(referee => 
      referee.id === id ? { ...referee, [field]: value } : referee
    ));
  };

  const handleSubmit = () => {
    if (!agreedToTerms) return;
    
    onComplete({
      referees: referees
    });
  };

  const handlePrevious = () => {
    // This would navigate back to the previous section
  };

  return (
    <div className="space-y-8">
      {referees.map((referee, index) => (
        <div key={referee.id} className="space-y-6">
          <h3 className="text-lg font-medium">Referee #{index + 1}</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`referee-name-${referee.id}`}>
                Name of Referee <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`referee-name-${referee.id}`}
                placeholder="Full name"
                value={referee.name}
                onChange={(e) => handleRefereeChange(referee.id, "name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`referee-designation-${referee.id}`}>
                Designation of Referee <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`referee-designation-${referee.id}`}
                placeholder="e.g., Manager, Professor"
                value={referee.designation}
                onChange={(e) => handleRefereeChange(referee.id, "designation", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`referee-organization-${referee.id}`}>
              Organization of Referee <span className="text-red-500">*</span>
            </Label>
            <Input
              id={`referee-organization-${referee.id}`}
              placeholder="Company/Institution name"
              value={referee.organization}
              onChange={(e) => handleRefereeChange(referee.id, "organization", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor={`referee-mobile-${referee.id}`}>
                Mobile Contact of Referee <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`referee-mobile-${referee.id}`}
                placeholder="+254 123 456 789"
                value={referee.mobile}
                onChange={(e) => handleRefereeChange(referee.id, "mobile", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`referee-email-${referee.id}`}>
                Email of Referee <span className="text-red-500">*</span>
              </Label>
              <Input
                id={`referee-email-${referee.id}`}
                type="email"
                placeholder="referee@example.com"
                value={referee.email}
                onChange={(e) => handleRefereeChange(referee.id, "email", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <Button 
        type="button" 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={addReferee}
      >
        <Plus size={16} />
        Add Another Referee
      </Button>

      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm text-gray-600">
            I confirm that all information provided in this application is true and accurate to the best of my knowledge. 
            I understand that any false statement may result in the rejection of my application or termination of employment.
          </Label>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" type="button" onClick={handlePrevious}>Previous: Publications</Button>
        <Button type="submit" disabled={!agreedToTerms} onClick={handleSubmit}>Submit Application</Button>
      </div>
    </div>
  );
};

export default RefereesSection;
