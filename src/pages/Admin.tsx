
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChartIcon, PieChartIcon, Users, Briefcase, FileText, PlusCircle } from "lucide-react";
import OverviewTab from "@/components/admin/OverviewTab";
import JobsTab from "@/components/admin/JobsTab";
import ApplicantsTab from "@/components/admin/ApplicantsTab";
import ReportsTab from "@/components/admin/ReportsTab";
import JobForm from "@/components/admin/JobForm";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { JobType } from "@/types/supabase";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Fetch jobs for ApplicantsTab
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title");
      
      if (error) throw error;
      return data as { id: number; title: string }[];
    }
  });

  // Handle automatic shortlisting
  const handleAutoShortlist = (jobId: number) => {
    // In a real application, this would contain more sophisticated logic
    console.log(`Auto-shortlisting for job ${jobId}`);
  };

  // Handle selecting a job to view its applicants
  const handleSelectJob = (jobId: number) => {
    setSelectedJobId(jobId);
    setActiveTab("applicants");
  };

  // Clear job selection to view all applicants
  const handleClearJobSelection = () => {
    setSelectedJobId(null);
  };

  // Handle job form success
  const handleJobFormSuccess = () => {
    setIsJobDialogOpen(false);
    toast({
      title: "Success",
      description: "Job posting has been saved successfully."
    });
    // After success, ensure "jobs" tab is active to show the updated list
    setActiveTab("jobs");
  };

  return (
    <div className="container mx-auto py-4 px-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Dialog open={isJobDialogOpen} onOpenChange={setIsJobDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new job posting.
              </DialogDescription>
            </DialogHeader>
            <JobForm onSuccess={handleJobFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChartIcon size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase size={16} />
            Job Management
          </TabsTrigger>
          <TabsTrigger value="applicants" className="flex items-center gap-2">
            <Users size={16} />
            Applicants
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText size={16} />
            Reports
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        {/* Job Management Tab */}
        <TabsContent value="jobs">
          <JobsTab 
            onSelectJob={handleSelectJob} 
            onAutoShortlist={handleAutoShortlist}
          />
        </TabsContent>

        {/* Applicants Tab */}
        <TabsContent value="applicants">
          <ApplicantsTab 
            selectedJobId={selectedJobId} 
            onClearJobSelection={handleClearJobSelection}
            jobs={jobs}
          />
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
