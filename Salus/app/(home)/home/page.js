import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Activity, Clipboard, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', patients: 400 },
  { name: 'Feb', patients: 300 },
  { name: 'Mar', patients: 500 },
  { name: 'Apr', patients: 280 },
  { name: 'May', patients: 390 },
  { name: 'Jun', patients: 430 },
];

const StatCard = ({ title, value, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default function HealthcareDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Healthcare Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Patients" value="1,234" icon={Users} />
        <StatCard title="Average Heart Rate" value="72 bpm" icon={Activity} />
        <StatCard title="Pending Reports" value="15" icon={Clipboard} />
        <StatCard title="Recovery Rate" value="95%" icon={TrendingUp} />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Patient Admissions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>John Doe - Admitted: 2023-10-15</li>
              <li>Jane Smith - Admitted: 2023-10-14</li>
              <li>Bob Johnson - Admitted: 2023-10-13</li>
              <li>Alice Brown - Admitted: 2023-10-12</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Cardiology - 98% patient satisfaction</li>
              <li>Neurology - 95% patient satisfaction</li>
              <li>Oncology - 97% patient satisfaction</li>
              <li>Pediatrics - 99% patient satisfaction</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}