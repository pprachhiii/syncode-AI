import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Home = () => {
  const securityFeatures = [
    { title: "HIPAA-Compliant", icon: "🛡️" },
    { title: "256-bit AES Encryption", icon: "🔒" },
    { title: "Role-Based Access", icon: "👥" },
    { title: "Tamper-Proof Audit Logs", icon: "📜" },
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-12 mt-4">
        <div className="relative rounded-xl overflow-hidden">
          {/* VIDEO BACKGROUND */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/src/assets/hero-video.mp4" type="video/mp4" />
          </video>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-[rgba(16,29,34,0.75)]"></div>

          {/* CONTENT */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center min-h-[500px] text-center">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[#11d462] text-4xl sm:text-5xl font-black max-w-4xl leading-tight"
            >
              Automated Medical Coding & Audit for India’s Insurance Workflows
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white text-lg mt-4 text-#11d462"
            >
              Upload, automate, accelerate
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 mt-6 flex-wrap justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.08, x: 3 }} // small push animation
                transition={{ type: "spring", stiffness: 250, damping: 15 }}
                className="
                  border-primary 
                  text-primary 
                  px-6 py-3 
                  rounded-md 
                  flex items-center gap-2 
                  transition-all duration-300 
                  group
                  hover:bg-#11d462
                "
              >
                Get Started
                <span className="transform transition-all duration-300 group-hover:translate-x-2">
                  ➜
                </span>
              </motion.button>

              <Button
                variant="default"
                size="lg"
                className="hover:scale-110 transition-transform w-full sm:w-auto border-primary"
              >
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 relative">
            {/* vertical divider */}
            <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px bg-border"></div>

            {/* Manual side */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-600 text-2xl">⚠️</span>
                </div>
                <h3 className="text-2xl font-semibold text-primary">
                  Manual Coding (Current Workflow)
                </h3>
              </div>

              <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">
                      Document: Discharge Summary
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ~420 pages (scanned)
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Team effort • multi-day
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  Typical problems:
                  <ul className="list-disc ml-5 mt-2">
                    <li>Missed diagnosis mentions (low recall)</li>
                    <li>Ambiguous coding due to lack of provenance</li>
                    <li>No insurer-policy mapping during coding</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="text-red-600">⚠</div>
                    <div>
                      <div className="text-sm font-semibold text-red-700">
                        Example error found manually:
                      </div>
                      <div className="text-sm text-red-600">
                        Assigned ICD: J11 (Influenza) - evidence points to A90
                        (Dengue) instead.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SynCode AI side */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 text-2xl">🧠</span>
                </div>
                <h3 className="text-2xl font-semibold text-primary">
                  SynCode AI - Extraction & Audit Support
                </h3>
              </div>

              <div className="bg-card border border-primary/50 rounded-xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Automated Run</div>
                    <div className="text-sm text-muted-foreground">
                      Processed: 420 pages • streaming results
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Pipeline: NLP → Code Mapping → Audit Support
                  </div>
                </div>

                {/* Confidence + Action row */}
                <div>
                  <div>
                    <div className="text-sm font-medium">
                      Overall Extraction Confidence
                    </div>

                    <div className="mt-2">
                      <div className="w-full bg-[#1a1a1a] h-2 rounded overflow-hidden">
                        <div
                          className="h-2"
                          style={{ width: "92%", backgroundColor: "#11d462" }}
                        />
                      </div>
                      <div className="text-xs text-right text-muted-foreground mt-1">
                        92%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Extracted codes chips */}
                <div>
                  <div className="text-sm font-medium mb-2">
                    Top Extracted ICDs (with provenance)
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-background rounded border text-xs">
                      A90 - Dengue (sentence#234)
                    </span>
                    <span className="px-2 py-1 bg-background rounded border text-xs">
                      E11 - Type 2 Diabetes (sentence#45)
                    </span>
                    <span className="px-2 py-1 bg-background rounded border text-xs">
                      I10 - Hypertension (sentence#12)
                    </span>
                  </div>
                </div>

                {/* Audit summary */}
                <div className="bg-muted/30 rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">
                        Automated Audit Findings
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Flags for human review: 3
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Time saved vs manual: ~85%
                    </div>
                  </div>

                  <ul className="mt-3 space-y-2 text-sm">
                    <li>
                      • <strong>Low Confidence:</strong> 2 codes under 60%
                      confidence (needs human check)
                    </li>
                    <li>
                      • <strong>Possible Mismatch:</strong> 1 code lacks clear
                      sentence evidence
                    </li>
                    <li>
                      • <strong>Data Completeness:</strong> 1 entry requires
                      review to ensure all tests/procedures captured
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Cards */}
      <section className="px-4 py-16 sm:px-6 lg:px-12 bg-background-dark rounded-xl">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary text-3xl font-bold"
          >
            Your Data’s Security is Our Priority
          </motion.h2>
          <p className="text-slate-400 text-lg mt-2 mb-12">
            Committed to highest standards of privacy.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {securityFeatures.map((feature, idx) => (
              <div key={idx} className="group perspective w-full h-48">
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 bg-background-dark border border-border rounded-xl flex flex-col items-center justify-center p-6 shadow-lg [backface-visibility:hidden]">
                    <div className="text-4xl mb-2">{feature.icon}</div>
                    <h3 className="font-bold text-primary">{feature.title}</h3>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 bg-background-dark border border-border rounded-xl p-4 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <p className="text-primary text-sm text-center">
                      Detailed information about this feature goes here.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>
          {`
            .perspective {
              perspective: 1000px;
            }
          `}
        </style>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
