import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { CreditCard, ArrowRight, CheckCircle, AlertCircle, RefreshCw, Receipt, Shield, Lock } from "lucide-react";
import { PaymentStatus } from "./PaymentStatus";
import { TransactionDetails } from "./TransactionDetails";
import { CreditCardVisual } from "./CreditCardVisual";
import { generateMockPayment } from "../../utils/mockPayment";

export function PaymentPage() {
  const [paymentData, setPaymentData] = useState(null);
  const [currentStep, setCurrentStep] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPaymentData(generateMockPayment());
  }, []);

  const handlePayment = () => {
    if (!paymentData) return;
    
    setIsProcessing(true);
    setError(null);
    setCurrentStep("connecting");
    setProgress(0);

    // Simulation timeline
    const steps = [
      { step: "connecting", progress: 20, delay: 1000 },
      { step: "verifying", progress: 45, delay: 2500 },
      { step: "processing", progress: 70, delay: 4000 },
      { step: "transferring", progress: 90, delay: 5500 },
      { step: "success", progress: 100, delay: 7000 },
    ];

    steps.forEach(({ step, progress: prog, delay }) => {
      setTimeout(() => {
        if (!isProcessing) return; // Stop if reset
        setCurrentStep(step);
        setProgress(prog);
      }, delay);
    });

    setTimeout(() => {
      setIsProcessing(false);
    }, 7000);
  };

  const handleReset = () => {
    setIsProcessing(false);
    setCurrentStep("idle");
    setProgress(0);
    setError(null);
    setPaymentData(generateMockPayment());
  };

  if (!paymentData) return null;

  const isSuccess = currentStep === "success";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <header className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
          <CreditCard className="w-6 h-6 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Secure Payment</h1>
        <p className="text-slate-500">Complete your transaction securely</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <CreditCardVisual card={paymentData.card} />

          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                <span>Transaction Status</span>
                {isProcessing && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 animate-pulse">
                    Processing
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <PaymentStatus step={currentStep} progress={progress} />
              
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Separator />

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-3 h-3" />
                <span>256-bit SSL Encrypted</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Transaction Details</CardTitle>
            </CardHeader>
            <CardContent>
              <TransactionDetails data={paymentData} />
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 bg-slate-50/50">
            <CardContent className="pt-6">
              {!isSuccess ? (
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay Now {paymentData.amount}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    <span className="font-semibold text-emerald-800">Payment Successful</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-100"
                    >
                      <Receipt className="w-4 h-4 mr-2" />
                      Receipt
                    </Button>
                    <Button
                      onClick={handleReset}
                      className="bg-slate-900 hover:bg-slate-800 text-white"
                    >
                      New Payment
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>PCI DSS Compliant</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

