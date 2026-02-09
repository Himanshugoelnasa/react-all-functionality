import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { PaymentCard } from "../../components/payment/PaymentCard";
import { PaymentStatus } from "../../components/payment/PaymentStatus";
import { PaymentDetails } from "../../components/payment/PaymentDetails";
import { mockPayment } from "../../utils/mockPayment";
import { ArrowRight, RefreshCw, CheckCircle2, Lock } from "lucide-react";

export default function PaymentPage() {
  const [status, setStatus] = useState("idle");
  const [step, setStep] = useState(mockPayment.initialStep);
  const [progress, setProgress] = useState(0);

  const handleStartPayment = () => {
    setStatus("processing");

    mockPayment.start((newStep, newProgress) => {
      setStep(newStep);
      setProgress(newProgress);

      if (newStep === "success") {
        setStatus("success");
      }
    });
  };

  const handleReset = () => {
    setStatus("idle");
    setStep(mockPayment.initialStep);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              Secure <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Payment</span>
            </h1>
            <p className="text-slate-500 font-medium">Complete your transaction safely.</p>
          </div>

          <PaymentCard />

          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold text-slate-600">256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-slate-200 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-bold text-slate-600">PCI Compliant</span>
            </div>
          </div>

          <PaymentDetails
            amount="$12,450.00"
            recipient="Acme Corp Inc."
            bank="Chase Bank"
            date="Oct 24, 2023"
            id="TXN-8842-9921"
          />
        </div>

        {/* Right Column */}
        <div className="sticky top-8">
          <Card className="border-slate-200 shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-slate-800">
                Transaction Status
              </CardTitle>
              <CardDescription className="text-slate-500">
                {status === "idle" && "Ready to initiate transfer."}
                {status === "processing" && "Do not close this window."}
                {status === "success" && "Transaction completed successfully."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <PaymentStatus step={step} progress={progress} />

              <div className="pt-4 border-t border-slate-100">
                {status === "idle" && (
                  <Button 
                    onClick={handleStartPayment}
                    className="w-full h-12 text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-indigo-200"
                  >
                    Confirm & Pay
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                )}
                
                {status === "processing" && (
                  <Button disabled className="w-full h-12 text-base font-bold bg-slate-100 text-slate-400 cursor-not-allowed">
                    Processing...
                  </Button>
                )}

                {status === "success" && (
                  <div className="space-y-3">
                    <div className="w-full p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3">
                      <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-emerald-800">Payment Successful!</p>
                        <p className="text-xs text-emerald-600">Receipt sent to your email.</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleReset}
                      variant="outline"
                      className="w-full h-12 text-base font-bold border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      <RefreshCw className="mr-2 w-4 h-4" />
                      Make Another Payment
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

