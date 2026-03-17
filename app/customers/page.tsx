"use client";

import { Search, MoreVertical, Phone, Mail } from "lucide-react";

export default function CustomersPage() {
  const customers = [
    { id: 1, name: "Aarav Patel", phone: "+91 9876543220", email: "aarav@example.com", bookings: 12, status: "Active" },
    { id: 2, name: "Priya Sharma", phone: "+91 9876543221", email: "priya@example.com", bookings: 8, status: "Active" },
    { id: 3, name: "Rohan Gupta", phone: "+91 9876543222", email: "rohan@example.com", bookings: 3, status: "Inactive" },
    { id: 4, name: "Kavita Reddy", phone: "+91 9876543223", email: "kavita@example.com", bookings: 15, status: "Active" },
    { id: 5, name: "Vikram Singh", phone: "+91 9876543224", email: "vikram@example.com", bookings: 1, status: "New" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
          <p className="text-gray-500 mt-1">Manage all registered customers in the system.</p>
        </div>
        <div className="relative w-full sm:w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
           <input
             type="text"
             placeholder="Search customers..."
             className="w-full pl-10 pr-4 py-2 bg-card border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
           />
        </div>
      </div>

      <div className="bg-card rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="py-4 px-6">Customer Details</th>
                <th className="py-4 px-6">Contact Info</th>
                <th className="py-4 px-6 text-center">Total Bookings</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <p className="font-semibold text-gray-800">{customer.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                     <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-gray-400" /> {customer.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400" /> {customer.email}
                        </div>
                     </div>
                  </td>
                  <td className="py-4 px-6 text-center font-medium text-gray-700">{customer.bookings}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      customer.status === 'Active' ? 'bg-green-50 text-green-700 border-green-100' : 
                      customer.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                      {customer.status}
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
