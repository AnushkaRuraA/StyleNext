"use client";

import React, { useState, useEffect } from "react";
import { IndianRupee } from "lucide-react";
import { getPayments, Payment } from "@/services/firestoreService";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getPayments();
      setPayments(data);
      setIsLoading(false);
    }
    load();
  }, []);

  const formatDate = (val: any) => {
    if (!val) return "—";
    if (typeof val === "number") return new Date(val).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    return "—";
  };

  const statusStyle = (status?: string) => {
    if (!status) return "bg-orange-50 text-orange-700 border-orange-100";
    const s = status.toLowerCase();
    if (s === "paid" || s.includes("full")) return "bg-green-50 text-green-700 border-green-100";
    if (s.includes("advance")) return "bg-blue-50 text-blue-700 border-blue-100";
    return "bg-orange-50 text-orange-700 border-orange-100";
  };

  const formatStatus = (s?: string) => {
    if (!s) return "Pending";
    return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  };

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
                <th className="py-4 px-6">Appointment</th>
                <th className="py-4 px-6 text-right">Total Amount</th>
                <th className="py-4 px-6 text-right">Advance (10%)</th>
                <th className="py-4 px-6 text-right">Remaining (90%)</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">Loading payments...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-500">No payments found in Firebase.</td></tr>
              ) : payments.map((pay) => (
                <tr key={pay.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-mono text-sm text-gray-600">{(pay.razorpayPaymentId || pay.id).slice(0, 16)}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(pay.paidAt)}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-xs text-gray-500 font-mono">{pay.appointmentId?.slice(1, 12) ?? "—"}</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end font-semibold text-gray-900">
                      <IndianRupee className="w-3.5 h-3.5" />{(pay.totalAmount ?? 0).toLocaleString("en-IN")}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end text-sm text-green-600 font-medium">
                      <IndianRupee className="w-3.5 h-3.5" />{(pay.advancePaid ?? 0).toLocaleString("en-IN")}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end text-sm text-orange-600 font-medium">
                      <IndianRupee className="w-3.5 h-3.5" />{(pay.remainingAmount ?? 0).toLocaleString("en-IN")}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${statusStyle(pay.status)}`}>
                      {formatStatus(pay.status)}
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
