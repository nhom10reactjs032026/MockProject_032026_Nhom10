import React from "react";
import { CRMHeader } from "../components/CRMHeader";
import { KPICard, PieChart } from "../components/KPICard";
import { RevenueChart } from "../components/RevenueChart";
import { TopClients } from "../components/TopClients";
import { Users, Banknote, Briefcase } from "lucide-react";
import { IssueCards } from "../components/IssueCards";

export const CrmDashboard: React.FC = () => {
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

          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-6 lg:grid-cols-3 lg:gap-6">
            <KPICard
              title="TOTAL CUSTOMERS"
              value="1,000"
              icon={<Users size={18} />}
              subItems={[
                { label: "B2B", value: "(250)", color: "#60a5fa" },
                { label: "B2C", value: "(750)", color: "#22c55e" },
              ]}
              chart={
                <PieChart
                  percentage={75}
                  color="#22c55e"
                  secondaryColor="#60a5fa"
                />
              }
            />
            <KPICard
              title="REVENUE"
              value="$1.0M"
              icon={<Banknote size={18} />}
              subItems={[
                { label: "B2B", value: "($750.000)", color: "#3b82f6" },
                { label: "B2C", value: "($250.000)", color: "#22c55e" },
              ]}
              chart={
                <PieChart
                  percentage={55}
                  color="#3b82f6"
                  secondaryColor="#22c55e"
                />
              }
            />
            <div className="sm:col-span-2 lg:col-span-1">
              <KPICard
                title="JOB BY CUSTOMERS"
                value="5.000"
                icon={<Briefcase size={18} />}
                subItems={[
                  { label: "B2B", value: "(3750)", color: "#3b82f6" },
                  { label: "B2C", value: "(1250)", color: "#22c55e" },
                ]}
                chart={
                  <PieChart
                    percentage={65}
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
              <TopClients />
            </div>
          </div>

          <IssueCards />
        </div>
      </div>
    </div>
  );
};
