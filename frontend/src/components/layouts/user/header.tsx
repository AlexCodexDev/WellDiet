import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "./container";

const navItems = [
  { label: "Home", to: "/" },
{ label: "Diet Plans", to: "/diet-plans" },
{ label: "Testimonials", to: "/about#testimonials" },
{ label: "About Us", to: "/about" },
{ label: "Contact", to: "/#contact" },
];

export const WellDietLogo: React.FC<{ size?: "sm" | "md" }> = ({ size = "md" }) => {
  const iconSize = size === "sm" ? "h-5 w-5" : "h-6 w-6";
  const textSize = size === "sm" ? "text-base" : "text-xl";

  return (
    <span className="inline-flex items-center gap-2">
      <svg
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={iconSize}
        aria-hidden="true"
      >
        {/* Left leaf */}
        <path
          d="M13.5 22C9.2 21.5 5.5 18 5 13C8.8 13.2 12.2 15.8 13.5 22Z"
          fill="#A3BFA8"
          stroke="#5C7C64"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Right leaf */}
        <path
          d="M14.5 22C18.8 21.5 22.5 18 23 13C19.2 13.2 15.8 15.8 14.5 22Z"
          fill="#A3BFA8"
          stroke="#5C7C64"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Center sprout leaf */}
        <path
          d="M14 21.5C11.2 17.5 11.2 11.5 14 6.5C16.8 11.5 16.8 17.5 14 21.5Z"
          fill="#DCE7DE"
          stroke="#5C7C64"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`font-serif font-bold tracking-tight text-[#182B20] ${textSize}`}>
        Well Diet
      </span>
    </span>
  );
};

export const Header: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#FAF9F6]/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="transition-opacity hover:opacity-90">
            <WellDietLogo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const isAnchor = item.to.startsWith("/#");
              if (isAnchor) {
                return (
                  <a
                    key={item.label}
                    href={item.to}
                    className="text-sm font-normal text-[#5A6560] transition-colors hover:text-[#182B20]"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`text-sm transition-colors ${
                    isActive(item.to)
                      ? "font-semibold text-[#182B20]"
                      : "font-normal text-[#5A6560] hover:text-[#182B20]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-[#182B20] hover:bg-stone-200/50 md:hidden"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="border-t border-stone-200/80 py-4 md:hidden">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm ${
                    isActive(item.to) ? "font-semibold text-[#182B20]" : "text-[#5A6560]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;