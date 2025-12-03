import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-800 px-6 sm:px-10 lg:px-20 py-3 transition-all ${
        scrolled
          ? "bg-[#102218] backdrop-blur-md"
          : "bg-[#102218] backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 text-[#11d462]">
            <svg fill="none" viewBox="0 0 48 48">
              <path
                d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h2 className="text-lg font-bold tracking-tight text-white">
            SynCode AI
          </h2>
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex gap-8 text-sm font-medium absolute left-1/2 transform -translate-x-1/2">
          <a
            href="#features"
            className="text-white hover:text-[#11d462] transition"
          >
            Features
          </a>
          <a
            href="#howitworks"
            className="text-white hover:text-[#11d462] transition"
          >
            How It Works
          </a>
          <a
            href="#comparison"
            className="text-white hover:text-[#11d462] transition"
          >
            Comparison
          </a>
          <a
            href="#security"
            className="text-white hover:text-[#11d462] transition"
          >
            Security
          </a>
        </nav>

        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            className="hover:scale-110 hover:bg-yellow-500"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            size="sm"
            className="border-primary text-white bg-[#11d462] hover:scale-110 hover:bg-[#14e96d]"
          >
            Request Demo
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
