import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Plus, Search, Filter } from "lucide-react";

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

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

interface JobsTabProps {
  onSelectJob: (jobId: number) => void;
  onAutoShortlist: (jobId: number) => void;
}

const JobsTab: React.FC<JobsTabProps> = ({ onSelectJob, onAutoShortlist }) => {
  const [jobListings, setJobListings] = useState(initialJobListings);
  const [newJobDialogOpen, setNewJobDialogOpen] = useState(false);
  const [jobSearchQuery, setJobSearchQuery] = useState("");
  const [jobFilterStatus, setJobFilterStatus] = useState("all");
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

  return (
    <div className="space-y-8">
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
                      onClick={() => onAutoShortlist(job.id)}
                    >
                      Auto Shortlist
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onSelectJob(job.id)}
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
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {[0, 1, 2].map((entry, index) => (
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
    </div>
  );
};

export default JobsTab;

/*
To update jobs in the Supabase backend:

1. Log in to the Supabase dashboard (https://supabase.com)
2. Navigate to your project
3. Select the "Table editor" from the sidebar
4. Find the "jobs" table
5. You can directly edit entries in the table view
6. To add a new job, click "Insert row" and fill in the details
7. You can also use the SQL editor to run batch updates or insertions

Example SQL to insert a new job:

INSERT INTO public.jobs (
  title, department, location, type, experience, education, 
  description, requirements, responsibilities, salary_range, closing_date, status
) VALUES (
  'New Job Title', 'Department Name', 'Location', 'Full-time', 
  '3+ years', 'Bachelor''s Degree', 'Job description here',
  ARRAY['Requirement 1', 'Requirement 2', 'Requirement 3'],
  ARRAY['Responsibility 1', 'Responsibility 2', 'Responsibility 3'],
  'KSh 80,000 - 120,000', '2023-12-31', 'Open'
);

*/
