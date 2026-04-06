import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNotaryDetail } from "../hooks/useNotaries";
import {
  Loader2,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Fingerprint,
  Ban,
} from "lucide-react";

// Tab Components
import { NotaryOverview } from "../components/details/tabs/NotaryOverview";
import { NotaryPersonalInfo } from "../components/details/tabs/NotaryPersonalInfo";
import { NotaryLegalCommission } from "../components/details/tabs/NotaryLegalCommission";
import { NotaryBondInsurance } from "../components/details/tabs/NotaryBondInsurance";
import { NotaryServiceCapability } from "../components/details/tabs/NotaryServiceCapability";
import { NotaryDocuments } from "../components/details/tabs/NotaryDocuments";
export const NotaryDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: notary, isLoading } = useNotaryDetail(id || "");

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="text-slate-500 font-medium">
          Loading notary information...
        </p>
      </div>
    );
  }

  if (!notary) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="bg-rose-50 p-6 rounded-full">
          <ArrowLeft className="h-12 w-12 text-rose-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">
            Notary Not Found
          </h2>
          <p className="text-slate-500 max-w-md">
            We couldn't find the notary profile you're looking for.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/admin/notaries">Return to List</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 bg-[#f8fbff]/30 min-h-screen">
      <div className="max-w-[1400px] mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 text-[15px]">
          <Link
            to="/admin/notaries"
            className="text-slate-900 font-bold hover:text-blue-600 transition-colors"
          >
            Notary Profile
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium">
            {notary.firstName} {notary.lastName}
          </span>
        </div>

        {/* Profile Summary Header - Matches FIGMA */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 relative">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex items-center gap-8">
              <Avatar className="h-24 w-24 border-[6px] border-slate-50 shadow-sm">
                <AvatarImage src={notary.image} />
                <AvatarFallback className="bg-slate-100 text-slate-400 text-3xl font-bold">
                  {notary.firstName[0]}
                  {notary.lastName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <h1 className="text-[32px] font-bold text-slate-900 tracking-tight">
                    {notary.firstName} {notary.lastName}
                  </h1>
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none px-4 py-1 rounded-full font-bold text-xs">
                    Active
                  </Badge>
                  <Badge className="bg-[#b3d334] text-white border-none px-4 py-1 rounded-full font-bold text-xs">
                    Rating: 4.8/5.0
                  </Badge>
                </div>

                <div className="flex items-center gap-x-8 gap-y-3 flex-wrap text-sm text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Fingerprint size={16} className="text-slate-300" />
                    <span>NTY-2026-0887</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-slate-300" />
                    <span>{notary.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-slate-300" />
                    <span>+1 (555) 234-567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-slate-300" />
                    <span>San Diego, California</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto self-start pt-2">
              <Button
                variant="outline"
                className="text-rose-400 border-rose-100 hover:bg-rose-50 hover:text-rose-500 rounded-2xl px-8 h-12 flex items-center gap-3 font-bold border-2 transition-all"
              >
                <Ban size={18} />
                Deactive
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-transparent border-b border-gray-100 w-full justify-start h-auto rounded-none p-0 gap-10 overflow-x-auto scrollbar-none">
            <TabsTrigger value="overview" className="tab-trigger">
              Overview
            </TabsTrigger>
            <TabsTrigger value="personal" className="tab-trigger">
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="legal-commission" className="tab-trigger">
              Legal & Commission
            </TabsTrigger>
            <TabsTrigger value="bond-insurance" className="tab-trigger">
              Bond & Insurance
            </TabsTrigger>
            <TabsTrigger value="capability" className="tab-trigger">
              Service Capability
            </TabsTrigger>
            <TabsTrigger value="documents" className="tab-trigger">
              Documents
            </TabsTrigger>
            <TabsTrigger value="audit" className="tab-trigger">
              Audit History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <NotaryOverview notaryId={notary.id} />
          </TabsContent>
          <TabsContent value="personal">
            <NotaryPersonalInfo notaryId={notary.id} />
          </TabsContent>
          <TabsContent value="legal-commission">
            <NotaryLegalCommission notaryId={notary.id} />
          </TabsContent>
          <TabsContent value="bond-insurance">
            <NotaryBondInsurance notaryId={notary.id} />
          </TabsContent>
          <TabsContent value="capability">
            <NotaryServiceCapability notaryId={notary.id} />
          </TabsContent>
          <TabsContent value="documents">
            <NotaryDocuments />
          </TabsContent>
        </Tabs>

        <style>{`
          .tab-trigger {
            background: transparent !important;
            padding: 0 0 20px 0 !important;
            border-bottom: 3px solid transparent !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            color: #94a3b8 !important;
            font-weight: 500 !important;
            font-size: 15px !important;
            transition: all 0.3s ease !important;
          }
          .tab-trigger[data-state="active"] {
            border-bottom-color: #2563eb !important;
            color: #2563eb !important;
            font-weight: 700 !important;
          }
          .tab-trigger:hover {
            color: #64748b !important;
          }
        `}</style>
      </div>
    </div>
  );
};
