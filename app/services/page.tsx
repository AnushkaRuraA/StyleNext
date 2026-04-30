"use client";

import React, { useState, useEffect } from "react";
import { Search, Scissors, MoreVertical, IndianRupee } from "lucide-react";
import { getSalonsWithServices, SalonWithServices } from "@/services/firestoreService";

export default function ServicesPage() {
  const [salons, setSalons] = useState<SalonWithServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("search");
    if (q) setSearch(q);
  }, []);

  useEffect(() => {
    async function load() {
      const data = await getSalonsWithServices();
      setSalons(data);
      setIsLoading(false);
    }
    load();
  }, []);

  const filtered = salons.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.servicesList.some(svc => svc.name?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold">Salon Services</h1>
          <p className="text-gold mt-1">Manage and view service catalogs across all salons.</p>
        </div>
        <div className="relative w-full sm:w-64 group">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-300 search-icon-anim" />
           <input
             type="text"
             placeholder="Search services or salons..."
             value={search}
             onChange={e => setSearch(e.target.value)}
             className="w-full pl-10 pr-4 py-2 bg-[#EBE2D3] border border-gray-100 rounded-lg text-sm text-gold-dark placeholder:text-gold-dark/60 font-medium focus:outline-none focus:ring-2 focus:ring-gold-dark/50"
           />
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-gray-400">Loading services...</div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          {search ? `No results for "${search}"` : "No services found in Firebase."}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filtered.map((salon) => (
            <div key={salon.id} className="bg-[#EBE2D3] rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Salon Header */}
              <div className="bg-gray-50/50 p-5 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{salon.name}</h3>
                    <p className="text-xs text-gray-500">Owner: {salon.ownerName}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-white px-2.5 py-1 rounded-md border border-gray-100 shadow-sm">
                  {salon.servicesList.length} Services
                </span>
              </div>

              {/* Services List */}
              <div className="divide-y divide-gray-100">
                {salon.servicesList.length === 0 ? (
                  <p className="p-5 text-sm text-gray-400">No services listed yet.</p>
                ) : salon.servicesList.map((service) => (
                  <div key={service.id} className="p-5 flex items-center justify-between hover:bg-gray-50/30 transition-colors group">
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <span className={`inline-block w-2 h-2 rounded-full ${service.isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{service.name || "Unnamed"}</h4>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {service.duration ? `${service.duration} min` : "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="font-bold text-gray-900 flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <IndianRupee className="w-4 h-4 text-gray-400 mr-0.5" />
                        {service.price ?? "—"}
                      </div>
                      <button className="text-gray-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
