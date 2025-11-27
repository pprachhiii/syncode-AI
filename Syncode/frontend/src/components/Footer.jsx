import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-t border-slate-200/80 dark:border-slate-800/80 h-32">
      {/* Main content*/}
      <div className="absolute bottom-4 inset-x-0 flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6">
        {/* Links*/}
        <div className="flex flex-wrap justify-start gap-6">
          {["Terms of Use", "Privacy Policy", "Support"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#007BFF] dark:hover:text-[#007BFF] transition-all duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Copyright*/}
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-right">
          &copy; 2025 SynCode AI
        </p>
      </div>

      {/* Watermark */}
      <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
        <span
          className="text-6xl sm:text-8xl font-extrabold uppercase tracking-widest"
          style={{ color: "rgba(74, 144, 226, 0.15)" }}
        >
          SYNCODE AI
        </span>
      </div>
    </footer>
  );
};

export default Footer;
