import React from "react";
import { Link, useLocation } from "react-router-dom";
import promoBowlImg from "../../../assets/login-bowl.png";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const workspaceMenu = [
  {
    label: "Overview",
    to: "/admin/dashboard",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
        <rect x="3" y="3" width="5.5" height="5.5" rx="1.2" />
        <rect x="11.5" y="3" width="5.5" height="5.5" rx="1.2" />
        <rect x="3" y="11.5" width="5.5" height="5.5" rx="1.2" />
        <rect x="11.5" y="11.5" width="5.5" height="5.5" rx="1.2" />
      </svg>
    ),
  },
  {
    label: "Categories",
    to: "/admin/categories",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7a3 3 0 11-6 0 3 3 0 016 0zM4 16.5a5.5 5.5 0 0112 0"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 9.5a2.5 2.5 0 010 5" />
      </svg>
    ),
  },
  {
    label: "Rules & Fact",
    to: "/admin/rules",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7a3 3 0 11-6 0 3 3 0 016 0zM4 16.5a5.5 5.5 0 0112 0"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 9.5a2.5 2.5 0 010 5" />
      </svg>
    ),
  },
  {
    label: "Reports",
    to: "/admin/reports",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 2.5h5.5L15 6v11.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-14a1 1 0 011-1z"
        />
        <path strokeLinecap="round" d="M8 10h4M8 13h4" />
      </svg>
    ),
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
        <circle cx="10" cy="10" r="2.5" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 3v1.5m0 11V17m7-7h-1.5m-11 0H3m11.95-4.95l-1.06 1.06m-7.78 7.78l-1.06 1.06m9.9 0l-1.06-1.06M6.11 6.11L5.05 5.05"
        />
      </svg>
    ),
  },
  {
    label: "Problems",
    to: "/admin/problems",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
        <circle cx="10" cy="10" r="7.5" />
        <path strokeLinecap="round" d="M10 6.5v4M10 13.5h.01" />
      </svg>
    ),
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onClose }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname === "/admin/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <aside className="flex h-full w-60 flex-col justify-between border-r border-stone-200/80 bg-[#F4F6F1] px-4 py-5">
      {/* Top Section: Brand + Navigation */}
      <div>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 px-2">
          <svg viewBox="0 0 28 28" fill="none" className="h-6 w-6" aria-hidden="true">
            <path
              d="M13.5 22C9.2 21.5 5.5 18 5 13C8.8 13.2 12.2 15.8 13.5 22Z"
              fill="#A3BFA8"
              stroke="#5C7C64"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M14.5 22C18.8 21.5 22.5 18 23 13C19.2 13.2 15.8 15.8 14.5 22Z"
              fill="#A3BFA8"
              stroke="#5C7C64"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M14 21.5C11.2 17.5 11.2 11.5 14 6.5C16.8 11.5 16.8 17.5 14 21.5Z"
              fill="#DCE7DE"
              stroke="#5C7C64"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-serif text-lg font-bold tracking-tight text-[#182B20]">
            Well Diet
          </span>
        </Link>

        {/* Workspace Menu */}
        <div className="mt-7">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7D8A83]">
            Workspace
          </p>
          <nav className="mt-2.5 space-y-1">
            {workspaceMenu.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-[#2C4C3B] text-white shadow-2xs"
                      : "text-[#5A6560] hover:bg-[#E7ECE2] hover:text-[#182B20]"
                  }`}
                >
                  <span className={active ? "text-white" : "text-[#6E7A74]"}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section: Promo Card + Help + System Status */}
      <div className="space-y-4 pt-6">
        {/* Promo Card */}
        <div className="overflow-hidden rounded-2xl border border-stone-200/80 bg-[#E6EDE4]">
          <div className="h-24 w-full">
            <img
              src={promoBowlImg}
              alt="A season to nourish"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="p-3.5">
            <h4 className="font-serif text-sm font-medium text-[#182B20]">
              A season to nourish.
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed text-[#5A6560]">
              Fresh ideas for your members&apos; everyday wellbeing.
            </p>
            <Link
              to="/diet-plans"
              className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#2C4C3B] hover:underline"
            >
              <span>Explore the library</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        {/* Help & System Status */}
        <div className="space-y-2.5 border-t border-stone-200/80 pt-3.5 text-xs text-[#5A6560]">
          <Link
            to="/#contact"
            className="flex items-center gap-2.5 px-2 py-1 transition-colors hover:text-[#182B20]"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-4 w-4">
              <circle cx="10" cy="10" r="7.5" />
              <path strokeLinecap="round" d="M8.5 8a1.6 1.6 0 013.1.5c0 1.1-1.6 1.5-1.6 2.5m0 2.5h.01" />
            </svg>
            <span>Help &amp; resources</span>
          </Link>

          <div className="flex items-center gap-2.5 px-2 py-1 text-[11px] text-[#5A6560]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>All systems healthy</span>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block lg:shrink-0">{sidebarContent}</div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-2xs"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};

export default Sidebar;