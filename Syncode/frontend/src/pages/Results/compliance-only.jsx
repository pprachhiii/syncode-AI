import Navbar from "@/components/common/Navbar";

export default function ComplianceOnly() {
  return (
    <div className="min-h-screen bg-[#0b1f17] text-white">
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="p-6 space-y-8">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl font-bold">
            Policy Compliance Report
          </h1>

          <button className="bg-[#11d462] text-black px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90">
            Generate Compliance Report
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0f2a1f] p-5 rounded-xl">
            <p className="text-slate-300 text-sm">
              Exceptions Found
            </p>
            <p className="text-3xl font-bold text-yellow-400 mt-1">
              3
            </p>
          </div>

          <div className="bg-[#0f2a1f] p-5 rounded-xl">
            <p className="text-slate-300 text-sm">
              Compliant Items
            </p>
            <p className="text-3xl font-bold text-green-400 mt-1">
              17
            </p>
          </div>

          <div className="bg-[#0f2a1f] p-5 rounded-xl">
            <p className="text-slate-300 text-sm">
              Rules Checked
            </p>
            <p className="text-3xl font-bold mt-1">
              20
            </p>
          </div>
        </div>

        {/* EXCEPTIONS TABLE */}
        <div className="bg-[#0f2a1f] rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-4">
            Policy Exceptions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead className="text-slate-400 border-b border-[#11d46233]">
                <tr>
                  <th className="text-left pb-2">Code / Finding</th>
                  <th className="text-left pb-2">Rule Violated</th>
                  <th className="text-left pb-2">Details</th>
                  <th className="text-right pb-2">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-[#11d4621a]">
                  <td className="py-3">ICD-10 S82.101A</td>
                  <td>Specificity Rule</td>
                  <td>Fracture type not specified</td>
                  <td className="text-right text-[#11d462] font-medium cursor-pointer">
                    View in Audit
                  </td>
                </tr>

                <tr className="border-t border-[#11d4621a]">
                  <td className="py-3">CPT 99214</td>
                  <td>Frequency Limit</td>
                  <td>Exceeded visit count</td>
                  <td className="text-right text-[#11d462] font-medium cursor-pointer">
                    View in Audit
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
