import { useState } from "react";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import { FileText, Folder, Paintbrush } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const Upload = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [transcriptFile, setTranscriptFile] = useState(null);
  const [pageCount, setPageCount] = useState(null);
  const [transcriptStatus, setTranscriptStatus] = useState("idle");

  const getPdfPageCount = async (file) => {
    try {
      const buffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;
      console.log(file.name, "numPages:", pdf.numPages);
      return pdf.numPages;
    } catch (err) {
      console.error("PDF page count error:", err);
      return 1;
    }
  };

  const handleTranscriptUpload = async (file) => {
    setTranscriptStatus("idle");

    let pages = 1;
    if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      try {
        pages = await getPdfPageCount(file);
      } catch (err) {
        console.error("PDF page count error:", err);
      }
    }

    setTranscriptFile(file);
    setPageCount(pages);
    setTranscriptStatus("success");

    toast({
      title: "Transcript validated",
      description: `${file.name} — Text layer detected, ${pages} pages`,
    });
  };

  const handleUploadStart = () => {
    if (!transcriptFile) {
      toast({
        title: "Missing transcript",
        description: "Please upload the medical transcript document",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Upload started",
      description: "Processing transcript...",
    });

    setTimeout(() => {
      navigate("/processing");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 flex flex-col">
      <div className="container max-w-6xl mx-auto p-6 space-y-6">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
          <a href="/page" className="hover:underline">
            Home
          </a>
          <span className="text-lg">›</span>
          <span>Upload</span>
        </nav>
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Upload Transcript
            </h1>
            <p className="text-slate-300">
              Upload a single file to begin transcript processing.
            </p>
          </div>
        </div>
        <div className="container max-w-6xl mx-auto p-6 space-y-6">
          <Tabs defaultValue="transcript" className="w-full">
            <TabsContent value="transcript" className="mt-4">
              <UploadZone
                title="Medical Transcript Document"
                description="Upload the patient medical transcript for audit review"
                accept=".pdf,.docx,.txt"
                icon="document"
                onFileSelect={handleTranscriptUpload}
                file={transcriptFile}
                status={transcriptStatus}
                preview={
                  pageCount
                    ? `${pageCount} pages, Text layer detected`
                    : undefined
                }
              />
            </TabsContent>
          </Tabs>

          {transcriptFile && (
            <Card className="p-4 bg-accent/50 border-accent mt-4 flex justify-end">
              <Button
                onClick={handleUploadStart}
                className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                Upload & Start Processing
              </Button>
            </Card>
          )}
          {/* Upload Guidelines Card */}
          {(transcriptStatus === "idle" || transcriptStatus === "error") && (
            <Card className="p-6 mt-10 bg-[#11d4620D] border border-[#11d46250] rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-[#11d46233] text-[#11d462] rounded-full text-xl font-bold">
                  ?
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Upload Guidelines
                </h2>
              </div>

              <div className="space-y-4 text-slate-300 text-sm">
                {/* Accepted file types */}
                <div>
                  <p className="font-medium text-white flex items-center gap-2">
                    <Folder className="h-4 w-4 text-primary" />
                    Accepted file types
                  </p>
                  <p className="text-slate-300 pl-6">PDF, DOCX, TXT</p>
                </div>

                {/* Max file size */}
                <div>
                  <p className="font-medium text-white flex items-center gap-2">
                    <Paintbrush className="h-4 w-4 text-primary" />
                    Max file size
                  </p>
                  <p className="pl-6 text-slate-300">50MB per file</p>
                </div>

                {/* Sample transcript */}
                <div>
                  <p className="font-medium text-white flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Sample Transcript
                  </p>

                  <a
                    download="sample-transcript.txt"
                    href="data:text/plain;charset=utf-8,Sample%20Transcript%20Data%20Goes%20Here..."
                    className="pl-6 text-primary underline hover:text-secondary transition-colors"
                  >
                    Download sample file
                  </a>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;
