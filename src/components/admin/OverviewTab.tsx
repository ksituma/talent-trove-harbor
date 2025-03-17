
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { LineChartIcon, PieChartIcon, FileText } from "lucide-react";

// Sample data
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

const recentApplicationsData = [
  { id: 1, name: 'John Doe', position: 'Frontend Developer', date: '2023-10-15', status: 'Pending' },
  { id: 2, name: 'Jane Smith', position: 'UX Designer', date: '2023-10-14', status: 'Interviewed' },
  { id: 3, name: 'Robert Johnson', position: 'Backend Engineer', date: '2023-10-12', status: 'Rejected' },
  { id: 4, name: 'Emily Brown', position: 'Product Manager', date: '2023-10-10', status: 'Hired' },
  { id: 5, name: 'Michael Wilson', position: 'Data Analyst', date: '2023-10-08', status: 'Pending' },
];

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default OverviewTab;
