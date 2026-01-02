import Navbar from "@/components/common/Navbar";

export default function AuditOnly() {
  return (
    <div className="min-h-screen bg-[#0b1f17] text-white">
      <Navbar />

      {/* MAIN GRID */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT PANEL — FINDINGS LIST */}
        <div className="lg:col-span-4 bg-[#0f2a1f] rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">
            Findings List
          </h2>

          <div className="space-y-3 text-sm">
            <div className="p-3 bg-[#11d4621a] rounded-lg border border-[#11d462]">
              <p className="font-semibold">Incorrect Code</p>
              <p className="text-slate-300">CPT 99214 mismatch</p>
              <span className="text-red-400 text-xs font-medium">
                Critical
              </span>
            </div>

            <div className="p-3 bg-[#11d4620d] rounded-lg border border-[#11d462]">
              <p className="font-semibold">Missing Modifier</p>
              <p className="text-slate-300">Modifier 25 not applied</p>
              <span className="text-yellow-400 text-xs font-medium">
                High
              </span>
            </div>
          </div>
        </div>

        {/* CENTER PANEL — AI RATIONALE */}
        <div className="lg:col-span-5 bg-[#0f2a1f] rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">
            AI Rationale & Suggestion
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            AI detected a mismatch between the selected CPT code and the
            extracted clinical evidence. The reported procedure complexity
            does not justify CPT 99214 without additional documentation.
          </p>

          <div className="bg-[#11d4621a] border border-[#11d462] rounded-lg p-3 text-sm">
            <strong>Recommended Correction:</strong>
            <br />
            Change CPT code to <strong>99203</strong> or provide
            additional diagnostic justification.
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              Source Evidence
            </h3>
            <div className="bg-[#081a13] p-3 rounded text-xs text-slate-300 leading-relaxed">
              “Patient presents for pre-operative clearance.
              Time spent counseling exceeded standard evaluation duration…”
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — AUDIT STATUS */}
        <div className="lg:col-span-3 bg-[#0f2a1f] rounded-xl p-4 space-y-4">
          <h2 className="text-lg font-semibold">
            Audit Status
          </h2>

          <p className="text-blue-400 font-semibold">
            In Progress
          </p>

          <div className="text-sm text-slate-300">
            SLA Countdown:
            <span className="text-orange-400 ml-1 font-medium">
              23:15:47
            </span>
          </div>

          <div className="pt-4 border-t border-[#11d46233]">
            <h3 className="font-semibold mb-2">
              Collaboration
            </h3>
            <div className="bg-[#081a13] p-3 rounded text-xs">
              <strong>Jane Smith:</strong>{" "}
              Please verify CPT correction before final submission.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
