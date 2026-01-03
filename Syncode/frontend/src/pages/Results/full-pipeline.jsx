import Navbar from "@/components/common/Navbar";

export default function FullPipeline() {
  return (
    <div className="min-h-screen bg-[#0b1f17] text-white">
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="p-6 space-y-8">

        {/* HEADER */}
        <h1 className="text-2xl font-bold">
          Full Pipeline Result Analysis
        </h1>

        {/* EXTRACTION + EVIDENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* MEDICAL CODES TABLE */}
          <div className="lg:col-span-6 bg-[#0f2a1f] rounded-xl p-5">
            <h2 className="font-semibold mb-4">
              Extracted Medical Codes
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[400px]">
                <thead className="text-slate-400 border-b border-[#11d46233]">
                  <tr>
                    <th className="text-left pb-2">Code</th>
                    <th className="text-left pb-2">Description</th>
                    <th className="text-left pb-2">Confidence</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t border-[#11d4621a]">
                    <td className="py-3">I21.3</td>
                    <td>ST Elevation Myocardial Infarction</td>
                    <td className="text-green-400 font-medium">92%</td>
                  </tr>

                  <tr className="border-t border-[#11d4621a]">
                    <td className="py-3">E78.5</td>
                    <td>Hyperlipidemia</td>
                    <td className="text-yellow-400 font-medium">78%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* EVIDENCE VIEWER */}
          <div className="lg:col-span-6 bg-[#0f2a1f] rounded-xl p-5">
            <h2 className="font-semibold mb-4">
              Supporting Clinical Evidence
            </h2>

            <div className="bg-[#081a13] p-4 rounded text-sm text-slate-300 leading-relaxed">
              Patient is a 58-year-old male presenting with acute chest pain.
              ECG findings showed ST elevation, and coronary angiography
              confirmed LAD artery occlusion, supporting the extracted diagnosis.
            </div>
          </div>
        </div>

        {/* FINAL DECISION */}
        <div className="bg-[#11d4621a] border border-[#11d462] rounded-xl p-5 text-green-400 font-semibold text-lg">
          ✔ FINAL DECISION: CLAIM APPROVED
        </div>

      </div>
    </div>
  );
}
