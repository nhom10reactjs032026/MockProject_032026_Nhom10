import { useState, useEffect } from "react";
import {
  fetchDashboardMetrics,
  fetchTopClients,
  fetchIssueCardsData,
  fetchHolidaySchedule,
} from "../api/crm.api";
import type {
  DashboardMetrics,
  TopClientData,
  OverdueInvoice,
  ContractExpiring,
  HolidayAnnouncement,
} from "../types";

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>();
  const [holiday, setHoliday] = useState<HolidayAnnouncement>();
  const [topClients, setTopClients] = useState<TopClientData[]>([]);
  const [issues, setIssues] = useState<{
    invoices: OverdueInvoice[];
    contracts: ContractExpiring[];
  }>({
    invoices: [],
    contracts: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [metricsData, clientsData, issuesData, holidayData] =
          await Promise.all([
            fetchDashboardMetrics(),
            fetchTopClients(),
            fetchIssueCardsData(),
            fetchHolidaySchedule(),
          ]);
        setMetrics(metricsData as DashboardMetrics);
        setTopClients(clientsData);
        setIssues(issuesData);
        setHoliday(holidayData);
      } catch (error) {
        console.error("Lỗi tải data Dashboard", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const customerPct = metrics?.totalCustomers
    ? Math.round((metrics.customers.b2b / metrics.totalCustomers) * 100)
    : 0;

  const revenuePct = metrics?.totalRevenue
    ? Math.round((metrics.b2bRevenue / metrics.totalRevenue) * 100)
    : 0;

  const jobsPct =
    metrics?.jobsByCustomers && metrics.jobs
      ? Math.round((metrics.jobs.b2b / metrics.jobsByCustomers) * 100)
      : 0;

  const formatCurrency = (val: number = 0) =>
    `$${(val / 1000).toLocaleString()}K`;

  return {
    metrics,
    holiday,
    topClients,
    issues,
    isLoading,
    customerPct,
    revenuePct,
    jobsPct,
    formatCurrency,
  };
};
