"use client";

import { CheckCircle2, XCircle, Search } from "lucide-react";

import React, { useState, useEffect } from "react";
import { listenToPendingSalons, updateSalonStatus, Salon } from "@/services/firestoreService";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Salon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToPendingSalons((data) => {
      setApprovals(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    try {
        await updateSalonStatus(id, status);
    } catch (err) {
        console.error("Failed to update status", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold">Pending Approvals</h1>
          <p className="text-gold mt-1">Review and manage salon owner registration requests.</p>
        </div>
        <div className="relative w-full sm:w-64 group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-300 search-icon-anim" />
           <input
             type="text"
             placeholder="Search requests..."
             className="w-full pl-10 pr-4 py-2 bg-[#EBE2D3] border border-gray-100 rounded-lg text-sm text-gold-dark placeholder:text-gold-dark/60 font-medium focus:outline-none focus:ring-2 focus:ring-gold-dark/50"
           />
        </div>
      </div>

      <div className="bg-[#EBE2D3] rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="py-4 px-6">Applicant Name</th>
                <th className="py-4 px-6">Salon Details</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {approvals.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                        {req.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{req.name}</p>
                        <p className="text-xs text-gray-500">
                            {req.createdAt ? `Applied on ${new Date(req.createdAt?.seconds * 1000).toLocaleDateString()}` : 'Date unknown'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-sm font-medium border border-purple-100">
                      {req.name || 'Unknown Salon'}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">{req.mobile || "—"}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => handleAction(req.id, 'approved')}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition-all shadow-sm border border-green-100 opacity-80 group-hover:opacity-100" title="Approve"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleAction(req.id, 'rejected')}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all shadow-sm border border-red-100 opacity-80 group-hover:opacity-100" title="Reject"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {approvals.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    No pending approvals at the moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
