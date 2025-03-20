
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobType } from "@/types/supabase";
import { Loader2 } from "lucide-react";

// Import sample job data as fallback
import { initialJobListings } from "@/data/SampleJobs";

const fetchJobs = async (): Promise<JobType[]> => {
  try {
    console.log("Fetching jobs from Supabase...");
    const { data, error } = await supabase
      .from('jobs')
      .select('*');
    
    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.log("No jobs found in Supabase, using sample data");
      return initialJobListings as unknown as JobType[];
    }
    
    console.log("Jobs fetched successfully:", data.length);
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    console.log("Falling back to sample data");
    return initialJobListings as unknown as JobType[];
  }
};

const JobListings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: jobs = [], isLoading: jobsLoading, error: jobsError } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          console.error("Error in query:", error);
          toast({
            variant: "destructive",
            title: "Error fetching jobs",
            description: "Using sample data instead.",
          });
        } else if (data && data.length > 0) {
          console.log(`Displaying ${data.length} jobs`);
        } else {
          console.log("No jobs to display");
        }
      }
    }
  });

  const handleApply = (jobId: number) => {
    console.log(`Navigating to application form for job ID: ${jobId}`);
    navigate(`/apply/${jobId}`);
  };

  if (jobsLoading) {
    return (
      <div className="container py-8 mx-auto text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (jobsError) {
    console.error("Error displaying jobs:", jobsError);
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="container py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Current Job Openings</h1>
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">No job openings are currently available.</p>
          <p className="mt-2 text-sm text-gray-500">Please check back later for new opportunities.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Current Job Openings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <Badge variant={job.status === "Open" ? "default" : "secondary"}>
                  {job.status}
                </Badge>
              </div>
              <CardDescription>{job.department} • {job.location}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Type:</span> {job.type}</p>
                <p><span className="font-medium">Experience:</span> {job.experience}</p>
                <p><span className="font-medium">Education:</span> {job.education}</p>
                <p><span className="font-medium">Closing Date:</span> {new Date(job.closing_date).toLocaleDateString()}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Link to={`/jobs/${job.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <Button 
                onClick={() => handleApply(job.id)}
                disabled={job.status !== "Open"}
              >
                Apply Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
