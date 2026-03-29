import React from "react";
import { CRMHeader } from "../components/CRMHeader";
import { KPICard, PieChart } from "../components/KPICard";
import { RevenueChart } from "../components/RevenueChart";
import { TopClients } from "../components/TopClients";
import { Users, Banknote, Briefcase } from "lucide-react";
import { IssueCards } from "../components/IssueCards";
import { useDashboardData } from "../hooks";

export const CrmDashboard: React.FC = () => {
  const {
    metrics,
    topClients,
    issues,
    isLoading,
    customerPct,
    revenuePct,
    jobsPct,
    formatCurrency,
  } = useDashboardData();

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      <CRMHeader currentTab="dashboard" />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-6 lg:mb-8">
            <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
              Enterprise Overview
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Real-time performance metrics and client health status.
            </p>
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="text-slate-500 font-medium flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin"></div>
                Đang tải dữ liệu Dashboard...
              </div>
            </div>
          ) : (
            <>
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
