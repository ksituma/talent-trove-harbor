
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChartIcon, PieChartIcon, LineChartIcon, Users, Briefcase, FileText, Plus, Search, Filter, Trash2 } from "lucide-react";

// Sample data - in a real application, this would come from your API/database
const applicationData = [
  { month: 'Jan', applications: 65, interviews: 28, hired: 15 },
  { month: 'Feb', applications: 59, interviews: 32, hired: 12 },
  { month: 'Mar', applications: 80, interviews: 45, hired: 20 },
  { month: 'Apr', applications: 81, interviews: 34, hired: 18 },
  { month: 'May', applications: 56, interviews: 29, hired: 14 },
  { month: 'Jun', applications: 55, interviews: 25, hired: 10 },
  { month: 'Jul', applications: 40, interviews: 18, hired: 5 },
];

const jobCategoryData = [
  { name: 'Engineering', value: 35 },
  { name: 'Marketing', value: 15 },
  { name: 'Finance', value: 20 },
  { name: 'HR', value: 10 },
  { name: 'Operations', value: 15 },
  { name: 'Sales', value: 25 },
];

// Sample job listings
const initialJobListings = [
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
  {
    id: 3,
    title: "Training Coordinator",
    department: "Training",
    location: "Nakuru",
    type: "Full-time",
    experience: "2+ years",
    education: "Bachelor's",
    status: "Closed",
    applications: 38,
    postDate: "2023-05-10",
    closingDate: "2023-06-10",
    description: "We are looking for a Training Coordinator to organize and facilitate training programs...",
    requirements: [
      "Bachelor's degree in Education, HR, or related field",
      "2+ years of experience in training coordination",
      "Excellent communication skills",
      "Experience in curriculum development"
    ]
  },
  {
    id: 4,
    title: "Finance Manager",
    department: "Finance",
    location: "Nairobi",
    type: "Full-time",
    experience: "7+ years",
    education: "Master's",
    status: "Open",
    applications: 18,
    postDate: "2023-06-25",
    closingDate: "2023-07-25",
    description: "We are seeking a Finance Manager to oversee our financial operations...",
    requirements: [
      "Master's degree in Finance, Accounting, or related field",
      "7+ years of experience in financial management",
      "CPA certification",
      "Experience in public sector finance"
    ]
  },
  {
    id: 5,
    title: "ICT Officer",
    department: "ICT",
    location: "Nairobi",
    type: "Full-time",
    experience: "3+ years",
    education: "Bachelor's",
    status: "Open",
    applications: 31,
    postDate: "2023-06-18",
    closingDate: "2023-07-18",
    description: "We are looking for an ICT Officer to manage our information systems...",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in IT support",
      "Knowledge of network administration",
      "Experience with database management"
    ]
  }
];

// Sample applicant data
const applicantData = [
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

const recentApplicationsData = [
  { id: 1, name: 'John Doe', position: 'Frontend Developer', date: '2023-10-15', status: 'Pending' },
  { id: 2, name: 'Jane Smith', position: 'UX Designer', date: '2023-10-14', status: 'Interviewed' },
  { id: 3, name: 'Robert Johnson', position: 'Backend Engineer', date: '2023-10-12', status: 'Rejected' },
  { id: 4, name: 'Emily Brown', position: 'Product Manager', date: '2023-10-10', status: 'Hired' },
  { id: 5, name: 'Michael Wilson', position: 'Data Analyst', date: '2023-10-08', status: 'Pending' },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [jobListings, setJobListings] = useState(initialJobListings);
  const [applicants, setApplicants] = useState(applicantData);
  const [newJobDialogOpen, setNewJobDialogOpen] = useState(false);
  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const [jobFilterStatus, setJobFilterStatus] = useState("all");
  const [applicantSearchQuery, setApplicantSearchQuery] = useState("");
  const [applicantFilterStatus, setApplicantFilterStatus] = useState("all");
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [newJob, setNewJob] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    experience: "",
    education: "",
    description: "",
    requirements: "",
    closingDate: ""
  });

  // Filter jobs based on search query and status filter
  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) || 
                          job.department.toLowerCase().includes(jobSearchQuery.toLowerCase());
    const matchesFilter = jobFilterStatus === "all" || job.status === jobFilterStatus;
    return matchesSearch && matchesFilter;
  });

  // Filter applicants based on search query, status filter, and selected job
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(applicantSearchQuery.toLowerCase()) || 
                          applicant.position.toLowerCase().includes(applicantSearchQuery.toLowerCase());
    const matchesFilter = applicantFilterStatus === "all" || applicant.status === applicantFilterStatus;
    const matchesSelectedJob = selectedJobId === null || applicant.jobId === selectedJobId;
    return matchesSearch && matchesFilter && matchesSelectedJob;
  });

  // Handle creating a new job
  const handleCreateJob = () => {
    const newJobItem = {
      id: jobListings.length + 1,
      title: newJob.title,
      department: newJob.department,
      location: newJob.location,
      type: newJob.type,
      experience: newJob.experience,
      education: newJob.education,
      status: "Open",
      applications: 0,
      postDate: new Date().toISOString().split('T')[0],
      closingDate: newJob.closingDate,
      description: newJob.description,
      requirements: newJob.requirements.split('\n').filter(req => req.trim() !== '')
    };
    
    setJobListings([...jobListings, newJobItem]);
    setNewJobDialogOpen(false);
    setNewJob({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      experience: "",
      education: "",
      description: "",
      requirements: "",
      closingDate: ""
    });
  };

  // Automatically shortlist applicants based on criteria
  const handleAutoShortlist = (jobId: number) => {
    // In a real application, this would use more sophisticated logic
    setApplicants(applicants.map(applicant => {
      if (applicant.jobId === jobId) {
        const relevantExp = parseInt(applicant.experience.split(' ')[0], 10);
        const hasPhD = applicant.education.includes("PhD");
        const hasMasters = applicant.education.includes("Master's");
        
        // Logic to determine if applicant should be shortlisted
        if ((relevantExp >= 5 && (hasPhD || hasMasters)) || 
            (relevantExp >= 3 && hasPhD) || 
            applicant.relevantSkills >= 80) {
          return { ...applicant, status: "Shortlisted" };
        }
      }
      return applicant;
    }));
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
        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">436</div>
                <p className="text-sm text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Interviews Conducted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">211</div>
                <p className="text-sm text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Candidates Hired</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">94</div>
                <p className="text-sm text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon size={18} />
                  Application Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={applicationData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="applications" stroke="#0088FE" name="Applications" />
                      <Line type="monotone" dataKey="interviews" stroke="#00C49F" name="Interviews" />
                      <Line type="monotone" dataKey="hired" stroke="#FFBB28" name="Hired" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon size={18} />
                  Applications by Job Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={jobCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {jobCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={18} />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplicationsData.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.name}</TableCell>
                      <TableCell>{application.position}</TableCell>
                      <TableCell>{new Date(application.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          application.status === 'Hired' ? 'bg-green-100 text-green-800' :
                          application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          application.status === 'Interviewed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {application.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Job Management Tab */}
        <TabsContent value="jobs" className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Job Listings</h2>
            <Dialog open={newJobDialogOpen} onOpenChange={setNewJobDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus size={16} />
                  Create New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Job Posting</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to create a new job posting.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input 
                        id="title" 
                        value={newJob.title} 
                        onChange={(e) => setNewJob({...newJob, title: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input 
                        id="department" 
                        value={newJob.department} 
                        onChange={(e) => setNewJob({...newJob, department: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        value={newJob.location} 
                        onChange={(e) => setNewJob({...newJob, location: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Select 
                        value={newJob.type} 
                        onValueChange={(value) => setNewJob({...newJob, type: value})}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                          <SelectItem value="Contract">Contract</SelectItem>
                          <SelectItem value="Internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience Required</Label>
                      <Input 
                        id="experience" 
                        placeholder="e.g. 3+ years" 
                        value={newJob.experience} 
                        onChange={(e) => setNewJob({...newJob, experience: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="education">Education Required</Label>
                      <Input 
                        id="education" 
                        placeholder="e.g. Bachelor's" 
                        value={newJob.education} 
                        onChange={(e) => setNewJob({...newJob, education: e.target.value})} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closing-date">Closing Date</Label>
                    <Input 
                      id="closing-date" 
                      type="date" 
                      value={newJob.closingDate} 
                      onChange={(e) => setNewJob({...newJob, closingDate: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea 
                      id="description" 
                      rows={4} 
                      value={newJob.description} 
                      onChange={(e) => setNewJob({...newJob, description: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">
                      Requirements (one per line)
                    </Label>
                    <Textarea 
                      id="requirements" 
                      rows={4} 
                      placeholder="Bachelor's degree in relevant field&#10;3+ years experience&#10;Knowledge of XYZ"
                      value={newJob.requirements} 
                      onChange={(e) => setNewJob({...newJob, requirements: e.target.value})} 
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setNewJobDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleCreateJob}>Create Job</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="md:col-span-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search jobs..."
                className="pl-10"
                value={jobSearchQuery}
                onChange={(e) => setJobSearchQuery(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Select 
                value={jobFilterStatus} 
                onValueChange={setJobFilterStatus}
              >
                <SelectTrigger className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Closing Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.experience}</TableCell>
                    <TableCell>{job.applications}</TableCell>
                    <TableCell>{new Date(job.closingDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        job.status === 'Open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAutoShortlist(job.id)}
                        >
                          Auto Shortlist
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedJobId(job.id);
                            setActiveTab("applicants");
                          }}
                        >
                          View Applicants
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
                <CardTitle className="text-lg">Job Posting Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Open Jobs", value: jobListings.filter(job => job.status === "Open").length },
                        { name: "Closed Jobs", value: jobListings.filter(job => job.status === "Closed").length },
                        { name: "Total Applications", value: jobListings.reduce((sum, job) => sum + job.applications, 0) },
                        { name: "Shortlisted", value: applicants.filter(app => app.status === "Shortlisted").length },
                        { name: "Interviewed", value: applicants.filter(app => app.interview === "Completed").length },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8">
                        {[0, 1, 2, 3, 4].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Applications by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Research and Policy", value: 24 },
                          { name: "Administration", value: 42 },
                          { name: "Training", value: 38 },
                          { name: "Finance", value: 18 },
                          { name: "ICT", value: 31 },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[0, 1, 2, 3, 4].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Applicants Tab */}
        <TabsContent value="applicants" className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {selectedJobId 
                ? `Applicants for ${jobListings.find(job => job.id === selectedJobId)?.title}` 
                : "All Applicants"}
            </h2>
            {selectedJobId && (
              <Button variant="outline" onClick={() => setSelectedJobId(null)}>
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
                          onClick={() => {
                            setApplicants(applicants.map(app => 
                              app.id === applicant.id ? { ...app, status: "Shortlisted" } : app
                            ));
                          }}
                        >
                          Shortlist
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setApplicants(applicants.map(app => 
                              app.id === applicant.id ? { ...app, status: "Rejected" } : app
                            ));
                          }}
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
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-8">
          <h2 className="text-2xl font-semibold">Recruitment Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Time to Hire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45 days</div>
                <p className="text-sm text-muted-foreground">Average time from job posting to onboarding</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cost per Hire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">KES 85,000</div>
                <p className="text-sm text-muted-foreground">Average cost of recruiting one employee</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Offer Acceptance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">76%</div>
                <p className="text-sm text-muted-foreground">Percentage of offers accepted by candidates</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon size={18} />
                  Hiring Trends by Department
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={[
                        { month: 'Jan', Research: 2, Administration: 3, ICT: 1, Finance: 0, Training: 1 },
                        { month: 'Feb', Research: 1, Administration: 2, ICT: 0, Finance: 1, Training: 0 },
                        { month: 'Mar', Research: 3, Administration: 1, ICT: 2, Finance: 2, Training: 1 },
                        { month: 'Apr', Research: 2, Administration: 3, ICT: 1, Finance: 1, Training: 2 },
                        { month: 'May', Research: 1, Administration: 2, ICT: 1, Finance: 0, Training: 1 },
                        { month: 'Jun', Research: 0, Administration: 1, ICT: 2, Finance: 1, Training: 0 },
                      ]} 
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Research" stroke="#0088FE" />
                      <Line type="monotone" dataKey="Administration" stroke="#00C49F" />
                      <Line type="monotone" dataKey="ICT" stroke="#FFBB28" />
                      <Line type="monotone" dataKey="Finance" stroke="#FF8042" />
                      <Line type="monotone" dataKey="Training" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon size={18} />
                  Application to Hire Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { department: 'Research', applications: 95, hires: 15, rate: 15.8 },
                        { department: 'Admin', applications: 120, hires: 18, rate: 15.0 },
                        { department: 'ICT', applications: 75, hires: 12, rate: 16.0 },
                        { department: 'Finance', applications: 60, hires: 8, rate: 13.3 },
                        { department: 'Training', applications: 85, hires: 10, rate: 11.8 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="department" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="applications" fill="#8884d8" name="Applications" />
                      <Bar yAxisId="left" dataKey="hires" fill="#82ca9d" name="Hires" />
                      <Bar yAxisId="right" dataKey="rate" fill="#ffc658" name="Conversion Rate (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recruitment Performance Report</CardTitle>
              <CardDescription>Comparing key metrics across different quarters</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Q1 2023</TableHead>
                    <TableHead>Q2 2023</TableHead>
                    <TableHead>Q3 2023</TableHead>
                    <TableHead>Q4 2023</TableHead>
                    <TableHead>YoY Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Job Postings</TableCell>
                    <TableCell>24</TableCell>
                    <TableCell>32</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>30</TableCell>
                    <TableCell className="text-green-600">+15%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Applications</TableCell>
                    <TableCell>435</TableCell>
                    <TableCell>521</TableCell>
                    <TableCell>478</TableCell>
                    <TableCell>502</TableCell>
                    <TableCell className="text-green-600">+22%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Interviews</TableCell>
                    <TableCell>87</TableCell>
                    <TableCell>104</TableCell>
                    <TableCell>95</TableCell>
                    <TableCell>112</TableCell>
                    <TableCell className="text-green-600">+18%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hires</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>22</TableCell>
                    <TableCell>29</TableCell>
                    <TableCell className="text-green-600">+28%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Time to Hire (days)</TableCell>
                    <TableCell>52</TableCell>
                    <TableCell>48</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell className="text-green-600">-19%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cost per Hire (KES)</TableCell>
                    <TableCell>92,000</TableCell>
                    <TableCell>89,000</TableCell>
                    <TableCell>87,000</TableCell>
                    <TableCell>85,000</TableCell>
                    <TableCell className="text-green-600">-8%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
