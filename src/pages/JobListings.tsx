
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Job } from "@/models/JobTypes";

// Import sample job data (we'll replace this with Supabase data later)
import { initialJobListings } from "@/data/SampleJobs";

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>(initialJobListings);
  const [userApplications, setUserApplications] = useState<number[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // In a real implementation, we would fetch jobs from Supabase
  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     const { data, error } = await supabase
  //       .from('jobs')
  //       .select('*')
  //       .eq('status', 'Open');
  //     
  //     if (error) {
  //       toast({
  //         variant: "destructive",
  //         title: "Error fetching jobs",
  //         description: error.message,
  //       });
  //       return;
  //     }
  //     
  //     setJobs(data);
  //   };
  //   
  //   fetchJobs();
  // }, [toast]);

  // In a real implementation, we would check user applications
  // useEffect(() => {
  //   if (user) {
  //     const fetchUserApplications = async () => {
  //       const { data, error } = await supabase
  //         .from('applications')
  //         .select('job_id')
  //         .eq('user_id', user.id);
  //         
  //       if (error) {
  //         toast({
  //           variant: "destructive",
  //           title: "Error fetching applications",
  //           description: error.message,
  //         });
  //         return;
  //       }
  //       
  //       setUserApplications(data.map(app => app.job_id));
  //     };
  //     
  //     fetchUserApplications();
  //   }
  // }, [user, toast]);

  const handleApply = (jobId: number) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to apply for this job",
      });
      navigate("/auth");
      return;
    }

    // Check if user has already applied
    if (userApplications.includes(jobId)) {
      toast({
        variant: "destructive",
        title: "Application exists",
        description: "You have already applied for this job",
      });
      return;
    }

    // Navigate to application form with job ID
    navigate(`/apply/${jobId}`);
  };

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
                <p><span className="font-medium">Closing Date:</span> {new Date(job.closingDate).toLocaleDateString()}</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Link to={`/jobs/${job.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <Button 
                onClick={() => handleApply(job.id)}
                disabled={job.status !== "Open" || userApplications.includes(job.id)}
              >
                {userApplications.includes(job.id) ? "Applied" : "Apply Now"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
