import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-background-dark/80 backdrop-blur-sm border-t border-slate-800 h-32">
      <div className="absolute bottom-4 inset-x-0 flex flex-col md:flex-row items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex flex-wrap justify-start gap-6">
          {["Terms of Use", "Privacy Policy", "Support"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-medium text-slate-400 hover:text-primary transition-all duration-300"
            >
              {link}
            </a>
          ))}
        </div>
        <p className="text-sm text-slate-400 text-center md:text-right">
          &copy; 2025 SynCode AI
        </p>
      </div>

      {/* Watermark */}
      <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
        <span
          className="text-6xl sm:text-8xl font-extrabold uppercase tracking-widest"
          style={{ color: "rgba(17, 212, 98, 0.15)" }}
        >
          SYNCODE AI
        </span>
      </div>
    </footer>
  );
};

export default Footer;
