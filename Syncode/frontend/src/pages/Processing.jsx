import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, FileText, CheckCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/common/Navbar";

const PIPELINES = {
  audit: [
    { name: "Virus Scan", description: "Checking uploaded files for threats" },
    { name: "OCR Processing", description: "Extracting text from documents" },
    {
      name: "Medical Entity Extraction",
      description: "Identifying diagnoses, procedures, and codes",
    },
    {
      name: "Audit Verification",
      description: "Validating codes against medical evidence",
    },
  ],

  compliance: [
    { name: "Virus Scan", description: "Checking uploaded files for threats" },
    { name: "OCR Processing", description: "Extracting text from documents" },
    {
      name: "Policy Rule Validation",
      description: "Applying insurer-specific rules",
    },
    {
      name: "Regulatory Compliance Check",
      description: "Ensuring IRDAI & policy compliance",
    },
  ],

  "full-pipeline": [
    { name: "Virus Scan", description: "Checking uploaded files for threats" },
    { name: "OCR Processing", description: "Extracting text from documents" },
    {
      name: "Medical Entity Extraction",
      description: "Identifying diagnoses and procedures",
    },
    {
      name: "Audit Verification",
      description: "Cross-checking codes with evidence",
    },
    {
      name: "Policy Compliance Check",
      description: "Final policy & regulatory validation",
    },
  ],
};

const SERVICE_LABELS = {
  audit: "Audit Only",
  compliance: "Policy & Regulatory Compliance",
  "full-pipeline": "Full Pipeline (Extraction + Audit + Compliance)",
};

export function ProcessingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const serviceType = location.state?.serviceType;

  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // 🔒 Safety: redirect if user refreshes page
  useEffect(() => {
    if (!serviceType) {
      navigate("/upload");
    }
  }, [serviceType, navigate]);

  const steps = PIPELINES[serviceType] || [];

  // ⏳ Simulate processing
  useEffect(() => {
    let progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);

    let stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, 2000);

    let finishTimer = setTimeout(() => {
      if (serviceType === "audit") navigate("/results/audit");
      if (serviceType === "compliance") navigate("/results/compliance");
      if (serviceType === "full-pipeline")
        navigate("/results/full-pipeline");
    }, 9000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(finishTimer);
    };
  }, [serviceType, steps.length, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar showNavLinks={false} />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-[#11d462]/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
            <Brain className="w-10 h-10 text-[#11d462]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-transparent border-t-[#11d462] rounded-full"
            />
          </div>

          <h1 className="text-3xl mb-2 text-foreground">
            Processing Your Request
          </h1>
          <p className="text-muted-foreground">
            {SERVICE_LABELS[serviceType]}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-2">
            <span>Overall Progress</span>
            <span className="text-[#11d462]">{progress}%</span>
          </div>
          <div className="h-4 bg-secondary rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-[#11d462]"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-[#11d462]/5 border rounded-xl p-6 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2 text-[#11d462]" />
            <div className="text-2xl">{steps.length}</div>
            <div className="text-sm text-muted-foreground">
              Pipeline Steps
            </div>
          </div>

          <div className="bg-[#11d462]/5 border rounded-xl p-6 text-center">
            <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-[#11d462]" />
            <div className="text-2xl">{currentStep + 1}</div>
            <div className="text-sm text-muted-foreground">
              Current Step
            </div>
          </div>

          <div className="bg-[#11d462]/5 border rounded-xl p-6 text-center">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[#11d462]" />
            <div className="text-2xl">{progress}%</div>
            <div className="text-sm text-muted-foreground">
              Completed
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="bg-[#11d462]/5 border rounded-xl p-6">
          <h3 className="mb-6">Processing Pipeline</h3>
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isDone = index < currentStep;
              const isActive = index === currentStep;

              return (
                <div
                  key={index}
                  className={`flex gap-4 p-4 rounded-xl ${
                    isActive
                      ? "border border-[#11d462] bg-[#11d462]/10"
                      : "bg-secondary"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#11d462]">
                    {isDone ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    )}
                  </div>
                  <div>
                    <div>{step.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
