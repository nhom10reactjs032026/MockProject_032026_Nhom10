import { Badge } from '@/components/ui/badge';

export const NotaryPersonalInfo = () => {
  const profileItems = [
    { label: 'First Name', value: 'Nguyen', group: 'Basic Information' },
    { label: 'Last Name', value: 'Duc', group: 'Basic Information' },
    { label: 'Middle Name', value: 'None', group: 'Basic Information' },
    { label: 'Email Address', value: 'nguyendanceud@gmail.com', group: 'Contact Details' },
    { label: 'Phone Number', value: '(555) 234-5678', group: 'Contact Details' },
    { label: 'Street Address', value: '123 Business Way', group: 'Address' },
    { label: 'City', value: 'San Diego', group: 'Address' },
    { label: 'State', value: 'California', group: 'Address' },
    { label: 'Zip Code', value: '92101', group: 'Address' },
    { label: 'Date of Birth', value: '1988-05-15', group: 'Basic Information' },
    { label: 'Social Security', value: '***-**-6789', group: 'Basic Information' },
  ];

  const groups = Array.from(new Set(profileItems.map(item => item.group)));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {groups.map((group) => (
        <div key={group} className="space-y-4">
           <div className="flex items-center gap-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-400 whitespace-nowrap">{group}</h3>
              <div className="h-px bg-gray-100 w-full"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profileItems.filter(item => item.group === group).map((item) => (
                <div key={item.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 transition-colors">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{item.label}</p>
                  <p className="text-slate-800 font-bold text-lg">{item.value}</p>
                </div>
              ))}
           </div>
        </div>
      ))}
      
      <div className="bg-blue-50/30 p-8 rounded-3xl border border-blue-50 flex items-start gap-6 mb-10">
         <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
           <Badge className="bg-transparent text-white border-none font-bold text-lg p-0">!</Badge>
         </div>
         <div className="space-y-1">
           <h4 className="font-bold text-slate-800">Verification Pending</h4>
           <p className="text-sm text-slate-500 font-medium">Some fields were recently updated and are pending administrative verification. The changes will be visible on public profile once approved.</p>
         </div>
      </div>
    </div>
  );
};
