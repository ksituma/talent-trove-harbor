
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Search, Filter } from "lucide-react";

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Sample applicant data
const initialApplicantData = [
  {
    id: 1,
    name: "John Doe",
    position: "Senior Researcher",
    applied: "2023-06-20",
    experience: "7 years",
    education: "PhD in Economics",
    relevantSkills: 85,
    status: "Shortlisted",
    interview: "Scheduled",
    jobId: 1
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Senior Researcher",
    applied: "2023-06-22",
    experience: "6 years",
    education: "PhD in Public Policy",
    relevantSkills: 80,
    status: "Shortlisted",
    interview: "Completed",
    jobId: 1
  },
  {
    id: 3,
    name: "Robert Johnson",
    position: "Administrative Officer",
    applied: "2023-06-21",
    experience: "4 years",
    education: "Bachelor's in Business Administration",
    relevantSkills: 75,
    status: "Under Review",
    interview: "Not Scheduled",
    jobId: 2
  },
  {
    id: 4,
    name: "Emily Brown",
    position: "Administrative Officer",
    applied: "2023-06-25",
    experience: "5 years",
    education: "Master's in Public Administration",
    relevantSkills: 90,
    status: "Shortlisted",
    interview: "Scheduled",
    jobId: 2
  },
  {
    id: 5,
    name: "Michael Wilson",
    position: "ICT Officer",
    applied: "2023-06-19",
    experience: "3 years",
    education: "Bachelor's in Computer Science",
    relevantSkills: 70,
    status: "Under Review",
    interview: "Not Scheduled",
    jobId: 5
  }
];

const experienceData = [
  { range: '0-1 Years', value: 10 },
  { range: '1-3 Years', value: 25 },
  { range: '3-5 Years', value: 35 },
  { range: '5-10 Years', value: 20 },
  { range: '10+ Years', value: 10 },
];

interface JobData {
  id: number;
  title: string;
}

interface ApplicantsTabProps {
  selectedJobId: number | null;
  onClearJobSelection: () => void;
  jobs: JobData[];
}

const ApplicantsTab: React.FC<ApplicantsTabProps> = ({ selectedJobId, onClearJobSelection, jobs }) => {
  const [applicants, setApplicants] = useState(initialApplicantData);
  const [applicantSearchQuery, setApplicantSearchQuery] = useState("");
  const [applicantFilterStatus, setApplicantFilterStatus] = useState("all");

  // Filter applicants based on search query, status filter, and selected job
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(applicantSearchQuery.toLowerCase()) || 
                         applicant.position.toLowerCase().includes(applicantSearchQuery.toLowerCase());
    const matchesFilter = applicantFilterStatus === "all" || applicant.status === applicantFilterStatus;
    const matchesSelectedJob = selectedJobId === null || applicant.jobId === selectedJobId;
    return matchesSearch && matchesFilter && matchesSelectedJob;
  });

  // Handle shortlisting an applicant
  const handleShortlist = (applicantId: number) => {
    setApplicants(applicants.map(app => 
      app.id === applicantId ? { ...app, status: "Shortlisted" } : app
    ));
  };

  // Handle rejecting an applicant
  const handleReject = (applicantId: number) => {
    setApplicants(applicants.map(app => 
      app.id === applicantId ? { ...app, status: "Rejected" } : app
    ));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {selectedJobId 
            ? `Applicants for ${jobs.find(job => job.id === selectedJobId)?.title}` 
            : "All Applicants"}
        </h2>
        {selectedJobId && (
          <Button variant="outline" onClick={onClearJobSelection}>
            View All Applicants
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div className="md:col-span-3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search applicants..."
            className="pl-10"
            value={applicantSearchQuery}
            onChange={(e) => setApplicantSearchQuery(e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Select 
            value={applicantFilterStatus} 
            onValueChange={setApplicantFilterStatus}
          >
            <SelectTrigger className="flex items-center gap-2">
              <Filter size={16} />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Shortlisted">Shortlisted</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Applied On</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Match Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell className="font-medium">{applicant.name}</TableCell>
                <TableCell>{applicant.position}</TableCell>
                <TableCell>{new Date(applicant.applied).toLocaleDateString()}</TableCell>
                <TableCell>{applicant.experience}</TableCell>
                <TableCell>{applicant.education}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          applicant.relevantSkills >= 80 ? 'bg-green-600' :
                          applicant.relevantSkills >= 60 ? 'bg-yellow-400' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${applicant.relevantSkills}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">{applicant.relevantSkills}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    applicant.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                    applicant.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {applicant.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShortlist(applicant.id)}
                    >
                      Shortlist
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReject(applicant.id)}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Applicant Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Under Review", value: applicants.filter(app => app.status === "Under Review").length },
                      { name: "Shortlisted", value: applicants.filter(app => app.status === "Shortlisted").length },
                      { name: "Rejected", value: applicants.filter(app => app.status === "Rejected").length },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {[0, 1, 2].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Applicant Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={experienceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {experienceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicantsTab;
