"use client";

import React, { useState, useEffect } from "react";
import { Search, Calendar, Clock } from "lucide-react";
import { getAppointments, Appointment } from "@/services/firestoreService";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getAppointments();
      setAppointments(data);
      setIsLoading(false);
    }
    load();
  }, []);

  const filtered = appointments.filter(a =>
    a.barberName?.toLowerCase().includes(search.toLowerCase()) ||
    a.serviceName?.toLowerCase().includes(search.toLowerCase()) ||
    a.customerUID?.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'completed') return 'bg-green-50 text-green-700 border-green-100';
    if (s === 'accepted') return 'bg-blue-50 text-blue-700 border-blue-100';
    if (s === 'rejected' || s === 'cancelled') return 'bg-red-50 text-red-700 border-red-100';
    return 'bg-orange-50 text-orange-700 border-orange-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold">Appointments</h1>
          <p className="text-gold mt-1">Track all platform bookings and their real-time statuses.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-300 search-icon-anim" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#EBE2D3] border border-gray-100 rounded-lg text-sm text-gold-dark placeholder:text-gold-dark/60 font-medium focus:outline-none focus:ring-2 focus:ring-gold-dark/50"
            />
          </div>
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-[#EBE2D3] border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shrink-0">
            <Filter className="w-4 h-4" /> Filter
          </button> */}
        </div>
      </div>

      <div className="bg-[#EBE2D3] rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="py-4 px-6">Service</th>
                <th className="py-4 px-6">Salon</th>
                <th className="py-4 px-6">Schedule</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="py-12 text-center text-gray-400">Loading appointments...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-gray-500">
                  {search ? `No results for "${search}"` : "No appointments found in Firebase."}
                </td></tr>
              ) : filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-gray-900">{apt.serviceName || "—"}</p>
                    <p className="text-xs text-gray-400 mt-0.5 font-mono">{apt.id.slice(1, 9).toUpperCase()}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-purple-50 text-purple-700 text-xs font-medium border border-purple-100">
                      {apt.barberName || "—"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" /> {apt.date || "—"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" /> {apt.time || "—"}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-700">
                    {apt.totalAmount != null ? `₹${apt.totalAmount}` : "—"}
                    {apt.advanceAmount != null && (
                      <p className="text-xs text-green-600">₹{apt.advanceAmount} advance</p>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyle(apt.status)}`}>
                      {apt.status ? apt.status.charAt(0).toUpperCase() + apt.status.slice(1) : "—"}
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
