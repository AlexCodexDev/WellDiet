import React from "react";
import { Link } from "react-router-dom";
import Container from "./container";
import { WellDietLogo } from "./header";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-200/80 bg-[#FAF9F6] py-8 sm:py-10">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          {/* Left Brand & Tagline */}
          <div>
            <Link to="/" className="inline-block transition-opacity hover:opacity-90">
              <WellDietLogo size="sm" />
            </Link>
            <p className="mt-1.5 text-xs text-[#6E7A74]">
              Expert nutrition for every lifestyle.
            </p>
          </div>

          {/* Right Legal & Copyright */}
          <div className="space-y-1 text-xs text-[#6E7A74] sm:text-right">
            <p>
              Individual results may vary. Consult a professional dietitian before beginning any
              radical diet regime.
            </p>
            <p>© 2026 Well Diet. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;