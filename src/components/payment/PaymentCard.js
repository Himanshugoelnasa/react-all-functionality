import { CreditCard, Wifi } from "lucide-react";

export function PaymentCard() {
  return (
    <div className="w-full max-w-sm mx-auto perspective-1000">
      <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
        {/* Vibrant Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-500" />
        
        {/* Decorative Circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-500 opacity-20 rounded-full blur-xl" />

        {/* Card Content */}
        <div className="relative z-10 p-6 flex flex-col justify-between h-full text-white">
          <div className="flex justify-between items-start">
            <Wifi className="w-8 h-8 opacity-80 rotate-90" />
            <div className="text-lg font-bold tracking-widest opacity-90">VISA</div>
          </div>

          <div className="space-y-4">
            {/* Chip */}
            <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-600 border border-yellow-200/30 flex items-center justify-center overflow-hidden">
              <div className="w-full h-[1px] bg-black/20 mb-1" />
              <div className="w-full h-[1px] bg-black/20 mt-1" />
            </div>

            {/* Card Number */}
            <div className="font-mono text-xl tracking-widest drop-shadow-md">
              4284 •••• •••• 9012
            </div>

            <div className="flex justify-between items-end">
              <div>
                <div className="text-[10px] uppercase opacity-70 mb-0.5">Card Holder</div>
                <div className="font-medium tracking-wide">John Doe</div>
              </div>
              <div>
                <div className="text-[10px] uppercase opacity-70 mb-0.5">Expires</div>
                <div className="font-medium tracking-wide">12/28</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}