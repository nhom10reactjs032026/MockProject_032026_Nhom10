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
import { useNotarialJournalDashboard } from "../api";
import { formatCurrency } from "../utils/format";
import { LoadingState } from "../components/ui/LoadingState";
import { ErrorState } from "../components/ui/ErrorState";
import { ErrorBoundary } from "../components/ui/ErrorBoundary";

export const NotaryJournalDashboard = () => {
  const { data, isLoading, isError, refetch } = useNotarialJournalDashboard();

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
      change: data ? "+Live" : "…",
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
      change: data ? "+Live" : "…",
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
      change: data ? "+Live" : "…",
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
      change: data ? "Overall" : "…",
      trend: "neutral" as const,
      icon: BadgeCheck,
      iconColor: "text-foreground",
      iconBg: "bg-secondary/50",
      changeBg: "bg-transparent",
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
              <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
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
            <select className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] cursor-pointer text-foreground h-11 sm:h-10 w-full sm:w-auto">
              <option>All States</option>
            </select>
            <select className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] cursor-pointer text-foreground h-11 sm:h-10 w-full sm:w-auto">
              <option>All Offices</option>
            </select>
            <select className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-md px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] cursor-pointer text-foreground h-11 sm:h-10 w-full sm:w-auto">
              <option>Last 30 Days</option>
            </select>
            <button className="text-[12px] font-bold text-[#c4a484] hover:opacity-80 transition-opacity ml-0 sm:ml-2 mt-2 sm:mt-0 py-2 sm:py-0 text-center w-full sm:w-auto">
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

          <RecentComplianceLogs />

          <RegionalChartSummary />
        </div>
      </section>
    </div>
    </ErrorBoundary>
  );
};
