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
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";
import { useState, useRef } from "react";

// Custom SVG component with independently animatable blades
const CustomScissorsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={clsx("overflow-visible", className)}>
    <circle cx="12" cy="12" r="1" className="fill-current pointer-events-none" />
    <g className="origin-center hover-animate-snip-left">
      <circle cx="6" cy="18" r="3" />
      <path d="M8.12 15.88L19 4" />
    </g>
    <g className="origin-center hover-animate-snip-right">
      <circle cx="18" cy="18" r="3" />
      <path d="M15.88 15.88L5 4" />
    </g>
  </svg>
);

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard, animationClass: "hover-animate-dashboard" },
  { name: "Approvals", href: "/approvals", icon: ClipboardCheck, animationClass: "hover-animate-clipboard" },
  { name: "Customers", href: "/customers", icon: Users, animationClass: "hover-animate-users" },
  { name: "Salons", href: "/salons", icon: Store, animationClass: "hover-animate-store" },
  { name: "Appointments", href: "/appointments", icon: CalendarDays, animationClass: "hover-animate-calendar" },
  { name: "Payments", href: "/payments", icon: CreditCard, animationClass: "hover-animate-card" },
  { name: "Services", href: "/services", icon: CustomScissorsIcon, animationClass: "" },
  { name: "Reports", href: "/analytics", icon: BarChart3, animationClass: "hover-animate-chart" },
  { name: "Reviews", href: "/reviews", icon: Star, animationClass: "hover-animate-star" },
];

interface SidebarProps {
  isPinned: boolean;
  setIsPinned: (val: boolean) => void;
  isHovered: boolean;
  setIsHovered: (val: boolean) => void;
}

export default function Sidebar({ isPinned, setIsPinned, isHovered, setIsHovered }: SidebarProps) {
  const pathname = usePathname();
  const hoverEnabledRef = useRef(true);

  const isExpanded = isPinned || isHovered;

  const handleMouseEnter = () => {
    if (hoverEnabledRef.current) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={clsx(
        "bg-[#EBE2D3] border-r border-gray-100 text-gray-700 h-screen fixed left-0 top-0 flex flex-col shadow-sm transition-all duration-300 ease-in-out z-20 overflow-hidden",
        isExpanded ? "w-64" : "w-20"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="py-4 flex flex-col items-center justify-center border-b border-gray-100 min-h-[140px] relative">
        {/* Toggle Button */}
        <button
          onClick={() => {
            if (isPinned) {
              setIsHovered(false);
              hoverEnabledRef.current = false;
              setTimeout(() => {
                hoverEnabledRef.current = true;
              }, 300);
            }
            setIsPinned(!isPinned);
          }}
          className="absolute top-4 left-4 p-1 rounded-md text-gray-400 hover:text-primary hover:bg-primary/5 transition-colors z-10"
          title={isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
        >
          <div className="relative w-5 h-5">
            <Menu
              className={clsx(
                "absolute inset-0 transition-all duration-300 transform",
                isPinned ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
              )}
            />
            <X
              className={clsx(
                "absolute inset-0 transition-all duration-300 transform",
                isPinned ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
              )}
            />
          </div>
        </button>

        {/* Custom SVG Logo to match user's image */}
        <div className={clsx("relative transition-all duration-300 mt-8", isExpanded ? "w-16 h-16" : "w-10 h-10")}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="42" stroke="#BA6A58" strokeWidth="2.5" fill="transparent" />
            <path d="M 49 8 C 43 4, 38 7, 42 16 C 47 12, 51 8, 49 8 Z" fill="#B28D5A" />
            <path d="M 51 8 C 57 4, 62 7, 58 16 C 53 12, 49 8, 51 8 Z" fill="#B28D5A" />
            <text x="56" y="68" fontFamily="Georgia, serif" fontSize="48" fill="#B28D5A" fontWeight="bold" textAnchor="middle">N</text>
            <text x="44" y="68" fontFamily="Georgia, serif" fontSize="48" fill="#0F2E4A" fontWeight="bold" textAnchor="middle">S</text>
            <path d="M -5 55 Q 25 40, 50 55 T 105 55" stroke="#0F2E4A" strokeWidth="4" strokeLinecap="round" fill="transparent" />
          </svg>
        </div>

        <div className={clsx("flex flex-col items-center transition-all duration-300 overflow-hidden", isExpanded ? "h-14 opacity-100 mt-1" : "h-0 opacity-0 mt-0")}>
          <h1 className="text-xl font-serif text-primary tracking-tight whitespace-nowrap" style={{ fontFamily: "Georgia, serif" }}>
            StyleNext
          </h1>
          <div className="mt-1 mb-2 w-full px-6 h-6 flex items-center justify-center">
            <div className="relative w-full h-full pointer-events-none">

              {/* 1. Hardware accelerated Line tracking */}
              <div className="absolute top-1/2 left-0 right-0 h-[0.5px] bg-primary -translate-y-1/2 animate-line-cut" />

              {/* 2. Hardware accelerated Scissor tracking */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 text-primary animate-scissor-move z-10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full overflow-visible transform rotate-90">
                  <circle cx="12" cy="12" r="1" className="fill-current" />
                  <g className="animate-scissor-left origin-center">
                    <circle cx="6" cy="18" r="3" />
                    <path d="M8.12 15.88L19 4" />
                  </g>
                  <g className="animate-scissor-right origin-center">
                    <circle cx="18" cy="18" r="3" />
                    <path d="M15.88 15.88L5 4" />
                  </g>
                </svg>
              </div>

            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6" style={{ scrollbarWidth: 'none' }}>
        <ul className="space-y-2 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={clsx(
                    "flex items-center rounded-xl transition-all duration-200 font-medium relative group",
                    isExpanded ? "px-4 py-3 gap-3" : "justify-center p-3",
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-gold-dark hover:bg-white/60 hover:text-primary"
                  )}
                  title={!isExpanded ? item.name : undefined}
                >
                  <Icon className={clsx(
                    "w-5 h-5 flex-shrink-0 transition-colors",
                    isActive ? "text-white" : "text-gold-dark group-hover:text-primary",
                    item.animationClass
                  )}
                  />
                  <span className={clsx(
                    "whitespace-nowrap transition-all duration-300",
                    isExpanded ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 -translate-x-4 overflow-hidden"
                  )}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={clsx(
        "p-4 text-xs text-gray-400 text-center border-t border-gray-100 whitespace-nowrap transition-all duration-300",
        isExpanded ? "opacity-100" : "opacity-0 hidden"
      )}>
        &copy; {new Date().getFullYear()} StyleNext Admin
      </div>
    </div>
  );
}

