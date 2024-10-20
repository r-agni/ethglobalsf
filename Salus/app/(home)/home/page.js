import React from 'react';
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
  <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
    <div className="flex flex-row items-center justify-between pb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <Icon className="h-4 w-4 text-gray-500" />
    </div>
    <div className="text-2xl font-bold">{value}</div>
  </div>
);

const BarChart = ({ data }) => {
  // Determine the maximum value for scaling the bars
  const maxPatients = Math.max(...data.map(item => item.patients));

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">Patient Admissions</h2>
      <div className="flex flex-row items-end mb-2" style={{ height: '300px', width: '100%' }}>
        {data.map((entry, index) => (
          <div key={index} className="flex flex-col items-center" style={{ width: '100%' }}>
            <div
              className="bg-blue-600"
              style={{
                height: `${(entry.patients / maxPatients) * 100}%`,
                width: '30px',
                margin: '0 5px',
                transition: 'height 0.3s ease'
              }}
            ></div>
            <span className="text-sm">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

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

      <div className="bg-white shadow-md rounded-lg mb-8 p-4">
        <BarChart data={data} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Recent Patients</h2>
            <ul className="space-y-2">
              <li>John Doe - Admitted: 2023-10-15</li>
              <li>Jane Smith - Admitted: 2023-10-14</li>
              <li>Bob Johnson - Admitted: 2023-10-13</li>
              <li>Alice Brown - Admitted: 2023-10-12</li>
            </ul>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Department Performance</h2>
            <ul className="space-y-2">
              <li>Cardiology - 98% patient satisfaction</li>
              <li>Neurology - 95% patient satisfaction</li>
              <li>Oncology - 97% patient satisfaction</li>
              <li>Pediatrics - 99% patient satisfaction</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
