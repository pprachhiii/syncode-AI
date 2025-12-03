import { useState, useCallback } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const UploadZone = ({
  title,
  description,
  accept,
  icon,
  onFileSelect,
  file,
  status = "idle",
  preview,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) onFileSelect(droppedFile);
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) onFileSelect(selectedFile);
  };

  const IconComponent = icon === "document" ? FileText : FileCode;

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        isDragging && "ring-2 ring-primary ring-offset-2",
        status === "success" && "ring-1 ring-success/30 bg-[#11d4620D]",
        status === "error" && "ring-1 ring-destructive/30 bg-destructive/5"
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="p-8">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors",
              status === "error" ? "bg-red-100" : "bg-[#11d4621a]"
            )}
          >
            {status === "success" ? (
              <CheckCircle2 className="h-7 w-7 text-[#11d462]" />
            ) : status === "error" ? (
              <AlertCircle className="h-7 w-7 text-red-500" />
            ) : (
              <IconComponent className="h-7 w-7 text-[#11d462]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>

            {!file ? (
              <div
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors",
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-border bg-muted/30"
                )}
              >
                <Upload className="h-10 w-10 text-[#11d462] mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Drop file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Supported: {accept.split(",").join(", ")}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3"
                  onClick={() => {
                    document.getElementById("hidden-file-input")?.click();
                  }}
                >
                  Browse File
                </Button>
                <input
                  type="file"
                  accept={accept}
                  onChange={handleFileInput}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-[#11d462] bg-black p-3">
                  <IconComponent className="h-5 w-5 text-blue-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {file.size && !isNaN(file.size)
                        ? (file.size / 1024 / 1024).toFixed(2)
                        : "0"}{" "}
                      MB
                    </p>
                  </div>
                  {status === "success" && (
                    <CheckCircle2 className="h-5 w-5 text-[#11d462] shrink-0" />
                  )}
                </div>

                {preview && (
                  <div className="flex gap-2 flex-wrap">
                    {preview.split(", ").map((item, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = accept;
                    input.onchange = (e) => {
                      const newFile = e.target.files?.[0];
                      if (newFile) onFileSelect(newFile);
                    };
                    input.click();
                  }}
                >
                  Replace file
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
