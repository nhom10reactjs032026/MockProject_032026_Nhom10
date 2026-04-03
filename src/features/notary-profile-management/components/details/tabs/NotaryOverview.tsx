import { CheckCircle, Clock, Zap, FileText, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useNotaryDetail } from '../../../hooks/useNotaries';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface NotaryOverviewProps {
  notaryId: string;
}

export const NotaryOverview = ({ notaryId }: NotaryOverviewProps) => {
  const { data: notary, isLoading } = useNotaryDetail(notaryId);
  const [activeArea, setActiveArea] = useState<string | null>(null);

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full rounded-[2.5rem]" />;
  }

  if (!notary) return null;

  const isInsuranceExpired = notary.insuranceStatus?.toLowerCase() === 'expired';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 pb-16">
      {/* Expiry Alert */}
      {isInsuranceExpired && (
        <div className="bg-rose-50 border border-rose-100 p-5 rounded-3xl flex items-center gap-4 text-rose-600 shadow-xl shadow-rose-50/50 animate-pulse">
          <AlertCircle size={24} className="shrink-0" />
          <div className="space-y-0.5">
             <p className="text-base font-black uppercase tracking-wider">Critical: Insurance Expired</p>
             <p className="text-sm font-medium opacity-80">
               This notary's insurance expired on <span className="font-bold underline">{notary.insuranceExpiry || '2024-12-31'}</span>. Policy renewal is required before further assignments.
             </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Commission Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 hover:shadow-xl transition-all duration-500 group">
          <h3 className="font-bold text-slate-900 text-xl tracking-tight group-hover:text-blue-600 transition-colors">Commission & Bonds</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center group/item hover:translate-x-2 transition-transform">
              <div>
                <p className="font-bold text-slate-800 text-[15px]">State Commission</p>
                <p className="text-xs text-slate-400 font-medium">Expires: {notary.expiryDate}</p>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 py-1 text-[10px] font-bold uppercase rounded-full">Active</Badge>
            </div>
            <div className="flex justify-between items-center group/item hover:translate-x-2 transition-transform">
              <div>
                <p className="font-bold text-slate-800 text-[15px]">Notary Bond</p>
                <p className="text-xs text-slate-400 font-medium">$15,000 Verified Coverage</p>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 py-1 text-[10px] font-bold uppercase rounded-full">Valid</Badge>
            </div>
            <div className="flex justify-between items-center group/item hover:translate-x-2 transition-transform">
              <div>
                <p className="font-bold text-slate-800 text-[15px]">E&O Insurance</p>
                <p className="text-xs text-slate-400 font-medium">Expires: {notary.insuranceExpiry || 'Mar 22, 2025'}</p>
              </div>
              <Badge className={`${isInsuranceExpired ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'} border-none px-3 py-1 text-[10px] font-bold uppercase rounded-full`}>
                {notary.insuranceStatus}
              </Badge>
            </div>
          </div>
        </div>

        {/* Performance Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 hover:shadow-xl transition-all duration-500 group">
          <h3 className="font-bold text-slate-900 text-xl tracking-tight group-hover:text-amber-500 transition-colors">Career Performance</h3>
          <div className="space-y-6">
             <div className="flex justify-between items-end border-b border-gray-50 pb-4">
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest text-[10px]">Total Completions</p>
                <p className="text-4xl font-black text-blue-600 tracking-tighter leading-none">{notary.totalReviews || 248}</p>
             </div>
             <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-800 font-bold text-[15px]">Efficiency Rate</p>
                  <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
                    <Clock size={12} /> +2.4% from last quarter
                  </p>
                </div>
                <p className="text-2xl font-black text-slate-900 tracking-tighter">98.6%</p>
             </div>
             <div className="flex justify-between items-center pt-2">
                <p className="text-slate-800 font-bold text-[15px]">Public Trust Score</p>
                <div className="flex flex-col items-end gap-1.5">
                   <div className="flex text-amber-400 gap-1">
                      {[1, 2, 3, 4, 5].map(i => <Zap key={i} size={16} className={i <= 4 ? "fill-current" : "opacity-30"} />)}
                   </div>
                   <p className="text-sm font-black text-slate-900">{notary.rating?.toFixed(1) || 4.9} / 5.0</p>
                </div>
             </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 hover:shadow-xl transition-all duration-500 group">
          <h3 className="font-bold text-slate-900 text-xl tracking-tight group-hover:text-emerald-600 transition-colors">Digital Audit Trail</h3>
          <div className="space-y-6">
            <div className="flex gap-4 group/activity">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover/activity:rotate-12 transition-transform shadow-sm">
                <FileText size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[15px] font-bold text-slate-800">RON session completed</p>
                <p className="text-[12px] text-slate-400 font-medium italic">Loan Modification — 2h ago</p>
              </div>
            </div>
            <div className="flex gap-4 group/activity">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover/activity:rotate-12 transition-transform shadow-sm">
                <CheckCircle size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[15px] font-bold text-slate-800">Identity re-verified</p>
                <p className="text-[12px] text-slate-400 font-medium italic">Biometric check success — 3d ago</p>
              </div>
            </div>
            <div className="flex gap-4 group/activity">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0 group-hover/activity:rotate-12 transition-transform shadow-sm animate-pulse">
                <AlertCircle size={20} />
              </div>
              <div className="space-y-1">
                <p className="text-[15px] font-bold text-slate-800">System check notice</p>
                <p className="text-[12px] text-slate-400 font-medium italic">E&O policy update pending — 1w ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8 group">
          <h3 className="font-bold text-slate-900 text-2xl tracking-tight flex items-center gap-3">
             Contact Gateway
             <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          </h3>
          <div className="grid grid-cols-1 gap-6">
             <div className="flex items-center gap-5 p-4 rounded-3xl bg-slate-50/50 border border-slate-100 group-hover:translate-x-2 transition-transform">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover:text-blue-600 transition-colors">
                   <Mail size={22} />
                </div>
                <div className="space-y-0.5">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Delivery</p>
                   <p className="text-slate-800 font-bold text-base">{notary.email}</p>
                </div>
             </div>
             <div className="flex items-center gap-5 p-4 rounded-3xl bg-slate-50/50 border border-slate-100 group-hover:translate-x-2 transition-transform">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover:text-emerald-600 transition-colors">
                   <Phone size={22} />
                </div>
                <div className="space-y-0.5">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Direct Line</p>
                   <p className="text-slate-800 font-bold text-base">{notary.phone}</p>
                </div>
             </div>
             <div className="flex items-center gap-5 p-4 rounded-3xl bg-slate-50/50 border border-slate-100 group-hover:translate-x-2 transition-transform">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-sm group-hover:text-rose-500 transition-colors">
                   <MapPin size={22} />
                </div>
                <div className="space-y-0.5">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Office HQ</p>
                   <p className="text-slate-800 font-bold text-base leading-tight">
                     {notary.addressLine1}, {notary.city},<br />{notary.state} {notary.zipCode}
                   </p>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group">
          <div className="flex justify-between items-center mb-8">
             <h3 className="font-bold text-slate-900 text-2xl tracking-tight">Active Coverage Areas</h3>
             <Badge className="bg-blue-600 text-white border-none px-4 py-1.5 rounded-2xl font-bold uppercase tracking-wider text-[10px]">
                {notary.state}
             </Badge>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
             {['Travis County', 'Williamson County', 'Hays County', 'Bastrop County'].map(area => (
               <button 
                 key={area} 
                 onClick={() => setActiveArea(area)}
                 className={`group/area relative h-14 px-8 rounded-[1.25rem] font-bold text-sm transition-all flex items-center justify-center border-2 ${
                   activeArea === area 
                     ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200' 
                     : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-blue-200 hover:text-blue-600'
                 }`}
               >
                 {area}
                 {activeArea === area && (
                    <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in-50 duration-300">
                       <CheckCircle size={14} className="fill-current" />
                    </span>
                 )}
               </button>
             ))}
          </div>
          <p className="mt-auto pt-10 text-xs text-slate-400 font-medium italic">
             {activeArea ? `Currently showing stats for ${activeArea}.` : 'Click on a county to filter specific service metrics.'}
          </p>
        </div>
      </div>
    </div>
  );
};
