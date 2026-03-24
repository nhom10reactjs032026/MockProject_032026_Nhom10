import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface CustomerProfileProps {
  customer?: {
    name: string;
    status: string;
    type: string;
    volume: string;
  };
}

export const CustomerProfile = ({
  customer = {
    name: "Global Logistics Corp",
    status: "ACTIVE",
    type: "B2B",
    volume: "High-Volume",
  },
}: CustomerProfileProps) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center md:gap-0">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-3 md:mb-3">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              {customer.name}
            </h2>
            <span className="rounded-full bg-green-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                {customer.status}
                </span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-600">
            <span className="rounded bg-slate-200 px-2 py-1">
                {customer.type}
                </span>
            <span className="rounded bg-slate-200 px-2 py-1">
                {customer.volume}
                </span>
          </div>
        </div>
        <Button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#1e3a8a] px-5 font-semibold text-white hover:bg-blue-800 md:w-auto">
          <Edit2 className="h-4 w-4" />
          Edit
        </Button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-slate-100 shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-bold text-slate-900">
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 sm:gap-y-8">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  HEADQUARTERS ADDRESS
                </p>
                <p className="text-sm font-medium leading-relaxed text-slate-900">
                  1221 Avenue of the Americas, Floor 42, New York, NY 10020
                </p>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  INDUSTRY SEGMENT
                </p>
                <p className="text-sm font-medium text-slate-900">
                  Supply Chain & Freight
                </p>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  TAX IDENTIFICATION NUMBER
                </p>
                <p className="text-sm font-medium text-slate-900">
                  NY-882-9910-X
                </p>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  PRIMARY CONTACT
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-sm font-bold text-orange-700">
                    SC
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-slate-900">
                      Sarah Chen
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                      Director of Operations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-none bg-[#0a1e62] shadow-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-[15px] font-normal text-white">
              Annual Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 flex items-end justify-between">
            <div className="space-y-6">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-200">
                  TOTAL JOBS COMPLETED
                </p>
                <p className="text-3xl font-bold text-white">1,422</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-200">
                  GENERATED REVENUE
                </p>
                <p className="text-3xl font-bold text-white">$2.84M</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-200">
                  AVG. TURNAROUND TIME
                </p>
                <p className="text-3xl font-bold text-white">
                  4.2{" "}
                  <span className="text-sm font-normal opacity-80">DAYS</span>
                </p>
              </div>
            </div>

            <div className="flex h-28 w-28 items-end justify-center gap-2 rounded-2xl bg-white/10 p-4">
              <div className="h-2/5 w-4 rounded-t-sm bg-white/20"></div>
              <div className="h-3/4 w-4 rounded-t-sm bg-white/20"></div>
              <div className="h-1/3 w-4 rounded-t-sm bg-white/20"></div>
              <div className="h-full w-4 rounded-t-sm bg-white/40"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-100 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-bold text-slate-900">
            Activity & Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative ml-2 space-y-8 border-l-2 border-slate-100 pb-4">
            {[
              {
                title: "Contract Renewed - Enterprise Tier",
                description:
                  "Renewal agreement finalized for FY24 including high-priority SLA and expanded API access limits.",
                date: "Oct 24, 2023",
                isRecent: true,
              },
              {
                title: "Support Ticket Resolved",
                description:
                  "Integration delay in the EMEA region resolved by engineering. Root cause: regional webhook timeout.",
                date: "Oct 18, 2023",
                isRecent: false,
              },
              {
                title: "Q3 Business Review Completed",
                description:
                  "Strategic alignment session with Sarah Chen. Customer satisfied with overall 12% increase in efficiency.",
                date: "Sept 30, 2023",
                isRecent: false,
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="relative flex items-start justify-between pl-8"
              >
                <span
                  className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-[3px] border-white ${
                    activity.isRecent ? "bg-[#1e3a8a]" : "bg-slate-300"
                  }`}
                ></span>

                <div className="max-w-[70%]">
                  <h4 className="mb-2 text-[13px] font-bold text-slate-900">
                    {activity.title}
                  </h4>
                  <p className="text-[13px] leading-relaxed text-slate-600">
                    {activity.description}
                  </p>
                </div>

                <div className="mt-1 text-xs font-medium text-slate-500">
                  {activity.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
