
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobType } from "@/types/supabase";

// Import sample job data as fallback
import { initialJobListings } from "@/data/SampleJobs";

const fetchJobs = async (): Promise<JobType[]> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('status', 'Open');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return initialJobListings as unknown as JobType[];
  }
};

const JobListings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: jobs = initialJobListings, isLoading: jobsLoading, error: jobsError } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
    onError: (error) => {
      console.error("Error fetching jobs:", error);
      toast({
        variant: "destructive",
        title: "Error fetching jobs",
        description: "Using sample data instead.",
      });
    }
  });

  const handleApply = (jobId: number) => {
    // No login required - just navigate to application form
    navigate(`/apply/${jobId}`);
  };

  if (jobsLoading) {
    return <div className="container py-8 mx-auto">Loading jobs...</div>;
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
