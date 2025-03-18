
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import PersonalSection from "@/components/forms/PersonalSection";
import EducationSection from "@/components/forms/EducationSection";
import ExperienceSection from "@/components/forms/ExperienceSection";
import ShortCoursesSection from "@/components/forms/ShortCoursesSection";
import ProfessionalBodiesSection from "@/components/forms/ProfessionalBodiesSection";
import PublicationsSection from "@/components/forms/PublicationsSection";
import RefereesSection from "@/components/forms/RefereesSection";
import { initialJobListings } from "@/data/SampleJobs";

const ApplicationForm = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState(null);
  const [activeTab, setActiveTab] = useState("personal");
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Make sure jobId is provided and user is authenticated
    if (!jobId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No job specified. Please select a job to apply for.",
      });
      navigate("/jobs");
      return;
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please sign in to apply for jobs.",
      });
      navigate("/auth");
      return;
    }

    // Find the job from our sample data
    // In a real implementation, we would fetch this from Supabase
    const selectedJob = initialJobListings.find(j => j.id === Number(jobId));
    if (!selectedJob) {
      toast({
        variant: "destructive",
        title: "Job not found",
        description: "The job you're trying to apply for doesn't exist.",
      });
      navigate("/jobs");
      return;
    }

    // In a real implementation, we would check if the user has already applied
    // For this job, and redirect if they have
    // const checkApplication = async () => {
    //   const { data, error } = await supabase
    //     .from('applications')
    //     .select('*')
    //     .eq('user_id', user.id)
    //     .eq('job_id', jobId)
    //     .single();
    //     
    //   if (data) {
    //     toast({
    //       variant: "destructive",
    //       title: "Already applied",
    //       description: "You have already applied for this position.",
    //     });
    //     navigate('/jobs');
    //   }
    // };
    // 
    // checkApplication();

    setJob(selectedJob);
  }, [jobId, user, navigate, toast]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const navigateToNextTab = () => {
    const tabs = ["personal", "education", "experience", "courses", "bodies", "publications", "referees"];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  if (!job) {
    return <div className="container py-8 mx-auto max-w-5xl">Loading application form...</div>;
  }

  return (
    <div className="container py-8 mx-auto max-w-5xl">
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Job Application Form</h1>
          <p className="text-gray-500">
            You are applying for: <span className="font-medium text-gray-700">{job.title}</span>
          </p>
          <p className="text-gray-500 mt-1">
            Please fill out all required fields to submit your application.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="courses">Short Courses</TabsTrigger>
            <TabsTrigger value="bodies">Professional Bodies</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="referees">Referees</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalSection onComplete={navigateToNextTab} />
          </TabsContent>

          <TabsContent value="education">
            <EducationSection onComplete={navigateToNextTab} />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceSection onComplete={navigateToNextTab} />
          </TabsContent>

          <TabsContent value="courses">
            <ShortCoursesSection onComplete={navigateToNextTab} />
          </TabsContent>

          <TabsContent value="bodies">
            <ProfessionalBodiesSection onComplete={navigateToNextTab} />
          </TabsContent>

          <TabsContent value="publications">
            <PublicationsSection onComplete={navigateToNextTab} />
          </TabsContent>

          <TabsContent value="referees">
            <RefereesSection 
              onComplete={() => {
                toast({
                  title: "Application Submitted",
                  description: "Your application has been submitted successfully!",
                });
                navigate("/jobs");
              }} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicationForm;
