import { useState } from "react";
import { UploadZone } from "@/components/upload/UploadZone";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { FileText, Folder, Paintbrush } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import { MetadataForm } from "@/components/upload/Metadataform";

const Upload = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [transcriptFiles, setTranscriptFiles] = useState([]);
  const [transcriptStatus, setTranscriptStatus] = useState("idle");
  const [transcriptText, setTranscriptText] = useState("");

  const [metadata, setMetadata] = useState({
    caseId: "",
    insuranceProvider: "",
    policyType: "",
    service: "", // audit | compliance | full-pipeline
  });

  /* ---------------- Validation ---------------- */

  const allowedServices = ["full-pipeline", "audit", "compliance"];

  const isMetadataValid =
    metadata.caseId.trim().length > 0 &&
    metadata.insuranceProvider.trim().length > 0 &&
    metadata.policyType.trim().length > 0 &&
    allowedServices.includes(metadata.service);

  const hasFiles = transcriptFiles.length > 0;
  const hasText = transcriptText.trim().length > 0;

  const validateFiles = (files) => {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not allowed`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 50MB`,
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleTranscriptUpload = (files) => {
    if (!Array.isArray(files) || files.length === 0) return;
    if (!validateFiles(files)) return;

    setTranscriptFiles(files);
    setTranscriptStatus("success");

    toast({
      title: "Transcripts validated",
      description: `${files.length} file(s) processed`,
    });
  };

  /* ---------------- MAIN HANDLER ---------------- */

  const handleUploadStart = async () => {
    console.log("UPLOAD METADATA →", metadata);

    if (!hasFiles && !hasText) {
      toast({
        title: "No input provided",
        description: "Upload a file or enter text to continue",
        variant: "destructive",
      });
      return;
    }

    if (!isMetadataValid) {
      toast({
        title: "Missing metadata",
        description: "Please fill in all required metadata fields",
        variant: "destructive",
      });
      return;
    }

    // ✅ IMPORTANT FIX: pass serviceType to Processing
    navigate("/processing", {
      state: {
        serviceType: metadata.service,
      },
    });

    // 🔄 Fire backend in background (non-blocking)
    try {
      const formData = new FormData();

      transcriptFiles.forEach((file) => {
        formData.append("files", file);
      });

      if (hasText) {
        formData.append("rawText", transcriptText);
      }

      formData.append("caseId", metadata.caseId);
      formData.append("insuranceProvider", metadata.insuranceProvider);
      formData.append("policyType", metadata.policyType);
      formData.append("service", metadata.service);

      await fetch(
        `${import.meta.env.VITE_API_URL}/api/transcripts/upload`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );
    } catch (err) {
      toast({
        title: "Backend unavailable",
        description: "Processing will resume when backend is available",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-200 flex flex-col">
      <Navbar showNavLinks={false} />

      <div className="container max-w-6xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Upload Medical Transcript
          </h1>
          <p className="text-slate-300">
            Upload documents for AI-powered medical code extraction
          </p>
        </div>

        <Tabs defaultValue="transcript" className="w-full">
          <TabsContent value="transcript">
            <UploadZone
              title="Medical Transcript Document"
              description="Upload the patient medical transcript"
              accept=".pdf,.docx,.txt"
              files={transcriptFiles}
              onFileSelect={handleTranscriptUpload}
              onTextChange={setTranscriptText}
              status={transcriptStatus}
            />
          </TabsContent>
        </Tabs>

        <MetadataForm metadata={metadata} setMetadata={setMetadata} />

        {(hasFiles || hasText) && (
          <Card className="p-4 bg-[#11d4620D] border border-[#11d462] rounded-3xl flex justify-end">
            <button
              onClick={handleUploadStart}
              className="px-6 py-3 bg-[#11d462] text-black font-semibold rounded-xl hover:scale-105 transition"
            >
              Upload & Start Processing
            </button>
          </Card>
        )}

        {(transcriptStatus === "idle" || transcriptStatus === "error") && (
          <Card className="p-6 mt-10 bg-[#11d4620D] border border-[#11d462] rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center bg-[#11d46233] text-[#11d462] rounded-full text-xl font-bold">
                ?
              </div>
              <h2 className="text-xl font-semibold text-white">
                Upload Guidelines
              </h2>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium flex items-center gap-2">
                  <Folder className="h-4 w-4" /> Accepted file types
                </p>
                <p className="pl-6">PDF, DOCX, TXT</p>
              </div>

              <div>
                <p className="font-medium flex items-center gap-2">
                  <Paintbrush className="h-4 w-4" /> Max file size
                </p>
                <p className="pl-6">50MB per file</p>
              </div>

              <div>
                <p className="font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Sample Transcript
                </p>
                <a
                  download
                  href="data:text/plain;charset=utf-8,Sample Transcript"
                  className="pl-6 underline"
                >
                  Download sample file
                </a>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Upload;
