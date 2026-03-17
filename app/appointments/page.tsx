"use client";

import { Search, Calendar, Clock, Filter } from "lucide-react";

export default function AppointmentsPage() {
  const appointments = [
    { id: "APT-001", customer: "Aarav Patel", salon: "GK Styles", service: "Hair Cut + Wash", date: "Today", time: "10:30 AM", status: "Completed" },
    { id: "APT-002", customer: "Priya Sharma", salon: "Urban Cut", service: "Hair Spa", date: "Today", time: "02:00 PM", status: "Accepted" },
    { id: "APT-003", customer: "Rohan Gupta", salon: "Glow Salon", service: "Facial", date: "Today", time: "05:15 PM", status: "Pending" },
    { id: "APT-004", customer: "Kavita Reddy", salon: "GK Styles", service: "Hair Coloring", date: "Tomorrow", time: "11:00 AM", status: "Accepted" },
    { id: "APT-005", customer: "Vikram Singh", salon: "Urban Cut", service: "Beard Trim", date: "Tomorrow", time: "01:30 PM", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-500 mt-1">Track all platform bookings and their real-time statuses.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
             <input
               type="text"
               placeholder="Search..."
               className="w-full pl-10 pr-4 py-2 bg-card border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
             />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shrink-0">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="py-4 px-6">ID & Services</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Salon</th>
                <th className="py-4 px-6">Schedule</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-900">{apt.service}</p>
                    <p className="text-xs text-gray-400 mt-0.5 font-mono">{apt.id}</p>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-700">
                    {apt.customer}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
                      {apt.salon}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" /> {apt.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" /> {apt.time}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      apt.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-100' : 
                      apt.status === 'Accepted' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-orange-50 text-orange-700 border-orange-100'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
