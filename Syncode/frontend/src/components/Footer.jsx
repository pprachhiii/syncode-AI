import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-background-dark/80 backdrop-blur-sm border-t border-slate-800 py-10">
      <div className="flex flex-col items-center text-center gap-3 px-4">
        <p className="text-sm text-primary-foreground/80">
          Questions? Email us at{" "}
          <a
            href="mailto:sales@medcodepro.com"
            className="underline hover:text-primary-foreground"
          >
            prachiiyadav2409@gmail.com
          </a>
        </p>

        {/* Copyright */}
        <p className="text-sm text-slate-400">&copy; 2025 SynCode AI</p>
      </div>

      {/* WATERMARK */}
      <div className="mt-6 text-center pointer-events-none">
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
