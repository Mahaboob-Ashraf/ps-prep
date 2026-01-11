import React from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  return (
    // Height is fixed (h-24) to give enough space for the fade to happen
    <nav className="fixed top-0 left-0 right-0 z-30 h-24 pointer-events-none">
      {/* 1. The Background Layer (Faded Bottom Edge) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/50 to-transparent backdrop-blur-md"
        style={{
          // This mask ensures the background is solid at top, but fades out completely at the bottom
          maskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
        }}
      />

      {/* 2. The Content Layer (Fully Visible & Interactive) */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 pointer-events-auto">
        {/* Left: Hamburger & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <Menu size={24} />
          </button>
          <Link
            to="/"
            className="text-xl font-bold text-white tracking-tighter"
          >
            PS-Prep
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link
            to="/about"
            className="hover:text-white transition hover:underline underline-offset-4 px-10"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
