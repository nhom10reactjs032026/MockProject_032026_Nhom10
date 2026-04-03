import { StatCard } from "../components/StatCard";
import { ComplianceAlerts } from "../components/ComplianceAlerts";
import { RecentComplianceLogs } from "../components/RecentComplianceLogs";
import { RegionalChartSummary } from "../components/RegionalChartSummary";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  BadgeCheck,
  BookOpen,
  Download,
  Plus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNotarialJournalDashboard, useStates } from "../api";
import { FILTER_OFFICES } from "../mock/filterData";
import { formatCurrency } from "../utils/format";
import { LoadingState } from "../../../components/common/errors/LoadingState";
import { ErrorState } from "../../../components/common/errors/ErrorState";
import { ErrorBoundary } from "../../../components/common/errors/ErrorBoundary";
import { withAdminGuard } from "../hocs/withAdminGuard";

const NotaryJournalDashboardBase = () => {
  const [stateCode, setStateCode] = useState("All States");
  const [officeId, setOfficeId] = useState("All Offices");

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  });

  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const { data, isLoading, isError, refetch } = useNotarialJournalDashboard({
    stateCode: stateCode === "All States" ? undefined : stateCode,
    notaryId: officeId === "All Offices" ? undefined : officeId,
    startDate,
    endDate,
  });

  const { data: states } = useStates();

  if (isLoading) {
    return (
      <div className="p-8">
        <LoadingState message="Loading dashboard data..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8">
        <ErrorState
          title="Failed to load dashboard"
          message="There was an issue loading the dashboard data. Please try again."
          retry={() => refetch()}
        />
      </div>
    );
  }

  const stats = [
    {
      title: "Total Journal Entries",
      value: data ? data.totalJournalEntries.toLocaleString() : "-",
      change: data ? data.totalJournalEntriesChange : "…",
      trend: "neutral" as const,
      icon: BookOpen,
      iconColor: "text-[#c4a484]",
      iconBg: "bg-[#c4a484]/10",
      changeBg: "bg-[#c4a484]/10",
      changeText: "text-[#c4a484]",
    },
    {
      title: "Action Required",
      value: data ? data.countsByStatus.actionRequired.toLocaleString() : "-",
      change: data ? data.countsByStatus.actionRequiredChange : "…",
      trend: "neutral" as const,
      icon: AlertCircle,
      iconColor: "text-red-500",
      iconBg: "bg-red-50",
      changeBg: "bg-red-50",
      changeText: "text-red-600",
    },
    {
      title: "Active Notaries",
      value: data ? data.activeNotaries.toLocaleString() : "-",
      change: data ? data.activeNotariesChange : "…",
      trend: "neutral" as const,
      icon: Users,
      iconColor: "text-[#c4a484]",
      iconBg: "bg-[#c4a484]/10",
      changeBg: "bg-[#c4a484]/10",
      changeText: "text-[#c4a484]",
    },
    {
      title: "Total Fees Collected",
      value: data ? formatCurrency(data.totalFeesCollected) : "-",
      change: data ? data.totalFeesCollectedChange : "…",
      trend: "neutral" as const,
      icon: BadgeCheck,
      iconColor: "text-foreground",
      iconBg: "bg-secondary/50",
      changeBg: "bg-secondary/10",
      changeText: "text-muted-foreground",
    },
  ];

  return (
    <ErrorBoundary fallbackMessage="Failed to render dashboard">
      <div className="transition-colors duration-500 font-['Plus_Jakarta_Sans']">
        {/* Main Content Section */}
        <section className="py-8 px-6 flex-1">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Dashboard
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  High-Level overview of company-wide journal integrity and
                  regulatory status
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
                <Button
                  variant="outline"
                  className="bg-white border-[#ebebeb] text-foreground font-bold h-11 px-6 flex items-center justify-center gap-2 hover:bg-white/50 text-xs uppercase tracking-widest transition-all w-full sm:w-auto"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </Button>
                <Button className="bg-[#c4a484] hover:bg-[#b08e6d] text-white font-bold h-11 px-6 flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all shadow-md w-full sm:w-auto">
                  <Plus className="w-4 h-4" />
                  New Audit
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 sm:p-6 border border-[#ebebeb] shadow-sm flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 rounded-xl">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 hidden sm:inline-block">
                FILTER:
              </span>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] cursor-pointer text-foreground h-11 sm:h-10 w-full sm:w-auto"
              >
                <option value="All States">All States</option>
                {states?.map((state) => (
                  <option key={state.stateCode} value={state.stateCode}>
                    {state.stateCode} - {state.stateName}
                  </option>
                ))}
              </select>
              <select
                value={officeId}
                onChange={(e) => setOfficeId(e.target.value)}
                className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] cursor-pointer text-foreground h-11 sm:h-10 w-full sm:w-auto"
              >
                <option value="All Offices">All Offices</option>
                {FILTER_OFFICES.map((office) => (
                  <option key={office.id} value={office.id}>
                    {office.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] text-foreground h-11 sm:h-10 w-full sm:w-auto"
                />
                <span className="hidden sm:inline-block text-muted-foreground">
                  -
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] text-foreground h-11 sm:h-10 w-full sm:w-auto"
                />
              </div>
              <button
                onClick={() => {
                  setStateCode("All States");
                  setOfficeId("All Offices");
                  const d = new Date();
                  setEndDate(d.toISOString().split("T")[0]);
                  d.setDate(d.getDate() - 30);
                  setStartDate(d.toISOString().split("T")[0]);
                }}
                className="text-[12px] font-bold text-[#c4a484] hover:opacity-80 transition-opacity ml-0 sm:ml-2 mt-2 sm:mt-0 py-2 sm:py-0 text-center w-full sm:w-auto cursor-pointer"
              >
                Clear Filter
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>

            <ComplianceAlerts />

            <RecentComplianceLogs
              stateCode={stateCode}
              notaryId={officeId}
              startDate={startDate}
              endDate={endDate}
            />

            <RegionalChartSummary />
          </div>
        </section>
      </div>
    </ErrorBoundary>
  );
};

export const NotaryJournalDashboard = withAdminGuard(
  NotaryJournalDashboardBase,
  { type: "redirect", to: "/notary-journal/manager" },
);
