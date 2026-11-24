import { useAuth } from "@/context/AuthContext";
import React from "react";

interface AdminHeaderProps {
  onOpenSidebar: () => void;
  breadcrumb?: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onOpenSidebar, breadcrumb }) => {
  const { user } = useAuth();
  
  if(user?.username) {
    return;
  }
  const splitUsername = user?.username.trim().split(" ");
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200/80 bg-[#FAF9F6]/95 px-5 backdrop-blur-xs sm:px-8">
      {/* Left: Mobile Sidebar Toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex items-center justify-center rounded-lg p-2 text-[#182B20] hover:bg-stone-200/60 lg:hidden"
          aria-label="Open sidebar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="hidden items-center gap-2 text-xs sm:flex">
            <span className="text-[#7D8A83]">Admin workspace</span>
            <span className="text-[#A3AFA8]">&gt;</span>
            <span className="font-semibold text-[#182B20]">{breadcrumb}</span>
          </nav>
        )}
      </div>

      {/* Right: Search + Notification + Profile */}
      <div className="flex items-center gap-3.5">
        {/* Global Search Input */}
        {/* <div className="relative hidden md:block">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#8C9892]"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path strokeLinecap="round" d="M10.5 10.5L13.5 13.5" />
          </svg>
          <input
            type="text"
            placeholder="Search anything..."
            className="w-56 rounded-full border border-stone-200 bg-white py-1.5 pr-11 pl-8 text-xs text-[#182B20] placeholder:text-[#8C9892] focus:border-[#2C4C3B] focus:outline-none"
          />
          <kbd className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded border border-stone-200 bg-[#FAF9F6] px-1.5 py-0.5 text-[10px] font-medium text-[#7D8A83]">
            ⌘ K
          </kbd>
        </div> */}

        {/* Notification Bell */}
        {/* <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-full p-2 text-[#5A6560] transition-colors hover:bg-stone-200/50 hover:text-[#182B20]"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 3a4.5 4.5 0 00-4.5 4.5v2.7c0 .6-.2 1.2-.6 1.7L4 13h12l-.9-1.1a2.7 2.7 0 01-.6-1.7V7.5A4.5 4.5 0 0010 3zM8.5 15.5a1.5 1.5 0 003 0"
            />
          </svg>
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </button> */}

        {/* Profile Badge */}
        <div className="flex items-center gap-3 border-l border-stone-200/80 pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E6EDE4] text-xs font-semibold text-[#2C4C3B]">
            {splitUsername?.map((item) => (
              item.charAt(0)
            ))}
          </div>
          <div className="text-left leading-tight">
            <p className="text-xs font-semibold text-[#182B20]">{user?.username}</p>
            <p className="text-[10px] text-[#6E7A74]">{user?.email}</p>
          </div>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="ml-1 h-3.5 w-3.5 text-[#6E7A74]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;