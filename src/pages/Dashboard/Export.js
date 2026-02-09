import { useState, useEffect, useCallback, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import {
  Download,
  Play,
  Pause,
  RotateCcw,
  FileDown,
  Clock,
  Zap,
  Database,
  CheckCircle2,
  Loader2,
  AlertCircle,
  User,
  Building,
  Mail,
} from "lucide-react";

const BATCH_SIZE = 25;
const DELAY_BETWEEN_BATCHES = 500;

const Export = () => {
  const [progress, setProgress] = useState({
    status: "idle",
    processedRecords: 0,
    totalRecords: 0,
    currentBatch: 0,
    totalBatches: 0,
    startTime: null,
    endTime: null,
    records: [],
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const abortControllerRef = useRef(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const fetchBatch = async (page, signal) => {
    const response = await fetch(
      `/api/export?page=${page}&batchSize=${BATCH_SIZE}`,
      { signal }
    );

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: "Failed to fetch batch" }));
      throw new Error(errorData.error || "Failed to fetch batch");
    }

    return response.json();
  };

  const startExport = useCallback(async () => {
    if (isExporting) return;

    setIsExporting(true);
    setErrorMessage(null);
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      const initialResponse = await fetchBatch(1, signal);

      setProgress({
        status: "exporting",
        processedRecords: initialResponse.records.length,
        totalRecords: initialResponse.totalRecords,
        currentBatch: 1,
        totalBatches: initialResponse.totalPages,
        startTime: Date.now(),
        endTime: null,
        records: initialResponse.records,
      });

      let currentPage = 2;
      let allRecords = [...initialResponse.records];

      while (currentPage <= initialResponse.totalPages) {
        if (signal.aborted) break;

        while (isPausedRef.current && !signal.aborted) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (signal.aborted) break;

        await new Promise((resolve) =>
          setTimeout(resolve, DELAY_BETWEEN_BATCHES)
        );

        if (signal.aborted) break;

        const batchResponse = await fetchBatch(currentPage, signal);
        allRecords = [...allRecords, ...batchResponse.records];

        setProgress((prev) => ({
          ...prev,
          processedRecords: allRecords.length,
          currentBatch: currentPage,
          records: allRecords,
        }));

        currentPage++;
      }

      if (!signal.aborted) {
        setProgress((prev) => ({
          ...prev,
          status: "completed",
          endTime: Date.now(),
        }));
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setIsExporting(false);
        return;
      }

      const message =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred";

      setErrorMessage(message);
      setProgress((prev) => ({
        ...prev,
        status: "error",
        endTime: Date.now(),
      }));
    } finally {
      setIsExporting(false);
    }
  }, [isExporting]);

  const handleStart = () => {
    if (isExporting) return;
    setIsPaused(false);
    isPausedRef.current = false;
    startExport();
  };

  const handlePause = () => {
    setIsPaused(true);
    isPausedRef.current = true;
    setProgress((prev) => ({ ...prev, status: "exporting" }));
  };

  const handleResume = () => {
    setIsPaused(false);
    isPausedRef.current = false;
  };

  const handleReset = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsPaused(false);
    isPausedRef.current = false;
    setIsExporting(false);
    setErrorMessage(null);

    setProgress({
      status: "idle",
      processedRecords: 0,
      totalRecords: 0,
      currentBatch: 0,
      totalBatches: 0,
      startTime: null,
      endTime: null,
      records: [],
    });
  };

  const progressPercentage =
    progress.totalRecords > 0
      ? Math.round(
          (progress.processedRecords / progress.totalRecords) * 100
        )
      : 0;

  const elapsedTime = progress.startTime
    ? ((progress.endTime || Date.now()) - progress.startTime) / 1000
    : 0;

  const recordsPerSecond =
    elapsedTime > 0
      ? (progress.processedRecords / elapsedTime).toFixed(1)
      : "0.0";

  const estimatedTimeRemaining =
    progress.processedRecords > 0 && elapsedTime > 0
      ? Math.round(
          ((progress.totalRecords - progress.processedRecords) /
            progress.processedRecords) *
            elapsedTime
        )
      : 0;

  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const getStatusBadge = () => {
    switch (progress.status) {
      case "idle":
        return <Badge variant="secondary">Ready</Badge>;
      case "exporting":
        return isPaused ? (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            Paused
          </Badge>
        ) : (
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            Exporting
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            Completed
          </Badge>
        );
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-600";
      case "inactive":
        return "bg-slate-500/10 text-slate-600";
      case "pending":
        return "bg-amber-500/10 text-amber-600";
      default:
        return "bg-slate-500/10 text-slate-600";
    }
  };

  return (
     <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-3" data-testid="text-page-title">
              <FileDown className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              Data Export
            </h1>
            <p className="text-muted-foreground" data-testid="text-page-description">
              Export your records with real-time progress tracking
            </p>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {getStatusBadge()}
            
            {progress.status === "idle" && (
              <Button onClick={handleStart} disabled={isExporting} data-testid="button-start-export">
                <Play className="h-4 w-4 mr-2" />
                Start Export
              </Button>
            )}
            
            {progress.status === "exporting" && !isPaused && (
              <Button onClick={handlePause} variant="secondary" data-testid="button-pause-export">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            
            {progress.status === "exporting" && isPaused && (
              <Button onClick={handleResume} data-testid="button-resume-export">
                <Play className="h-4 w-4 mr-2" />
                Resume
              </Button>
            )}
            
            {(progress.status === "completed" || progress.status === "error" || (progress.status === "exporting" && isPaused)) && (
              <Button onClick={handleReset} variant="outline" data-testid="button-reset-export">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            )}
            
            {progress.status === "completed" && (
              <Button variant="default" data-testid="button-download-export">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </div>

        {errorMessage && (
          <Alert variant="destructive" data-testid="alert-error">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Export Failed</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 md:grid-cols-4">
          <Card data-testid="card-total-records">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Records</p>
                  <p className="text-2xl font-bold" data-testid="text-total-records">{progress.totalRecords.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-processed-records">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Processed</p>
                  <p className="text-2xl font-bold" data-testid="text-processed-records">{progress.processedRecords.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-speed">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-amber-500/10">
                  <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Speed</p>
                  <p className="text-2xl font-bold" data-testid="text-speed">{recordsPerSecond}/s</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-time-remaining">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {progress.status === "completed" ? "Total Time" : "ETA"}
                  </p>
                  <p className="text-2xl font-bold" data-testid="text-time-remaining">
                    {progress.status === "completed" 
                      ? formatTime(elapsedTime) 
                      : progress.status === "exporting" 
                        ? formatTime(estimatedTimeRemaining) 
                        : "--"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card data-testid="card-progress">
          <CardHeader>
            <CardTitle className="text-lg">Export Progress</CardTitle>
            <CardDescription>
              {progress.status === "exporting" && !isPaused
                ? `Processing batch ${progress.currentBatch} of ${progress.totalBatches}...`
                : progress.status === "exporting" && isPaused
                  ? `Paused at batch ${progress.currentBatch} of ${progress.totalBatches}`
                  : progress.status === "completed"
                    ? "Export completed successfully!"
                    : progress.status === "error"
                      ? "An error occurred during export"
                      : "Click Start Export to begin"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium" data-testid="text-progress-percentage">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" data-testid="progress-bar" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Batch Size</p>
                <p className="font-medium">{BATCH_SIZE} records</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Batch</p>
                <p className="font-medium">{progress.currentBatch} / {progress.totalBatches}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Elapsed Time</p>
                <p className="font-medium">{formatTime(elapsedTime)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Remaining</p>
                <p className="font-medium">{(progress.totalRecords - progress.processedRecords).toLocaleString()} records</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-records">
          <CardHeader>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-lg">Exported Records</CardTitle>
                <CardDescription>
                  Showing {progress.records.length.toLocaleString()} of {progress.totalRecords.toLocaleString()} records
                </CardDescription>
              </div>
              {progress.status === "exporting" && !isPaused && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading batch {progress.currentBatch}...</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {progress.records.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                  <Database className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-1">No records yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Start the export process to see records appear here in real-time
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  {progress.records.map((record, index) => (
                    <div
                      key={record.id}
                      className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 p-3 rounded-lg bg-muted/50 transition-all duration-200"
                      data-testid={`record-item-${record.id}`}
                      style={{
                        animation: index >= progress.records.length - BATCH_SIZE 
                          ? "fadeIn 0.3s ease-out" 
                          : "none"
                      }}
                    >
                      <div className="flex-shrink-0 w-8 text-center text-sm text-muted-foreground font-mono">
                        #{record.id}
                      </div>
                      <div className="flex-1 min-w-0 grid gap-1 md:grid-cols-3 md:gap-4">
                        <div className="flex items-center gap-2 truncate">
                          <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate font-medium">{record.name}</span>
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate text-sm text-muted-foreground">{record.email}</span>
                        </div>
                        <div className="flex items-center gap-2 truncate">
                          <Building className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="truncate text-sm text-muted-foreground">{record.company}</span>
                        </div>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={`flex-shrink-0 ${getStatusColor(record.status)}`}
                        data-testid={`badge-record-status-${record.id}`}
                      >
                        {record.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Export;