"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import clsx from "clsx";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = isPinned || isHovered;

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
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
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
