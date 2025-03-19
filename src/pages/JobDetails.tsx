
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Import sample job data as fallback
import { initialJobListings } from "@/data/SampleJobs";

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: job, isLoading } = useQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
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
        return fallbackJob;
      }
      
      return data;
    }
  });

  const handleApply = () => {
    navigate(`/apply/${jobId}`);
  };

  if (isLoading) {
    return <div className="container py-8 mx-auto">Loading...</div>;
  }

  if (!job) {
    return (
      <div className="container py-8 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Job not found</h1>
        <p>The job you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/jobs")} className="mt-4">
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl">{job.title}</CardTitle>
              <CardDescription className="text-lg mt-2">
                {job.department} • {job.location}
              </CardDescription>
            </div>
            <Badge variant={job.status === "Open" ? "default" : "secondary"} className="text-sm">
              {job.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium">Job Type</p>
              <p>{job.type}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Experience Required</p>
              <p>{job.experience}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Education Required</p>
              <p>{job.education}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium">Closing Date</p>
              <p>{new Date(job.closingDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-medium">Job Description</h3>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-medium">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-medium">Responsibilities</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between items-center pt-4 border-t mt-6">
            <Button variant="outline" onClick={() => navigate("/jobs")}>
              Back to Jobs
            </Button>
            <Button 
              onClick={handleApply}
              disabled={job.status !== "Open"}
            >
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetails;
