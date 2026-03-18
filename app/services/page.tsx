"use client";

import { Search, Scissors, Plus, MoreVertical, IndianRupee } from "lucide-react";

export default function ServicesPage() {
  const salonsWithServices = [
    {
      id: 1,
      salon: "GK Styles",
      owner: "Gulshan Kumar",
      services: [
        { id: "S1", name: "Hair Wash", price: 200, category: "Hair Care" },
        { id: "S2", name: "Hair Cut", price: 300, category: "Hair Styling" },
      ]
    },
    {
      id: 2,
      salon: "Urban Cut",
      owner: "Ravi Sharma",
      services: [
        { id: "S3", name: "Hair Spa", price: 500, category: "Hair Care" },
        { id: "S4", name: "Beard Trim", price: 150, category: "Grooming" },
      ]
    },
    {
      id: 3,
      salon: "Glow Salon",
      owner: "Neha Verma",
      services: [
        { id: "S5", name: "Facial", price: 800, category: "Skin Care" },
        { id: "S6", name: "Hair Styling", price: 600, category: "Hair Styling" },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gold">Salon Services</h1>
          <p className="text-gold mt-1">Manage and view service catalogs across all salons.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64 group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-300 search-icon-anim" />
             <input
               type="text"
               placeholder="Search services or salons..."
               className="w-full pl-10 pr-4 py-2 bg-[#EBE2D3] border border-gray-100 rounded-lg text-sm text-gold-dark placeholder:text-gold-dark/60 font-medium focus:outline-none focus:ring-2 focus:ring-gold-dark/50"
             />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {salonsWithServices.map((salon) => (
          <div key={salon.id} className="bg-[#EBE2D3] rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Salon Header */}
            <div className="bg-gray-50/50 p-5 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{salon.salon}</h3>
                  <p className="text-xs text-gray-500">Owner: {salon.owner}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-500 bg-white px-2.5 py-1 rounded-md border border-gray-100 shadow-sm">
                {salon.services.length} Services
              </span>
            </div>
            
            {/* Services List */}
            <div className="divide-y divide-gray-100">
              {salon.services.map((service) => (
                <div key={service.id} className="p-5 flex items-center justify-between hover:bg-gray-50/30 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-gold"></span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{service.name}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{service.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="font-bold text-gray-900 flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <IndianRupee className="w-4 h-4 text-gray-400 mr-0.5" /> 
                      {service.price}
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
    </div>
  );
}
