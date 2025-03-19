import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Link2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormSectionProps } from "@/types/supabase";

interface Publication {
  id: number;
  title: string;
  date?: Date;
  url: string;
}

const PublicationsSection = ({ onComplete }: FormSectionProps) => {
  const [hasPublications, setHasPublications] = useState("yes");
  const [publications, setPublications] = useState<Publication[]>([{ id: 1, title: "", url: "" }]);

  const addPublication = () => {
    const newId = publications.length > 0 ? Math.max(...publications.map(p => p.id)) + 1 : 1;
    setPublications([...publications, { id: newId, title: "", url: "" }]);
  };

  const handlePublicationChange = (id: number, field: keyof Publication, value: any) => {
    setPublications(prevPublications => prevPublications.map(pub => 
      pub.id === id ? { ...pub, [field]: value } : pub
    ));
  };

  const handleNext = () => {
    onComplete({
      publications: hasPublications === "yes" ? publications : []
    });
  };

  const handlePrevious = () => {
    // This would navigate back to the previous section
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label>Do you have any publications? <span className="text-red-500">*</span></Label>
        <RadioGroup value={hasPublications} onValueChange={setHasPublications}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="publications-yes" />
            <Label htmlFor="publications-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="publications-no" />
            <Label htmlFor="publications-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {hasPublications === "yes" && (
        <>
          {publications.map((publication, index) => (
            <div key={publication.id} className="space-y-6">
              <h3 className="text-lg font-medium">Publication #{index + 1}</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`publication-title-${publication.id}`}>
                    Publication Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`publication-title-${publication.id}`}
                    placeholder="Enter publication title"
                    value={publication.title}
                    onChange={(e) => handlePublicationChange(publication.id, "title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Publication Date <span className="text-red-500">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !publication.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {publication.date ? format(publication.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={publication.date}
                        onSelect={(date) => handlePublicationChange(publication.id, "date", date)}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`publication-url-${publication.id}`}>Publication URL</Label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      id={`publication-url-${publication.id}`}
                      className="pl-10"
                      placeholder="https://example.com/publication"
                      value={publication.url}
                      onChange={(e) => handlePublicationChange(publication.id, "url", e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Enter a URL link to your publication (optional)</p>
                </div>
              </div>
            </div>
          ))}

          <Button 
            type="button" 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={addPublication}
          >
            <Plus size={16} />
            Add Another Publication
          </Button>
        </>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="outline" type="button" onClick={handlePrevious}>Previous: Professional Bodies</Button>
        <Button type="button" onClick={handleNext}>Next: Referees</Button>
      </div>
    </div>
  );
};

export default PublicationsSection;
