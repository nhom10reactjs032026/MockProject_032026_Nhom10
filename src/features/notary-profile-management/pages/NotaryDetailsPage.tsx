import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Tab Components
import { NotaryOverview } from '../components/details/tabs/NotaryOverview';
import { NotaryPersonalInfo } from '../components/details/tabs/NotaryPersonalInfo';
import { NotaryLegalCommission } from '../components/details/tabs/NotaryLegalCommission';

export const NotaryDetailsPage = () => {
  const { id } = useParams();

  // Mock data for header (Nguyen Duc)
  const notaryData = {
    id: id || '#8829',
    name: 'Nguyen Duc',
    status: 'Active',
    rating: 4.8,
    totalRating: 5.0,
    email: 'nguyendachued@gmail.com',
    phone: '+1 (555) 234-567',
    address: 'San Deigo, California',
    commissionNumber: 'NTY-2026-0887',
  };

  return (
    <div className="animate-in fade-in duration-500 font-['Plus_Jakarta_Sans']">
      <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-transparent">
        {/* Breadcrumbs / Back button */}
        <div className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-widest text-[#c4a484]/70">
          <Link to="/admin/notaries" className="hover:text-[#c4a484] transition-colors">
            Notary Profile
          </Link>
          <span className="opacity-60 text-sm">/</span>
          <span className="opacity-80 text-[#c4a484]">{notaryData.name}</span>
        </div>

        {/* Profile Summary Header */}
        <div className="bg-white rounded-sm p-8 border border-[#ebebeb] shadow-sm mb-6 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border border-[#ebebeb] shadow-sm rounded-sm">
                 <AvatarImage src="" />
                 <AvatarFallback className="bg-[#fdf6ef] text-[#c4a484] text-2xl font-bold rounded-sm">ND</AvatarFallback>
              </Avatar>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{notaryData.name}</h1>
                   <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 font-semibold uppercase text-[10px] rounded-sm tracking-widest">
                     {notaryData.status}
                   </Badge>
                   <Badge className="bg-[#c4a484] text-white border-none px-3 font-bold text-[10px] space-x-1 rounded-sm tracking-widest">
                     <span>Rating:</span> {notaryData.rating}/{notaryData.totalRating}
                   </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-8 text-sm text-slate-400 font-medium tracking-wide">
                  <div className="flex items-center gap-2">
                    <span className="opacity-60">ID:</span>
                    <span className="text-slate-500 font-bold">{notaryData.commissionNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="opacity-60">Email:</span>
                    <span className="text-slate-500 font-bold">{notaryData.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="opacity-60">Phone:</span>
                    <span className="text-slate-500 font-bold">{notaryData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="opacity-60">Address:</span>
                    <span className="text-slate-500 font-bold">{notaryData.address}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto flex justify-end">
              <Button variant="outline" className="text-rose-400 border-rose-100 hover:bg-rose-50 hover:text-rose-500 px-6 font-bold h-11 border-2 uppercase tracking-widest text-xs rounded-sm">
                Deactivate
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="legal-commission" className="space-y-6">
          <TabsList className="bg-transparent border-b border-[#ebebeb] w-full justify-start h-auto rounded-none p-0 gap-8">
            <TabsTrigger value="overview" className="tab-trigger">Overview</TabsTrigger>
            <TabsTrigger value="personal" className="tab-trigger">Personal Information</TabsTrigger>
            <TabsTrigger value="legal-commission" className="tab-trigger">Legal & Commission</TabsTrigger>
            <TabsTrigger value="bond-insurance" className="tab-trigger">Bond & Insurance</TabsTrigger>
            <TabsTrigger value="capability" className="tab-trigger">Service Capability</TabsTrigger>
            <TabsTrigger value="documents" className="tab-trigger">Documents</TabsTrigger>
            <TabsTrigger value="audit" className="tab-trigger">Audit History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <NotaryOverview />
          </TabsContent>
          <TabsContent value="personal">
            <NotaryPersonalInfo />
          </TabsContent>
          <TabsContent value="legal-commission">
            <NotaryLegalCommission />
          </TabsContent>
          <TabsContent value="bond-insurance">
            <div className="bg-white p-20 text-center rounded-sm border border-[#ebebeb] text-[#c4a484] italic font-medium mt-6">SC_005 Coming soon...</div>
          </TabsContent>
        </Tabs>

        <style>{`
          .tab-trigger {
            @apply relative pb-4 px-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:text-[#c4a484] data-[state=active]:font-bold data-[state=active]:shadow-none font-bold text-muted-foreground uppercase tracking-widest text-[11px] transition-all border-b-2 border-transparent data-[state=active]:border-[#c4a484];
          }
        `}</style>
      </div>
    </div>
  );
};
