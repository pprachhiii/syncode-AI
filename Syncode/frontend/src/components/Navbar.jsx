import React from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-4 sm:px-8 md:px-16 lg:px-24 py-3">
      <div className="flex items-center gap-4 text-slate-900 dark:text-white">
        {/* Logo */}
        <div className="w-8 h-8 text-primary text-blue-500">
          <svg
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Heading updated to Blue */}
        <h2 className="text-lg font-bold tracking-tight text-[#007BFF]">
          SynCode AI
        </h2>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Login
        </Button>
        <Button variant="default" size="sm">
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
