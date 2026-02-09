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
      {/* UI unchanged – omitted here for brevity */}
      {/* Keep the JSX exactly as in your original TS file */}
    </div>
  );
}

export default Export;