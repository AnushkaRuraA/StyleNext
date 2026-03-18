"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = isPinned || isHovered;
  const isLoginPage = pathname === "/";

  if (isLoginPage) {
    return <main className="flex-1 min-h-screen bg-[#040D15]">{children}</main>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        isPinned={isPinned} 
        setIsPinned={setIsPinned} 
        isHovered={isHovered} 
        setIsHovered={setIsHovered} 
      />
      <div 
        className={clsx(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out font-sans",
          isExpanded ? "ml-64" : "ml-20"
        )}
      >
        <TopNavbar />
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
