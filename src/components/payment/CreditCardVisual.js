import { CreditCard, Wifi } from "lucide-react";

export function CreditCardVisual({ card }) {
  return (
    <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 flex flex-col justify-between">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Top Row */}
      <div className="relative flex justify-between items-start">
        <CreditCard className="w-8 h-8 text-white/80" />
        <Wifi className="w-6 h-6 text-white/80 rotate-90" />
      </div>

      {/* Card Number */}
      <div className="relative">
        <p className="text-lg md:text-xl font-mono tracking-widest text-white/90">
          {card.number}
        </p>
      </div>

      {/* Bottom Row */}
      <div className="relative flex justify-between items-end">
        <div>
          <p className="text-[10px] uppercase text-white/60 mb-1">Card Holder</p>
          <p className="text-sm font-medium tracking-wide">{card.holder}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase text-white/60 mb-1">Expires</p>
          <p className="text-sm font-medium tracking-wide">{card.expiry}</p>
        </div>
        <div className="text-2xl font-bold italic opacity-80">
          {card.brand}
        </div>
      </div>
    </div>
  );
}

