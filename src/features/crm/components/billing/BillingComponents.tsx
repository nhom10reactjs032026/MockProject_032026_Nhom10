import type { InvoiceStatus } from '../../types';
import { MoreVertical, Plus, HelpCircle, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_INVOICES, MOCK_PAYMENT_METHODS } from '../../constants/mockData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Stats Cards ---
export function BillingStatsCards() {
  const stats = [
    { label: 'TOTAL', value: '$12,450.00', color: 'border-blue-600' },
    { label: '1-60 DAYS OVERDUE', value: '$3,200.00', color: 'border-orange-400' },
    { label: '60+ DAYS OVERDUE', value: '$9,250.00', color: 'border-red-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className={cn("absolute left-0 top-0 bottom-0 w-1", stat.color)} />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
          <p className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

// --- Invoice Status Badge ---
function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const styles: Record<InvoiceStatus, string> = {
    'Paid': 'bg-green-500 text-white border-transparent',
    'Overdue': 'bg-red-500 text-white border-transparent',
    'Unpaid': 'bg-orange-500 text-white border-transparent',
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[9px] font-bold border inline-block whitespace-nowrap shadow-sm",
      styles[status]
    )}>
      {status}
    </span>
  );
}

// --- Invoice Table ---
export function InvoiceListTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
      <div className="px-6 py-5 flex items-center justify-between border-b border-gray-50">
        <h3 className="font-bold text-slate-800">Invoice List</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md text-[11px] font-bold text-slate-500 hover:bg-slate-50 transition-all">
          <Filter size={12} strokeWidth={3} />
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50/50">
            <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-widest text-left">
              <th className="px-6 py-4">Invoice ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {MOCK_INVOICES.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-5 text-sm font-bold text-blue-600 hover:underline cursor-pointer">{invoice.id}</td>
                <td className="px-6 py-5 text-sm text-slate-500 font-medium">{invoice.date}</td>
                <td className="px-6 py-5 text-sm font-black text-slate-800">{invoice.amount}</td>
                <td className="px-6 py-5 text-center">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-1 text-slate-400 hover:text-slate-600 transition-all">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Pagination */}
      <div className="px-6 py-4 bg-slate-50/30 flex items-center justify-between border-t border-gray-50">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing 1-10 of 422 invoices</p>
        <div className="flex gap-1.5">
          <button className="p-1 text-slate-300 hover:text-slate-500"><ChevronLeft size={16} /></button>
          <button className="w-6 h-6 flex items-center justify-center bg-blue-900 text-white rounded text-[10px] font-bold">1</button>
          <button className="w-6 h-6 flex items-center justify-center text-slate-600 text-[10px] font-bold hover:bg-slate-100">2</button>
          <button className="w-6 h-6 flex items-center justify-center text-slate-600 text-[10px] font-bold hover:bg-slate-100">3</button>
          <span className="text-slate-300 px-1">...</span>
          <button className="w-6 h-6 flex items-center justify-center text-slate-600 text-[10px] font-bold hover:bg-slate-100">42</button>
          <button className="p-1 text-slate-300 hover:text-slate-500"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// --- Payment MethodsSection ---
export function PaymentMethodsSection() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="px-6 py-4 bg-slate-100/50 flex items-center justify-between border-b border-gray-50">
        <h3 className="font-bold text-slate-800 text-sm">Payment Methods</h3>
        <button className="flex items-center gap-1.5 bg-blue-900 text-white px-3 py-1.5 rounded-md text-[10px] font-bold hover:bg-blue-800 transition-all shadow-sm">
          <Plus size={12} strokeWidth={3} />
          Add Method
        </button>
      </div>

      <div className="p-6 space-y-4">
        {MOCK_PAYMENT_METHODS.map((method) => (
          <div key={method.id} className="flex items-center gap-6 group">
            {/* Card Logo Placeholder (I will generate images in next step) */}
            <div className="w-14 h-9 rounded-lg border border-gray-100 bg-white flex items-center justify-center shadow-sm group-hover:shadow transition-all overflow-hidden p-1">
              {method.type === 'Visa' ? (
                <span className="text-blue-800 font-black italic text-sm tracking-tighter">VISA</span>
              ) : (
                <div className="flex items-center gap-1 opacity-80">
                   <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                   <span className="text-[10px] font-bold text-slate-800">Pay</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-500">**** {method.lastFour}</span>
                {method.isDefault && (
                  <span className="text-[10px] text-slate-400 font-medium">(Default)</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BillingHelpFooter() {
  return (
    <div className="mt-12 flex items-center gap-2 text-[11px] font-medium text-slate-500 group cursor-pointer hover:text-blue-600 transition-colors">
      <HelpCircle size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
      <span>Need help with your billing? <span className="text-blue-600 font-bold hover:underline">Contact Support</span></span>
    </div>
  );
}
