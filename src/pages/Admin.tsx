
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChartIcon, PieChartIcon, Users, Briefcase, FileText } from "lucide-react";
import OverviewTab from "@/components/admin/OverviewTab";
import JobsTab from "@/components/admin/JobsTab";
import ApplicantsTab from "@/components/admin/ApplicantsTab";
import ReportsTab from "@/components/admin/ReportsTab";
import { Job } from "@/models/JobTypes";

// Sample initial job listings
const initialJobListings: Job[] = [
  {
    id: 1,
    title: "Senior Researcher",
    department: "Research and Policy",
    location: "Nairobi",
    type: "Full-time",
    experience: "5+ years",
    education: "PhD",
    status: "Open",
    applications: 24,
    postDate: "2023-06-15",
    closingDate: "2023-07-15",
    description: "We are looking for a Senior Researcher to join our dynamic team...",
    requirements: [
      "PhD in relevant field",
      "5+ years of research experience",
      "Strong publication record",
      "Experience in policy analysis"
    ]
  },
  {
    id: 2,
    title: "Administrative Officer",
    department: "Administration",
    location: "Mombasa",
    type: "Full-time",
    experience: "3+ years",
    education: "Bachelor's",
    status: "Open",
    applications: 42,
    postDate: "2023-06-20",
    closingDate: "2023-07-20",
    description: "We are seeking an Administrative Officer to support our operations...",
    requirements: [
      "Bachelor's degree in Business Administration or related field",
      "3+ years of administrative experience",
      "Proficiency in MS Office",
      "Strong organizational skills"
    ]
  },
  // ... abbreviated for brevity, the full job listings are in the JobsTab component
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [applicants, setApplicants] = useState([]);

  // Handle automatic shortlisting
  const handleAutoShortlist = (jobId: number) => {
    // In a real application, this would contain more sophisticated logic
    // and would update the applicants state with newly shortlisted candidates
    console.log(`Auto-shortlisting for job ${jobId}`);
    // Implementation would be similar to the original Admin.tsx file
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

  return (
    <div className="container mx-auto py-4 px-2">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

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
            jobs={initialJobListings}
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
