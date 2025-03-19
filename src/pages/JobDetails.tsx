
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobType } from "@/types/supabase";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch job details
  const { data: job, isLoading, error } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as JobType;
    }
  });

  const handleApply = () => {
    if (!job) return;
    navigate(`/apply/${job.id}`);
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
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl">{job.title}</CardTitle>
            <Badge variant={job.status === "Open" ? "default" : "secondary"}>
              {job.status}
            </Badge>
          </div>
          <p className="text-gray-500">{job.department} • {job.location}</p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Job Type</h3>
              <p>{job.type}</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Experience</h3>
              <p>{job.experience}</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Education</h3>
              <p>{job.education}</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Closing Date</h3>
              <p>{new Date(job.closing_date).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Job Description</h3>
            <p className="whitespace-pre-wrap">{job.description}</p>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Requirements</h3>
            <ul className="list-disc pl-6 space-y-1">
              {job.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold">Responsibilities</h3>
            <ul className="list-disc pl-6 space-y-1">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button
            onClick={() => navigate("/jobs")}
            variant="outline"
            className="mr-2"
          >
            Back to Listings
          </Button>
          <Button
            onClick={handleApply}
            disabled={job.status !== "Open"}
          >
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobDetails;
