import { useState, useCallback } from "react";
import { Upload, File, X, CheckCircle, AlertCircle, CloudUpload } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { cn } from "../../utils/utils";

const FileUpload = () => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const simulateUpload = (file, id) => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setUploadingFiles((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, progress: 100, status: "completed" } : f
          )
        );
      } else {
        setUploadingFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, progress } : f))
        );
      }
    }, 200);
  };

  const handleFiles = useCallback((files) => {
    if (!files) return;

    const newFiles = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      progress: 0,
      status: "uploading",
    }));

    setUploadingFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((uploadFile) => {
      simulateUpload(uploadFile.file, uploadFile.id);
    });
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeFile = (id) => {
    setUploadingFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return "🖼️";
    if (type.startsWith("video/")) return "🎬";
    if (type.startsWith("audio/")) return "🎵";
    if (type.includes("pdf")) return "📄";
    if (type.includes("zip") || type.includes("rar")) return "📦";
    return "📁";
  };

  return (
    <div className="h-full bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            File Upload
          </h1>
          <p className="text-muted-foreground">
            Drag and drop your files or click to browse
          </p>
        </div>

        {/* Upload Zone */}
        <Card className="border-2 border-dashed transition-all duration-300 hover:border-primary/50">
          <CardContent className="p-0">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={cn(
                "relative flex flex-col items-center justify-center p-12 transition-all duration-300 cursor-pointer rounded-lg",
                isDragOver
                  ? "bg-primary/10 border-primary"
                  : "bg-muted/20 hover:bg-muted/40"
              )}
            >
              <input
                type="file"
                multiple
                onChange={(e) => handleFiles(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div
                className={cn(
                  "p-6 rounded-full mb-6 transition-all duration-300",
                  isDragOver ? "bg-primary/20 scale-110" : "bg-primary/10"
                )}
              >
                <CloudUpload
                  className={cn(
                    "w-12 h-12 transition-colors duration-300",
                    isDragOver ? "text-primary" : "text-primary/70"
                  )}
                />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {isDragOver ? "Drop files here" : "Upload Files"}
              </h3>

              <p className="text-muted-foreground text-center mb-4">
                Drag and drop files here, or click to select files
              </p>

              <Button variant="outline" className="pointer-events-none">
                <Upload className="w-4 h-4 mr-2" />
                Browse Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Upload Progress */}
        {uploadingFiles.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <File className="w-5 h-5" />
                Uploads ({uploadingFiles.filter((f) => f.status === "completed").length}/{uploadingFiles.length})
              </CardTitle>
              <CardDescription>
                Track the progress of your file uploads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {uploadingFiles.map((uploadFile) => (
                  <div
                    key={uploadFile.id}
                    className={cn(
                      "relative p-4 rounded-xl border transition-all duration-300",
                      uploadFile.status === "completed"
                        ? "bg-accent/50 border-accent"
                        : uploadFile.status === "error"
                        ? "bg-destructive/5 border-destructive/20"
                        : "bg-muted/30 border-border"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* File Icon */}
                      <div className="text-3xl flex-shrink-0">
                        {getFileIcon(uploadFile.file.type)}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <p className="font-medium text-foreground truncate">
                            {uploadFile.file.name}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 flex-shrink-0"
                            onClick={() => removeFile(uploadFile.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {formatFileSize(uploadFile.file.size)}
                        </p>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="relative">
                            <Progress
                              value={uploadFile.progress}
                              className={cn(
                                "h-2 transition-all duration-300",
                                uploadFile.status === "completed" && "[&>div]:bg-accent-foreground",
                                uploadFile.status === "error" && "[&>div]:bg-destructive"
                              )}
                            />
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span
                              className={cn(
                                "flex items-center gap-1.5",
                                uploadFile.status === "completed"
                                  ? "text-accent-foreground"
                                  : uploadFile.status === "error"
                                  ? "text-destructive"
                                  : "text-muted-foreground"
                              )}
                            >
                              {uploadFile.status === "completed" && (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  Upload complete
                                </>
                              )}
                              {uploadFile.status === "error" && (
                                <>
                                  <AlertCircle className="w-4 h-4" />
                                  {uploadFile.error || "Upload failed"}
                                </>
                              )}
                              {uploadFile.status === "uploading" && (
                                <>
                                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                  Uploading...
                                </>
                              )}
                            </span>
                            <span className="font-medium text-foreground">
                              {Math.round(uploadFile.progress)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          {uploadingFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-muted/30">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {uploadingFiles.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Files</p>
                </CardContent>
              </Card>
              <Card className="bg-accent/50">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-accent-foreground">
                    {uploadingFiles.filter((f) => f.status === "completed").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
              <Card className="bg-primary/10">
                <CardContent className="p-4 text-center">
                  <p className="text-3xl font-bold text-primary">
                    {uploadingFiles.filter((f) => f.status === "uploading").length}
                  </p>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                </CardContent>
              </Card>
            </div>
          )}
      </div>
    </div>
  );
};

export default FileUpload;