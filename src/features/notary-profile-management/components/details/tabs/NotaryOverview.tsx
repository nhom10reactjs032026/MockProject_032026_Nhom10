import { CheckCircle, Clock, Zap, FileText, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useNotaryDetail } from '../../../hooks/useNotaries';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

interface NotaryOverviewProps {
  notaryId: string;
}

export const NotaryOverview = ({ notaryId }: NotaryOverviewProps) => {
  const { data: notary, isLoading } = useNotaryDetail(notaryId);

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full rounded-3xl" />;
  }

  if (!notary) return null;

  const isInsuranceExpired = notary.insuranceStatus?.toLowerCase() === 'expired';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-10">
      {/* Expiry Alert */}
      {isInsuranceExpired && (
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3 text-rose-600">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm font-medium">
            <span className="font-bold">Insurance Expired —</span> This notary's insurance expired on {notary.insuranceExpiry || '2024-12-31'}. Action required before assignment.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Commission Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 text-lg">Commission</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-700 text-sm">Commission</p>
                <p className="text-[10px] text-slate-400 font-medium">Expires: {notary.expiryDate}</p>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none px-2 py-0 text-[10px] h-5">Valid</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-700 text-sm">Bond</p>
                <p className="text-[10px] text-slate-400 font-medium">$15,000 Coverage</p>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none px-2 py-0 text-[10px] h-5">Valid</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-700 text-sm">E&O Insurance</p>
                <p className="text-[10px] text-slate-400 font-medium">Expires: {notary.insuranceExpiry || 'Mar 22, 2025'}</p>
              </div>
              <Badge className={`${isInsuranceExpired ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'} border-none px-2 py-0 text-[10px] h-5`}>
                {notary.insuranceStatus}
              </Badge>
            </div>
          </div>
        </div>

        {/* Performance Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 text-lg">Performance</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <p className="text-slate-500 text-sm font-medium">Total Jobs Completed</p>
                <p className="text-2xl font-bold text-blue-600">{notary.totalReviews || 200}</p>
             </div>
             <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm font-medium">Error Rate</p>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <Clock size={10} /> 0.1% from last month
                  </p>
                </div>
                <p className="text-lg font-bold text-slate-700">0.3%</p>
             </div>
             <div className="flex justify-between items-center pt-2">
                <p className="text-slate-500 text-sm font-medium">Customer Rating</p>
                <div className="flex items-center gap-1.5">
                   <p className="text-lg font-bold text-slate-700">{notary.rating || 4.9}</p>
                   <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map(i => <Zap key={i} size={14} className="fill-current" />)}
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 text-lg">Recent Activity</h3>
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-700">Document notarized</p>
                <p className="text-[11px] text-slate-400">Power of Attorney - 2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                <CheckCircle size={16} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-700">Commission renewed</p>
                <p className="text-[11px] text-slate-400">Valid until Dec 2025 - 3 days ago</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                <AlertCircle size={16} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-slate-700">Insurance reminder</p>
                <p className="text-[11px] text-slate-400">E&O policy expires soon - 1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 text-lg">Contact Information</h3>
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                   <Mail size={18} />
                </div>
                <p className="text-slate-600 font-medium">{notary.email}</p>
             </div>
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                   <Phone size={18} />
                </div>
                <p className="text-slate-600 font-medium">{notary.phone}</p>
             </div>
             <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                   <MapPin size={18} />
                </div>
                <p className="text-slate-600 font-medium">
                  {notary.addressLine1}, {notary.city}, {notary.state} {notary.zipCode}
                </p>
             </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-slate-800 text-lg mb-6">Service Areas</h3>
          <div className="flex flex-wrap gap-3">
             {['Travis County', 'Williamson County', 'Hays County', 'Bastrop County'].map(area => (
               <Badge key={area} variant="secondary" className="bg-blue-50 text-blue-600 border-none px-4 py-2 rounded-xl font-medium">
                 {area}
               </Badge>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
