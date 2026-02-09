import React from "react";
import { Building2, Calendar, Hash, Receipt, ArrowUpRight } from "lucide-react";

export function PaymentDetails({ amount, recipient, bank, date, id }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Amount</p>
            <p className="text-2xl font-bold text-slate-900">{amount}</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
          USD
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] uppercase text-blue-600 font-bold tracking-wider">
              Bank
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800 truncate">{bank}</p>
        </div>

        <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
          <div className="flex items-center gap-2 mb-1">
            <Receipt className="w-4 h-4 text-purple-500" />
            <span className="text-[10px] uppercase text-purple-600 font-bold tracking-wider">
              Recipient
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800 truncate">{recipient}</p>
        </div>

        <div className="p-3 rounded-lg bg-orange-50 border border-orange-100">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] uppercase text-orange-600 font-bold tracking-wider">
              Date
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800">{date}</p>
        </div>

        <div className="p-3 rounded-lg bg-pink-50 border border-pink-100">
          <div className="flex items-center gap-2 mb-1">
            <Hash className="w-4 h-4 text-pink-500" />
            <span className="text-[10px] uppercase text-pink-600 font-bold tracking-wider">
              Ref ID
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800 truncate">{id}</p>
        </div>
      </div>
    </div>
  );
}



