import {
  FileSearch,
  GitBranch,
  Shield,
  Zap,
  Database,
  FileOutput,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Automated Standardized Coding",
    description:
      "Extract diagnoses, procedures, lab tests and medications from raw reports and map them to ICD, CPT, LOINC and NDC with provenance — no manual lookups.",
  },
  {
    icon: FileSearch,
    title: "Full Text Traceability",
    description:
      "Every code links directly to the exact sentence in the original document. Click any code to see the source text, page number, and confidence score.",
  },
  {
    icon: GitBranch,
    title: "Audit-Ready Output",
    description:
      "Complete chain of custody from source text to final code. Track who assigned codes, when, and why. Perfect for compliance reviews and payer audits.",
  },
  {
    icon: Shield,
    title: "HIPAA-Compliant Infrastructure",
    description:
      "PHI encrypted at rest (AES-256) and in transit (TLS 1.2+). Role-based access control, audit logging, and configurable data retention.",
  },
  {
    icon: Database,
    title: "RAG-Powered Intelligence",
    description:
      "Retrieval-augmented generation over vetted medical knowledge bases ensures accurate code suggestions with transparent provenance.",
  },
  {
    icon: FileOutput,
    title: "Flexible Export & Integration",
    description:
      "Export JSON or CSV with full provenance. API-first design for seamless integration with your EHR, billing, and analytics systems.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 mb-4">
            Built for Medical Coding Teams
          </h2>
          <p className="text-lg text-muted-foreground text-slate-300">
            Everything you need to extract, code, and audit medical reports with
            confidence and compliance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-xl border bg-card p-6 shadow-sm hover:shadow-clinical border-[#11d462] transition-all duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#11d4621a]">
                  <Icon className="h-6 w-6 text-[#11d462]" />
                </div>
                <h3 className="text-xl font-bold text-yellow-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
