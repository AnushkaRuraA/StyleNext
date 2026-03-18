"use client";

import { IndianRupee } from "lucide-react";

export default function PaymentsPage() {
  const payments = [
    { id: "PAY-001", customer: "Aarav Patel", salon: "GK Styles", total: 500, advance: 50, remaining: 450, status: "Paid in Full", date: "Oct 25, 2023" },
    { id: "PAY-002", customer: "Priya Sharma", salon: "Urban Cut", total: 800, advance: 80, remaining: 720, status: "Advance Paid", date: "Oct 25, 2023" },
    { id: "PAY-003", customer: "Rohan Gupta", salon: "Glow Salon", total: 1500, advance: 150, remaining: 1350, status: "Pending", date: "Oct 25, 2023" },
    { id: "PAY-004", customer: "Kavita Reddy", salon: "GK Styles", total: 1200, advance: 120, remaining: 1080, status: "Advance Paid", date: "Oct 26, 2023" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gold">Payments</h1>
        <p className="text-gold mt-1">Track 10% online advance and 90% in-salon remaining payments.</p>
      </div>

      <div className="bg-[#EBE2D3] rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Booking Details</th>
                <th className="py-4 px-6 text-right">Total Amount</th>
                <th className="py-4 px-6 text-right">Advance (10%)</th>
                <th className="py-4 px-6 text-right">Remaining (90%)</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-mono text-sm text-gray-600">{pay.id}</p>
                    <p className="text-xs text-gray-400 mt-1">{pay.date}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-gray-800">{pay.customer}</p>
                    <p className="text-xs text-gray-500 mt-0.5">at {pay.salon}</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end font-semibold text-gray-900">
                      <IndianRupee className="w-3.5 h-3.5" /> {pay.total}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end text-sm text-green-600 font-medium">
                      <IndianRupee className="w-3.5 h-3.5" /> {pay.advance}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end text-sm text-orange-600 font-medium">
                      <IndianRupee className="w-3.5 h-3.5" /> {pay.remaining}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                      pay.status === 'Paid in Full' ? 'bg-green-50 text-green-700 border-green-100' : 
                      pay.status === 'Advance Paid' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      'bg-orange-50 text-orange-700 border-orange-100'
                    }`}>
                      {pay.status}
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
