
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { JobType, ApplicationType } from "@/types/supabase";
import { FormSectionProps } from "@/components/forms/IFormSections";

// Import components directly
import PersonalSection from "@/components/forms/PersonalSection";
import EducationSection from "@/components/forms/EducationSection";
import ExperienceSection from "@/components/forms/ExperienceSection";
import ShortCoursesSection from "@/components/forms/ShortCoursesSection";
import ProfessionalBodiesSection from "@/components/forms/ProfessionalBodiesSection";
import PublicationsSection from "@/components/forms/PublicationsSection";
import RefereesSection from "@/components/forms/RefereesSection";

// Import sample job data as fallback
import { initialJobListings } from "@/data/SampleJobs";

const ApplicationForm = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: job, isLoading } = useQuery({
    queryKey: ['job', jobId],
    queryFn: async (): Promise<JobType> => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();
          
        if (error) {
          // If there's an error, use sample data as fallback
          const fallbackJob = initialJobListings.find(j => j.id === Number(jobId));
          if (!fallbackJob) {
            throw new Error("Job not found");
          }
          return fallbackJob as unknown as JobType;
        }
        
        return data;
      } catch (error) {
        console.error("Error fetching job:", error);
        const fallbackJob = initialJobListings.find(j => j.id === Number(jobId));
        if (!fallbackJob) {
          throw new Error("Job not found");
        }
        return fallbackJob as unknown as JobType;
      }
    }
  });

  const [activeTab, setActiveTab] = useState("personal");
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);
  const [applicantData, setApplicantData] = useState({
    personal: {},
    education: {},
    experience: {},
    shortCourses: {},
    professionalBodies: {},
    publications: {},
    referees: {}
  });

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
  const handleSectionComplete = (tabId: string, data: any) => {
    setApplicantData(prev => ({
      ...prev,
      [tabId]: data
    }));
    markTabAsCompleted(tabId);
    goToNextTab();
  };

  // Handle final submission
  const handleSubmit = async () => {
    try {
      // Insert application data into Supabase
      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: Number(jobId),
          status: 'Pending',
          applicant_data: applicantData
        });

      if (error) throw error;
      
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
      
      // Redirect to the jobs page after submission
      navigate("/jobs");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error submitting application",
        description: error.message || "There was an error submitting your application. Please try again.",
      });
    }
  };

  // If job is not found
  if (isLoading) {
    return <div className="container py-8">Loading job details...</div>;
  }

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
          <PersonalSection onComplete={(data) => handleSectionComplete("personal", data)} />
        </TabsContent>

        <TabsContent value="education">
          <EducationSection onComplete={(data) => handleSectionComplete("education", data)} />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceSection onComplete={(data) => handleSectionComplete("experience", data)} />
        </TabsContent>

        <TabsContent value="shortCourses">
          <ShortCoursesSection onComplete={(data) => handleSectionComplete("shortCourses", data)} />
        </TabsContent>

        <TabsContent value="professionalBodies">
          <ProfessionalBodiesSection onComplete={(data) => handleSectionComplete("professionalBodies", data)} />
        </TabsContent>

        <TabsContent value="publications">
          <PublicationsSection onComplete={(data) => handleSectionComplete("publications", data)} />
        </TabsContent>

        <TabsContent value="referees">
          <RefereesSection onComplete={(data) => handleSectionComplete("referees", data)} />
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
