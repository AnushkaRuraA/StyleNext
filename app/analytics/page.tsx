"use client";

import { Users, TrendingUp, IndianRupee } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

export default function AnalyticsPage() {
  const earningsData = [
    { month: "Jan", earnings: 45000, customers: 320 },
    { month: "Feb", earnings: 52000, customers: 380 },
    { month: "Mar", earnings: 48000, customers: 350 },
    { month: "Apr", earnings: 61000, customers: 410 },
    { month: "May", earnings: 65000, customers: 450 },
    { month: "Jun", earnings: 72000, customers: 490 },
    { month: "Jul", earnings: 85000, customers: 560 },
  ];

  const serviceData = [
    { name: "Hair Care", value: 45 },
    { name: "Skin Care", value: 25 },
    { name: "Makeup", value: 15 },
    { name: "Spa & Massage", value: 15 },
  ];
  
  const COLORS = ['#0F2E4A', '#B28D5A', '#BA6A58', '#4b5563'];

  // Custom tooltips
  const CustomEarningsTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2">{label}</p>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-primary font-medium flex justify-between gap-4">
              Earnings: <span>₹{payload[0].value.toLocaleString()}</span>
            </span>
            <span className="text-sm text-gold font-medium flex justify-between gap-4">
              Customers: <span>{payload[1].value}</span>
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Analytics & Reports</h1>
        <p className="text-gold mt-1">Dive deep into platform performance, earnings, and customer growth.</p>
      </div>

      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl shadow-md text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white/70 font-medium">Total Platform Earnings</p>
            <h2 className="text-4xl font-bold mt-2">₹4,28,000</h2>
            <p className="text-sm mt-2 flex items-center gap-1 text-green-400">
              <TrendingUp className="w-4 h-4" /> +15.3% from last month
            </p>
          </div>
          <div className="absolute -right-6 -top-6 text-white/5 opacity-50">
            <IndianRupee className="w-48 h-48" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-gold to-yellow-600 p-6 rounded-2xl shadow-md text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-white/80 font-medium">Total Customers Served</p>
            <h2 className="text-4xl font-bold mt-2">2,960</h2>
            <p className="text-sm mt-2 flex items-center gap-1 text-white/90">
              <TrendingUp className="w-4 h-4" /> +8.2% from last month
            </p>
          </div>
          <div className="absolute -right-4 top-0 text-white/10 opacity-50">
            <Users className="w-40 h-40" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-[#EBE2D3] p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Growth Overview</h3>
            <select className="bg-background-main border-none rounded-lg text-sm px-3 py-1.5 focus:ring-2 focus:ring-primary/50 outline-none text-gold-dark font-medium cursor-pointer">
              <option className="text-gold-dark">Last 6 Months</option>
              <option className="text-gold-dark">This Year</option>
              <option className="text-gold-dark">All Time</option>
            </select>
          </div>
          <div className="h-[350px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={earningsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F2E4A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0F2E4A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B28D5A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#B28D5A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                <Tooltip content={<CustomEarningsTooltip />} />
                <Area yAxisId="left" type="monotone" dataKey="earnings" stroke="#0F2E4A" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
                <Area yAxisId="right" type="monotone" dataKey="customers" stroke="#B28D5A" strokeWidth={3} fillOpacity={1} fill="url(#colorCustomers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#EBE2D3] p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Service Distribution</h3>
          <p className="text-sm text-gray-500 mb-6">Breakdown of bookings by category.</p>
          
          <div className="flex-1 flex items-center justify-center min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
                <Legend layout="vertical" verticalAlign="bottom" align="center" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
