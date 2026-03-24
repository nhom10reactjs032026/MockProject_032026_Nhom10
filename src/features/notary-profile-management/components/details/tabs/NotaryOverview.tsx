import { Shield, FileText, Globe, Medal, CheckCircle, Activity, Clock, Zap } from 'lucide-react';

export const NotaryOverview = () => {
  const stats = [
    { label: 'Total Jobs', value: '1,248', icon: <FileText size={20} className="text-blue-500" />, color: 'bg-blue-50' },
    { label: 'Completion Rate', value: '98.5%', icon: <CheckCircle size={20} className="text-emerald-500" />, color: 'bg-emerald-50' },
    { label: 'Response Time', value: '15m', icon: <Clock size={20} className="text-amber-500" />, color: 'bg-amber-50' },
    { label: 'Activity Score', value: '94/100', icon: <Activity size={20} className="text-rose-500" />, color: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-slate-200 transition-all hover:scale-[1.02]">
            <div className={`h-11 w-11 ${stat.color} rounded-2xl flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm h-full flex flex-col justify-center gap-6">
            <div className="flex items-center gap-4">
               <div className="h-12 w-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center shrink-0">
                  <Medal size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-xl text-slate-800 tracking-tight">Expert Certification Portfolio</h3>
                  <p className="text-sm text-slate-400 font-medium">Verified by Notary Public Commission since 2022</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <Shield className="text-blue-600 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-slate-700 text-sm">Background Check</p>
                    <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-wider">Cleared & Valid</p>
                  </div>
               </div>
               <div className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex items-center gap-4">
                  <Globe className="text-indigo-600 shrink-0" size={20} />
                  <div>
                    <p className="font-bold text-slate-700 text-sm">States Covered</p>
                    <p className="text-[11px] text-indigo-600 font-bold uppercase tracking-wider">CA, NY, TX, WA</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-200/50 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10 space-y-2">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Subscription Tier</p>
               <h3 className="text-3xl font-bold tracking-tight">Pro Plan</h3>
            </div>
            
            <div className="relative z-10 pt-10">
               <div className="flex items-baseline gap-1">
                 <span className="text-4xl font-bold">$12.5k</span>
                 <span className="text-xs opacity-70 font-medium whitespace-nowrap">YTD Earnings</span>
               </div>
               <p className="text-[11px] opacity-60 font-medium pt-2 uppercase tracking-wide">Next billing: Sep 2025</p>
            </div>
            
            <Zap className="absolute -right-4 -bottom-4 text-white opacity-10 h-32 w-32 group-hover:scale-110 transition-transform duration-700" />
         </div>
      </div>
      
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
         <h3 className="font-bold text-slate-800 text-lg mb-6">Recent Performance Analytics</h3>
         <div className="h-[200px] flex items-center justify-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm italic">
            Visual data chart coming soon... (using Recharts / ChartJS)
         </div>
      </div>
    </div>
  );
};
