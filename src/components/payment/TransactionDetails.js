import { Label } from "../components/ui/label";

export function TransactionDetails({ data }) {
  const details = [
    { label: "Transaction ID", value: data.transactionId },
    { label: "Date", value: data.date },
    { label: "Payment Method", value: `${data.card.brand} •••• ${data.card.last4}` },
    { label: "Card Holder", value: data.card.holder },
    { label: "Recipient", value: data.recipient },
    { label: "Bank", value: data.bank },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
        <span className="text-sm text-slate-600">Total Amount</span>
        <span className="text-2xl font-bold text-slate-900">{data.amount}</span>
      </div>

      <div className="space-y-3">
        {details.map((detail, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-2 border-b border-slate-100 last:border-0"
          >
            <Label className="text-sm text-slate-500">{detail.label}</Label>
            <span className="text-sm font-medium text-slate-900 text-right">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

