
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobType, FormSectionProps } from "@/types/supabase";

// Import form sections
import PersonalSection from "@/components/forms/PersonalSection";
import EducationSection from "@/components/forms/EducationSection";
import ExperienceSection from "@/components/forms/ExperienceSection";
import ShortCoursesSection from "@/components/forms/ShortCoursesSection";
import ProfessionalBodiesSection from "@/components/forms/ProfessionalBodiesSection";
import PublicationsSection from "@/components/forms/PublicationsSection";
import RefereesSection from "@/components/forms/RefereesSection";

const ApplicationForm = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Safely parse jobId to number
  const parsedJobId = jobId ? parseInt(jobId, 10) : 0;

  // Fetch job details
  const { data: job, isLoading: jobLoading, error: jobError } = useQuery({
    queryKey: ["job", parsedJobId],
    queryFn: async () => {
      if (!parsedJobId) return null;
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", parsedJobId)
        .single();

      if (error) throw error;
      return data as JobType;
    }
  });

  const handleTabComplete = (sectionData: any) => {
    // Update form data with the completed section
    setFormData(prev => ({ ...prev, ...sectionData }));

    // Move to next tab based on current tab
    switch (activeTab) {
      case "personal":
        setActiveTab("education");
        break;
      case "education":
        setActiveTab("experience");
        break;
      case "experience":
        setActiveTab("shortCourses");
        break;
      case "shortCourses":
        setActiveTab("professionalBodies");
        break;
      case "professionalBodies":
        setActiveTab("publications");
        break;
      case "publications":
        setActiveTab("referees");
        break;
      case "referees":
        handleSubmitApplication();
        break;
      default:
        break;
    }
  };

  const handleSubmitApplication = async () => {
    if (!parsedJobId) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit application to Supabase
      const { data, error } = await supabase
        .from("applications")
        .insert({
          job_id: parsedJobId,
          applicant_data: formData,
          status: "Pending"
        });

      if (error) throw error;

      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted. Thank you!",
      });

      // Redirect to the job listing page
      navigate("/jobs");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "There was an error submitting your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (jobLoading) {
    return <div className="container py-8 mx-auto">Loading job details...</div>;
  }

  if (jobError || !job) {
    return (
      <div className="container py-8 mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-red-500">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Unable to load job details. Please try again later.</p>
            <Button 
              className="mt-4" 
              onClick={() => navigate("/jobs")}
            >
              Back to Job Listings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Application Form - {job.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="shortCourses">Short Courses</TabsTrigger>
              <TabsTrigger value="professionalBodies">Professional Bodies</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="referees">Referees</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <PersonalSection onComplete={handleTabComplete} />
            </TabsContent>
            
            <TabsContent value="education">
              <EducationSection onComplete={handleTabComplete} />
            </TabsContent>
            
            <TabsContent value="experience">
              <ExperienceSection onComplete={handleTabComplete} />
            </TabsContent>
            
            <TabsContent value="shortCourses">
              <ShortCoursesSection onComplete={handleTabComplete} />
            </TabsContent>
            
            <TabsContent value="professionalBodies">
              <ProfessionalBodiesSection onComplete={handleTabComplete} />
            </TabsContent>
            
            <TabsContent value="publications">
              <PublicationsSection onComplete={handleTabComplete} />
            </TabsContent>
            
            <TabsContent value="referees">
              <RefereesSection onComplete={handleTabComplete} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;
