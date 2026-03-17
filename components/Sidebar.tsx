"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  Store,
  CalendarDays,
  CreditCard,
  Scissors,
  BarChart3,
  Star,
} from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Pending Approvals", href: "/approvals", icon: ClipboardCheck },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Salon Owners", href: "/salons", icon: Store },
  { name: "Appointments", href: "/appointments", icon: CalendarDays },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Services", href: "/services", icon: Scissors },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Reviews", href: "/reviews", icon: Star },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-card border-r border-gray-100 text-gray-700 h-screen fixed left-0 top-0 flex flex-col shadow-sm">
      <div className="py-4 px-4 text-center border-b border-gray-100 flex flex-col items-center justify-center">
        {/* Custom SVG Logo to match user's image */}
        <div className="relative w-16 h-16">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Circle (Coral) */}
            <circle cx="50" cy="50" r="42" stroke="#BA6A58" strokeWidth="2.5" fill="transparent" />

            {/* Leaves (Gold) */}
            <path d="M 49 8 C 43 4, 38 7, 42 16 C 47 12, 51 8, 49 8 Z" fill="#B28D5A" />
            <path d="M 51 8 C 57 4, 62 7, 58 16 C 53 12, 49 8, 51 8 Z" fill="#B28D5A" />

            {/* S and N Letters */}
            {/* The N is behind */}
            <text x="56" y="68" fontFamily="Georgia, serif" fontSize="48" fill="#B28D5A" fontWeight="bold" textAnchor="middle">N</text>
            {/* The S is slightly in front and offset */}
            <text x="44" y="68" fontFamily="Georgia, serif" fontSize="48" fill="#0F2E4A" fontWeight="bold" textAnchor="middle">S</text>

            {/* Wavy line crossing the letters */}
            <path d="M -5 55 Q 25 40, 50 55 T 105 55" stroke="#0F2E4A" strokeWidth="4" strokeLinecap="round" fill="transparent" />
          </svg>
        </div>

        <h1 className="text-xl font-serif text-primary tracking-tight mt-1" style={{ fontFamily: "Georgia, serif" }}>
          StyleNext
        </h1>
        <div className="mt-1 mb-2 flex gap-2 items-center justify-center">
          <div className="h-[0.5px] bg-primary/20 w-4"></div>
          <Scissors className="w-3 h-3 text-primary transform rotate-90" />
          <div className="h-[0.5px] bg-primary/20 w-4"></div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className={clsx("w-5 h-5", isActive ? "text-white" : "text-gray-400")} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 text-xs text-gray-400 text-center border-t border-gray-100">
        &copy; {new Date().getFullYear()} StyleNext Admin
      </div>
    </div>
  );
}

