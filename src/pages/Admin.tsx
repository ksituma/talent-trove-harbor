
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChartIcon, PieChartIcon, LineChartIcon, Users, Briefcase, FileText } from "lucide-react";

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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChartIcon size={16} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="applicants" className="flex items-center gap-2">
            <Users size={16} />
            Applicants
          </TabsTrigger>
          <TabsTrigger value="jobs" className="flex items-center gap-2">
            <Briefcase size={16} />
            Jobs
          </TabsTrigger>
        </TabsList>

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

        <TabsContent value="applicants" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon size={18} />
                  Applicants by Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={experienceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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

            <Card>
              <CardHeader>
                <CardTitle>Applicant Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Application Sources</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">LinkedIn</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Company Website</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: "28%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Job Boards</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-yellow-500 h-full rounded-full" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Referrals</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Skill Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Skill</TableHead>
                    <TableHead>Demand</TableHead>
                    <TableHead>Available Candidates</TableHead>
                    <TableHead>Gap</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">React.js</TableCell>
                    <TableCell>48</TableCell>
                    <TableCell>32</TableCell>
                    <TableCell className="text-red-500">-16</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Python</TableCell>
                    <TableCell>36</TableCell>
                    <TableCell>45</TableCell>
                    <TableCell className="text-green-500">+9</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">UX Design</TableCell>
                    <TableCell>24</TableCell>
                    <TableCell>18</TableCell>
                    <TableCell className="text-red-500">-6</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Data Analysis</TableCell>
                    <TableCell>30</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell className="text-red-500">-2</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Project Management</TableCell>
                    <TableCell>22</TableCell>
                    <TableCell>35</TableCell>
                    <TableCell className="text-green-500">+13</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Open Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-sm text-muted-foreground">Across 8 departments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Time to Hire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18 days</div>
                <p className="text-sm text-muted-foreground">-3 days from last quarter</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cost per Hire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$4,250</div>
                <p className="text-sm text-muted-foreground">+5% from last quarter</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Job Posting Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { position: "Frontend Dev", views: 1200, applications: 45, qualified: 18 },
                      { position: "UX Designer", views: 980, applications: 36, qualified: 14 },
                      { position: "Backend Dev", views: 1100, applications: 42, qualified: 20 },
                      { position: "Product Manager", views: 850, applications: 28, qualified: 12 },
                      { position: "Data Analyst", views: 750, applications: 25, qualified: 10 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="position" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#8884d8" name="Views" />
                    <Bar dataKey="applications" fill="#82ca9d" name="Applications" />
                    <Bar dataKey="qualified" fill="#ffc658" name="Qualified" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                    <TableHead>Days Open</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Senior Frontend Developer</TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell>68</TableCell>
                    <TableCell>5.8%</TableCell>
                    <TableCell>12</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Product Manager</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>4.9%</TableCell>
                    <TableCell>18</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Data Scientist</TableCell>
                    <TableCell>Analytics</TableCell>
                    <TableCell>36</TableCell>
                    <TableCell>4.2%</TableCell>
                    <TableCell>21</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">UX/UI Designer</TableCell>
                    <TableCell>Design</TableCell>
                    <TableCell>51</TableCell>
                    <TableCell>6.1%</TableCell>
                    <TableCell>15</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">DevOps Engineer</TableCell>
                    <TableCell>Infrastructure</TableCell>
                    <TableCell>28</TableCell>
                    <TableCell>3.8%</TableCell>
                    <TableCell>24</TableCell>
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
