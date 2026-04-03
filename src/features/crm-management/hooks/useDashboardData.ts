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

/**
 * Custom hook to manage data fetching and state for the CRM Dashboard.
 * Handles parallel API requests, loading states, error handling, and derived metrics.
 */
export const useDashboardData = () => {
  // State initialization for all dashboard widgets
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
  // UI feedback states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch all independent dashboard data in parallel to optimize loading time
        const [metricsData, clientsData, issuesData, holidayData] =
          await Promise.all([
            fetchDashboardMetrics(),
            fetchTopClients(),
            fetchIssueCardsData(),
            fetchHolidaySchedule(),
          ]);
        // Update states with fetched data
        setMetrics(metricsData as DashboardMetrics);
        setTopClients(clientsData);
        setIssues(issuesData);
        setHoliday(holidayData);
      } catch (error) {
        console.error("Lỗi tải data Dashboard", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setIsLoading(false); // Ensure loading state is removed regardless of outcome
      }
    };
    loadData();
  }, []);

  // --- Derived State Calculations ---
  // Safely calculate percentages for the KPI Pie Charts
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

  // Utility function to format raw numbers into currency strings (e.g., $1.2K)
  const formatCurrency = (val: number = 0) =>
    `$${(val / 1000).toLocaleString()}K`;

  return {
    metrics,
    holiday,
    topClients,
    issues,
    isLoading,
    error,
    customerPct,
    revenuePct,
    jobsPct,
    formatCurrency,
  };
};
