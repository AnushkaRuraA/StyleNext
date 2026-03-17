"use client";

import { Bell, Search } from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="h-20 bg-card border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-background-main border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-primary transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute 0 right-0 w-2.5 h-2.5 bg-coral border-2 border-white rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 cursor-pointer pl-4 border-l border-gray-200">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">Admin User</span>
            <span className="text-xs text-gray-500">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
