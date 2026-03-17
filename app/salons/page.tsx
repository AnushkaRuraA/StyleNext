"use client";

import { Search, MoreVertical, IndianRupee, MapPin } from "lucide-react";

export default function SalonsPage() {
  const salons = [
    { id: 1, owner: "Gulshan Kumar", salon: "GK Styles", location: "Mumbai Central", earnings: 45000, status: "Active" },
    { id: 2, owner: "Ravi Sharma", salon: "Urban Cut", location: "Andheri West", earnings: 38500, status: "Active" },
    { id: 3, owner: "Neha Verma", salon: "Glow Salon", location: "Bandra", earnings: 62000, status: "Active" },
    { id: 4, owner: "Vikrant Joshi", salon: "Mens Grooming Hub", location: "Powai", earnings: 12000, status: "Suspended" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Salon Owners</h1>
          <p className="text-gray-500 mt-1">Manage approved salons and their performance.</p>
        </div>
        <div className="relative w-full sm:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
           <input
             type="text"
             placeholder="Search salons..."
             className="w-full pl-10 pr-4 py-2 bg-card border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
           />
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="py-4 px-6">Salon & Owner</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6 text-right">Total Earnings</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {salons.map((salon) => (
                <tr key={salon.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-bold text-gray-900">{salon.salon}</p>
                      <p className="text-sm text-gray-500 mt-0.5">by {salon.owner}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" /> {salon.location}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-gray-800">
                    <div className="flex items-center justify-end gap-1">
                      <IndianRupee className="w-4 h-4 text-gray-500" /> {salon.earnings.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      salon.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 
                      'bg-red-50 text-red-700 border-red-100'
                    }`}>
                      {salon.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
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
