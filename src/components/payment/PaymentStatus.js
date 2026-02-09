import { CreditCard, Shield, Loader2, CheckCircle, ArrowRight, Circle } from "lucide-react";

export function PaymentStatus({ step, progress }) {
  const steps = [
    { key: "connecting", label: "Connecting to Bank", icon: CreditCard, color: "text-blue-500" },
    { key: "verifying", label: "Verifying Security", icon: Shield, color: "text-indigo-500" },
    { key: "processing", label: "Processing Payment", icon: Loader2, color: "text-purple-500" },
    { key: "transferring", label: "Transferring Funds", icon: ArrowRight, color: "text-pink-500" },
    { key: "success", label: "Payment Complete", icon: CheckCircle, color: "text-emerald-500" },
  ];

  const currentStepIndex = steps.findIndex((s) => s.key === step);
  const lineProgress = (currentStepIndex / (steps.length - 1)) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Status
        </span>
        <div className="flex items-center gap-2">
          <span
            className={`text-3xl font-black tabular-nums bg-clip-text text-transparent bg-gradient-to-r ${
              step === "success"
                ? "from-emerald-500 to-teal-500"
                : "from-blue-600 via-indigo-600 to-purple-600"
            }`}
          >
            {progress}%
          </span>
          {step !== "success" && step !== "idle" && (
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          )}
        </div>
      </div>

      {/* Vertical Stepper */}
      <div className="relative pl-2 py-2">
        <div className="absolute left-4 top-4 bottom-4 w-1 bg-slate-100 rounded-full" />

        <div
          className="absolute left-4 top-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-pink-500 rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(99,102,241,0.6)]"
          style={{
            height: `calc(${lineProgress}% + 16px)`,
            top: "16px",
          }}
        />

        <div className="space-y-0">
          {steps.map((s, index) => {
            const isActive = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            const Icon = s.icon;

            return (
              <div
                key={s.key}
                className="relative flex items-start gap-4 pb-8 last:pb-0 group"
              >
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                      isCompleted
                        ? "bg-emerald-500 border-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-105"
                        : isActive
                        ? "bg-white border-indigo-200 shadow-[0_0_25px_rgba(99,102,241,0.4)] scale-110"
                        : "bg-white border-slate-100"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : isActive && s.key === "processing" ? (
                      <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                    ) : isActive ? (
                      <Icon className={`w-5 h-5 ${s.color}`} />
                    ) : (
                      <Circle className="w-3 h-3 text-slate-300" />
                    )}
                  </div>
                </div>

                <div className="flex-1 pt-1.5 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-sm font-bold transition-colors duration-300 ${
                        isActive
                          ? "text-indigo-900"
                          : isCompleted
                          ? "text-emerald-700"
                          : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </h3>

                    {isActive && (
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full border border-indigo-100 uppercase tracking-wide">
                        In Progress
                      </span>
                    )}

                    {isCompleted && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 uppercase tracking-wide">
                        Done
                      </span>
                    )}
                  </div>

                  {isActive && (
                    <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5 font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                      </span>
                      Please wait while we process...
                    </p>
                  )}

                  {isCompleted && (
                    <p className="text-xs text-emerald-600 mt-1.5 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Successfully verified
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

