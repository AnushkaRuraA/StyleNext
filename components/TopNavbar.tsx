import { Bell, Search, LogOut, User as UserIcon, Settings, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import logger from "@/utils/logger";

export default function TopNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logger.info("Admin logging out...");
    // Clear admin_token cookie
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
    logger.success("Logged out successfully");
  };

  return (
    <header className="h-20 bg-[#EBE2D3] border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm font-sans">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-300 search-icon-anim" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-background-main border-none rounded-full text-sm text-gold-dark placeholder:text-gold-dark/60 font-medium focus:outline-none focus:ring-2 focus:ring-gold/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-500 hover:text-primary transition-colors group">
          <Bell className="w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-gold" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-coral border-2 border-white rounded-full"></span>
        </button>

        {/* Profile with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer pl-4 border-l border-gray-200 group h-10"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-gold/80 font-bold shadow-md transition-colors duration-300 group-hover:text-gold group-hover:bg-primary-dark shrink-0">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800 flex items-center gap-1 group-hover:text-primary transition-colors">
                Admin User <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </span>
              <span className="text-xs text-gray-500">Super Admin</span>
            </div>
          </div>

          {/* Premium Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 bg-[#EBE2D3] border border-gray-200/50 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <div className="px-3 py-2 border-b border-gray-300/30 mb-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Account</p>
              </div>
              
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-white/40 rounded-xl transition-colors group">
                <div className="p-1.5 rounded-lg bg-white/20 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <UserIcon size={16} />
                </div>
                Profile Settings
              </button>

              <div className="h-px bg-gray-300/30 my-1"></div>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50/50 rounded-xl transition-colors group"
              >
                <div className="p-1.5 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                    <LogOut size={16} />
                </div>
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
