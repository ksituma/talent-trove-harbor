
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChartIcon, BarChartIcon } from "lucide-react";

const ReportsTab: React.FC = () => {
  return (
    <div className="space-y-8">
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
    </div>
  );
};

export default ReportsTab;
