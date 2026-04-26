"use client";

import React, { useState, useEffect } from "react";
import { Search, MoreVertical, MapPin } from "lucide-react";
import { getSalons, Salon } from "@/services/firestoreService";

export default function SalonsPage() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getSalons();
      setSalons(data);
      setIsLoading(false);
    }
    load();
  }, []);

  const filtered = salons.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.ownerName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold">Salon Owners</h1>
          <p className="text-gold mt-1">Manage approved salons and their performance.</p>
        </div>
        <div className="relative w-full sm:w-64 group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-300 search-icon-anim" />
           <input
             type="text"
             placeholder="Search salons..."
             value={search}
             onChange={e => setSearch(e.target.value)}
             className="w-full pl-10 pr-4 py-2 bg-[#EBE2D3] border border-gray-100 rounded-lg text-sm text-gold-dark placeholder:text-gold-dark/60 font-medium focus:outline-none focus:ring-2 focus:ring-gold-dark/50"
           />
        </div>
      </div>

      <div className="bg-[#EBE2D3] rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <th className="py-4 px-6">Salon & Owner</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan={5} className="py-12 text-center text-gray-400">Loading salons...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-gray-500">
                  {search ? `No salons found for "${search}"` : "No salons found in Firebase."}
                </td></tr>
              ) : filtered.map((salon) => (
                <tr key={salon.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-bold text-gray-900">{salon.name}</p>
                      <p className="text-sm text-gray-500 mt-0.5">by {salon.ownerName}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                      {(salon as any).addressStr || "—"}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">{salon.mobile || "—"}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      salon.salonStatus === "open"
                        ? "bg-green-50 text-green-700 border-green-100"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}>
                      {salon.salonStatus ? salon.salonStatus.charAt(0).toUpperCase() + salon.salonStatus.slice(1) : "Active"}
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
