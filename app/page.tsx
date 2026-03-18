"use client";

import {
  Users,
  Store,
  ClipboardCheck,
  CalendarDays,
  IndianRupee
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Total Customers",
    value: "120",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Salon Owners",
    value: "25",
    icon: Store,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "Pending Approvals",
    value: "5",
    icon: ClipboardCheck,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
  },
  {
    title: "Total Bookings",
    value: "45",
    icon: CalendarDays,
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Revenue Today",
    value: "₹12,500",
    icon: IndianRupee,
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
];

const revenueData = [
  { name: "Mon", revenue: 8400, bookings: 24 },
  { name: "Tue", revenue: 9200, bookings: 30 },
  { name: "Wed", revenue: 10500, bookings: 35 },
  { name: "Thu", revenue: 11000, bookings: 38 },
  { name: "Fri", revenue: 14000, bookings: 45 },
  { name: "Sat", revenue: 18500, bookings: 60 },
  { name: "Sun", revenue: 16200, bookings: 52 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Dashboard Overview</h1>
        <p className="text-gold mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-[#EBE2D3] p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-xl ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 bg-[#EBE2D3] p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Revenue & Bookings (This Week)</h3>
            <select className="bg-background-main border-none rounded-lg text-sm px-3 py-1.5 focus:ring-2 focus:ring-gold/50 outline-none text-gold-dark font-medium cursor-pointer">
              <option className="text-gold-dark">This Week</option>
              <option className="text-gold-dark">Last Week</option>
              <option className="text-gold-dark">This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <Tooltip
                  cursor={{ fill: 'rgba(92, 64, 17, 0.05)' }}
                  contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ color: '#5C4011', fontWeight: 'bold' }}
                />
                <Bar yAxisId="left" dataKey="revenue" name="Revenue (₹)" fill="#0F2E4A" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar yAxisId="right" dataKey="bookings" name="Bookings" fill="#B28D5A" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions / Recent Activity Placeholder */}
        <div className="bg-[#EBE2D3] p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { title: "New Salon Request", desc: "Urban Cut has submitted a registration request.", time: "10 mins ago", color: "bg-orange-100 text-orange-600" },
              { title: "Booking Completed", desc: "John Doe at GK Styles.", time: "1 hour ago", color: "bg-green-100 text-green-600" },
              { title: "Payment Received", desc: "Advance payment of ₹500 received.", time: "2 hours ago", color: "bg-blue-100 text-blue-600" },
              { title: "New Review", desc: "5 stars rating given to Glow Salon.", time: "3 hours ago", color: "bg-gold/20 text-gold" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${activity.color.split(' ')[0]}`} />
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{activity.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">{activity.desc}</p>
                  <span className="text-xs text-gray-400 mt-1 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
