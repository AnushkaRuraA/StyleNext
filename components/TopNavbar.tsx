import { Bell, Search, LogOut, User as UserIcon, Settings, ChevronDown, Users, Store, Scissors, X } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import logger from "@/utils/logger";
import { getCustomers, getSalonsWithServices, Customer, SalonWithServices, Service } from "@/services/firestoreService";

type SearchResult = 
  | { type: 'customer', id: string, name: string, sub: string, source: Customer }
  | { type: 'salon', id: string, name: string, sub: string, source: SalonWithServices }
  | { type: 'service', id: string, name: string, sub: string, source: Service & { salonName?: string, salonId?: string } };

export default function TopNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [dataCache, setDataCache] = useState<{ customers: Customer[], salons: SalonWithServices[] } | null>(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchFocus = async () => {
    setIsFocused(true);
    if (!dataCache && !isLoadingSearch) {
      setIsLoadingSearch(true);
      try {
        const [customers, salons] = await Promise.all([
          getCustomers(),
          getSalonsWithServices()
        ]);
        setDataCache({ customers, salons });
      } catch (error) {
        console.error("Error fetching search data:", error);
      } finally {
        setIsLoadingSearch(false);
      }
    }
  };

  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || !dataCache) return [];
    
    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];
    
    // Search Customers
    dataCache.customers.forEach(c => {
      if (
        c.name?.toLowerCase().includes(query) ||
        c.phone?.toLowerCase().includes(query) ||
        c.email?.toLowerCase().includes(query)
      ) {
        results.push({ type: 'customer', id: c.id, name: c.name || 'Unknown', sub: c.phone || c.email || 'Customer', source: c });
      }
    });

    // Search Salons & Services
    dataCache.salons.forEach(s => {
      if (
        s.name?.toLowerCase().includes(query) ||
        s.ownerName?.toLowerCase().includes(query) ||
        s.mobile?.toLowerCase().includes(query)
      ) {
        results.push({ type: 'salon', id: s.id, name: s.name || 'Unknown', sub: s.ownerName ? `Owner: ${s.ownerName}` : 'Salon', source: s });
      }
      
      // Search within this salon's services
      s.servicesList?.forEach(svc => {
        if (svc.name?.toLowerCase().includes(query) || svc.category?.toLowerCase().includes(query)) {
          results.push({ 
            type: 'service', 
            id: svc.id, 
            name: svc.name || 'Unknown', 
            sub: `at ${s.name}`, 
            source: svc 
          });
        }
      });
    });

    return results.slice(0, 8); // Limit to top 8 suggestions
  }, [searchQuery, dataCache]);

  const handleSuggestionClick = (suggestion: SearchResult) => {
    setIsFocused(false);
    setSearchQuery("");
    
    // Navigate with query params to auto-filter on the target page
    if (suggestion.type === 'customer') {
      router.push(`/customers?search=${encodeURIComponent(suggestion.name)}`);
    } else if (suggestion.type === 'salon') {
      router.push(`/salons?search=${encodeURIComponent(suggestion.name)}`);
    } else if (suggestion.type === 'service') {
      router.push(`/services?search=${encodeURIComponent(suggestion.name)}`);
    }
  };

  const handleLogout = () => {
    logger.info("Admin logging out...");
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/");
    logger.success("Logged out successfully");
  };

  return (
    <header className="h-20 bg-[#EBE2D3] border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm font-sans">
      <div className="flex items-center gap-4 w-96 relative" ref={searchContainerRef}>
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-300 search-icon-anim" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            placeholder="Search owners, customers, services..."
            className="w-full pl-10 pr-10 py-2 bg-background-main border-none rounded-full text-sm text-gold-dark placeholder:text-gold-dark/60 font-medium focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(""); setIsFocused(true); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Search Suggestions Dropdown */}
        {isFocused && searchQuery.trim().length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto animate-in fade-in slide-in-from-top-2">
            {isLoadingSearch ? (
              <div className="p-4 text-center text-sm text-gray-500">Loading search data...</div>
            ) : suggestions.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">No results found for "{searchQuery}"</div>
            ) : (
              <ul className="py-2">
                {suggestions.map((item, idx) => (
                  <li key={`${item.type}-${item.id}-${idx}`}>
                    <button
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        {item.type === 'customer' && <Users className="w-4 h-4" />}
                        {item.type === 'salon' && <Store className="w-4 h-4" />}
                        {item.type === 'service' && <Scissors className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-semibold text-gray-800 truncate">{item.name}</span>
                        <span className="text-xs text-gray-500 truncate">{item.sub}</span>
                      </div>
                      <div className="ml-auto flex-shrink-0">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 px-2 py-1 bg-gray-100 rounded-full">
                          {item.type}
                        </span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
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
