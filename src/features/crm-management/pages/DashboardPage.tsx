import { Link } from "react-router-dom";
import { Users, Banknote, Briefcase, ArrowLeft } from "lucide-react";
import { CRMHeader } from "../components/CRMHeader";
import { KPICard, PieChart } from "../components/KPICard";
import { RevenueChart } from "../components/RevenueChart";
import { TopClients } from "../components/TopClients";
import { HolidayBanner } from "../components/HolidayBanner";
import { IssueCards } from "../components/IssueCards";
import { useDashboardData } from "../hooks";

/**
 * Main CRM Dashboard Page.
 * Acts as a Smart Component, utilizing useDashboardData hook to manage logic,
 * and passing data down to Dumb Components for rendering.
 */
export const CrmDashboard: React.FC = () => {
  const {
    metrics,
    topClients,
    issues,
    isLoading,
    error,
    customerPct,
    revenuePct,
    jobsPct,
    formatCurrency,
    holiday,
  } = useDashboardData();

  // 1. Error State Fallback UI
  // Displayed if any API request fails during the initial load
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
        <CRMHeader currentTab="dashboard" />
        <div className="flex flex-1 items-center justify-center p-8">
          <div className="flex flex-col items-center max-w-md text-center bg-white p-8 rounded-2xl shadow-sm border border-red-100">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold">!</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Connection Error
            </h2>
            <p className="text-sm text-slate-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#1a1a1a] text-white text-sm font-bold rounded-lg hover:bg-black transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Render (Loading & Success States)
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      <CRMHeader currentTab="dashboard" />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {!isLoading && <HolidayBanner data={holiday} />}
          <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                Enterprise Overview
              </h1>
              <p className="text-sm font-medium text-slate-500">
                Real-time performance metrics and client health status.
              </p>
            </div>
            <Link
              to="/admin/notaries"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm w-fit"
            >
              <ArrowLeft size={16} />
              Back to Notary Profile
            </Link>
          </div>

          {/* Conditional Rendering: Show spinner while fetching, else show dashboard grid */}
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="text-slate-500 font-medium flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin"></div>
                Đang tải dữ liệu Dashboard...
              </div>
            </div>
          ) : (
            <>
              {/* Top Row: KPI Cards with derived percentages */}
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-6 lg:grid-cols-3 lg:gap-6">
                <KPICard
                  title="TOTAL CUSTOMERS"
                  value={metrics?.totalCustomers?.toLocaleString() || "0"}
                  icon={<Users size={18} />}
                  subItems={[
                    {
                      label: "B2B",
                      value: `(${metrics?.customers?.b2b?.toLocaleString() || 0})`,
                      color: "#3b82f6",
                    },
                    {
                      label: "B2C",
                      value: `(${metrics?.customers?.b2c?.toLocaleString() || 0})`,
                      color: "#22c55e",
                    },
                  ]}
                  chart={
                    <PieChart
                      percentage={customerPct}
                      color="#3b82f6"
                      secondaryColor="#22c55e"
                    />
                  }
                />
                <KPICard
                  title="REVENUE"
                  value={`$${((metrics?.totalRevenue || 0) / 1000000).toFixed(1)}M`}
                  icon={<Banknote size={18} />}
                  subItems={[
                    {
                      label: "B2B",
                      value: `(${formatCurrency(metrics?.b2bRevenue)})`,
                      color: "#3b82f6",
                    },
                    {
                      label: "B2C",
                      value: `(${formatCurrency(metrics?.b2cRevenue)})`,
                      color: "#22c55e",
                    },
                  ]}
                  chart={
                    <PieChart
                      percentage={revenuePct}
                      color="#3b82f6"
                      secondaryColor="#22c55e"
                    />
                  }
                />
                <div className="sm:col-span-2 lg:col-span-1">
                  <KPICard
                    title="JOB BY CUSTOMERS"
                    value={metrics?.jobsByCustomers?.toLocaleString() || "0"}
                    icon={<Briefcase size={18} />}
                    subItems={[
                      {
                        label: "B2B",
                        value: `(${metrics?.jobs?.b2b?.toLocaleString() || 0})`,
                        color: "#3b82f6",
                      },
                      {
                        label: "B2C",
                        value: `(${metrics?.jobs?.b2c?.toLocaleString() || 0})`,
                        color: "#22c55e",
                      },
                    ]}
                    chart={
                      <PieChart
                        percentage={jobsPct}
                        color="#3b82f6"
                        secondaryColor="#22c55e"
                      />
                    }
                  />
                </div>
              </div>

              {/* Middle Row: Charts & Top Clients */}
              <div className="mb-4 grid grid-cols-1 gap-4 lg:mb-6 lg:grid-cols-10 lg:gap-6">
                <div className="lg:col-span-7">
                  <RevenueChart />
                </div>
                <div className="lg:col-span-3">
                  <TopClients clients={topClients} />
                </div>
              </div>

              <IssueCards
                invoices={issues.invoices}
                contracts={issues.contracts}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
