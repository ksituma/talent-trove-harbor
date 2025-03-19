
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobType } from "@/types/supabase";

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Safely parse jobId to number
  const parsedJobId = jobId ? parseInt(jobId, 10) : 0;

  const { data: job, isLoading, error } = useQuery({
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
    },
    meta: {
      onError: (error: any) => {
        console.error("Error fetching job:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load job details.",
        });
      }
    }
  });

  const handleApply = () => {
    navigate(`/apply/${parsedJobId}`);
  };

  if (isLoading) {
    return <div className="container py-8 mx-auto">Loading job details...</div>;
  }

  if (error || !job) {
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
        <CardHeader className="border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <CardTitle className="text-2xl">{job.title}</CardTitle>
              <p className="text-gray-600 mt-1">{job.department} • {job.location}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={job.status === "Open" ? "default" : "secondary"}>
                {job.status}
              </Badge>
              <Button 
                onClick={handleApply}
                disabled={job.status !== "Open"}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Job Details</h3>
                <div className="space-y-3">
                  <p><span className="font-medium">Type:</span> {job.type}</p>
                  <p><span className="font-medium">Experience:</span> {job.experience}</p>
                  <p><span className="font-medium">Education:</span> {job.education}</p>
                  <p>
                    <span className="font-medium">Closing Date:</span> {" "}
                    {new Date(job.closing_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Job Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Requirements</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Responsibilities</h3>
                <ul className="list-disc ml-5 space-y-1">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-700">{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetails;
