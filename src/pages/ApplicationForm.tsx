
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { initialJobListings } from "@/data/SampleJobs";
import { useAuth } from "@/contexts/AuthContext";
import { PersonalSection } from "@/components/forms/PersonalSection";
import { EducationSection } from "@/components/forms/EducationSection";
import { ExperienceSection } from "@/components/forms/ExperienceSection";
import { ShortCoursesSection } from "@/components/forms/ShortCoursesSection";
import { ProfessionalBodiesSection } from "@/components/forms/ProfessionalBodiesSection";
import { PublicationsSection } from "@/components/forms/PublicationsSection";
import { RefereesSection } from "@/components/forms/RefereesSection";
import { supabase } from "@/integrations/supabase/client";

const ApplicationForm = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Find the job from our sample data
  const job = initialJobListings.find(j => j.id.toString() === jobId);

  const [activeTab, setActiveTab] = useState("personal");
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);

  // Check if a tab is completed
  const isTabCompleted = (tabId: string) => completedTabs.includes(tabId);

  // Mark a tab as completed
  const markTabAsCompleted = (tabId: string) => {
    if (!completedTabs.includes(tabId)) {
      setCompletedTabs([...completedTabs, tabId]);
    }
  };

  // Navigate to the next tab
  const goToNextTab = () => {
    const tabs = ["personal", "education", "experience", "shortCourses", "professionalBodies", "publications", "referees", "review"];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  // Handle when a section is completed
  const handleSectionComplete = (tabId: string) => {
    markTabAsCompleted(tabId);
    goToNextTab();
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      // In a real implementation, we would submit the application to Supabase
      // For now, we'll just simulate a successful submission
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
      
      // Redirect to the jobs page after submission
      navigate("/jobs");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error submitting application",
        description: "There was an error submitting your application. Please try again.",
      });
    }
  };

  // If job is not found
  if (!job) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p>The job you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/jobs")} className="mt-4">Back to Jobs</Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Application for: {job.title}</CardTitle>
          <CardDescription>
            Complete all sections of this application form. Your progress will be saved automatically.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:grid-cols-8 mb-6">
          <TabsTrigger value="personal" className={isTabCompleted("personal") ? "bg-green-100" : ""}>
            Personal
          </TabsTrigger>
          <TabsTrigger value="education" className={isTabCompleted("education") ? "bg-green-100" : ""}>
            Education
          </TabsTrigger>
          <TabsTrigger value="experience" className={isTabCompleted("experience") ? "bg-green-100" : ""}>
            Experience
          </TabsTrigger>
          <TabsTrigger value="shortCourses" className={isTabCompleted("shortCourses") ? "bg-green-100" : ""}>
            Courses
          </TabsTrigger>
          <TabsTrigger value="professionalBodies" className={isTabCompleted("professionalBodies") ? "bg-green-100" : ""}>
            Professional
          </TabsTrigger>
          <TabsTrigger value="publications" className={isTabCompleted("publications") ? "bg-green-100" : ""}>
            Publications
          </TabsTrigger>
          <TabsTrigger value="referees" className={isTabCompleted("referees") ? "bg-green-100" : ""}>
            Referees
          </TabsTrigger>
          <TabsTrigger value="review" className={isTabCompleted("review") ? "bg-green-100" : ""}>
            Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <PersonalSection onComplete={() => handleSectionComplete("personal")} />
        </TabsContent>

        <TabsContent value="education">
          <EducationSection onComplete={() => handleSectionComplete("education")} />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceSection onComplete={() => handleSectionComplete("experience")} />
        </TabsContent>

        <TabsContent value="shortCourses">
          <ShortCoursesSection onComplete={() => handleSectionComplete("shortCourses")} />
        </TabsContent>

        <TabsContent value="professionalBodies">
          <ProfessionalBodiesSection onComplete={() => handleSectionComplete("professionalBodies")} />
        </TabsContent>

        <TabsContent value="publications">
          <PublicationsSection onComplete={() => handleSectionComplete("publications")} />
        </TabsContent>

        <TabsContent value="referees">
          <RefereesSection onComplete={() => handleSectionComplete("referees")} />
        </TabsContent>

        <TabsContent value="review">
          <Card>
            <CardHeader>
              <CardTitle>Review Your Application</CardTitle>
              <CardDescription>
                Please review all information before submitting your application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                By submitting this application, you confirm that all information provided is accurate and complete.
              </p>
              <Button onClick={handleSubmit}>Submit Application</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationForm;
