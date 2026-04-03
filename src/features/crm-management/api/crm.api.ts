import type {
  Customer,
  Contact,
  TopClientData,
  OverdueInvoice,
  ContractExpiring,
  CustomerProfileDetail,
  HolidayAnnouncement,
} from "../types";
import {
  mockCustomers,
  mockGlobalLogisticsContacts,
  mockDashboardData,
  mockTopClients,
  mockOverdueInvoices,
  mockContractsExpiring,
  mockCustomerProfileDetail,
  mockHolidayAnnouncement,
} from "../mock/mockData";

/**
 * Fetches the list of all customers.
 * Simulates a network request with an 800ms delay.
 * @returns {Promise<Customer[]>} Array of customer objects.
 */
export const fetchCustomers = async (): Promise<Customer[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockCustomers), 800),
  );
};

/**
 * Fetches detailed profile information for a specific customer.
 * @param id - The unique identifier of the customer.
 * @returns {Promise<CustomerProfileDetail>} Customer profile details.
 */
export const fetchCustomerProfile = async (
  id: string,
): Promise<CustomerProfileDetail> => {
  console.log("Mock fetching profile for ID:", id);
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockCustomerProfileDetail), 600),
  );
};

/**
 * Fetches the contact list associated with a specific customer.
 * @param {string} id - The unique identifier of the customer.
 * @returns {Promise<Contact[]>} Array of contact objects.
 */
export const fetchCustomerContacts = async (id: string): Promise<Contact[]> => {
  console.log("Mock fetching contacts for ID:", id);
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockGlobalLogisticsContacts), 800),
  );
};

/**
 * Retrieves aggregate metrics and statistics for the main Dashboard.
 */
export const fetchDashboardMetrics = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockDashboardData), 700),
  );
};

/**
 * Retrieves the list of top-performing clients based on contract value.
 */
export const fetchTopClients = async (): Promise<TopClientData[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockTopClients), 600),
  );
};

/**
 * Fetches data for issue tracking cards, including overdue invoices and expiring contracts.
 * Simulates a slightly longer delay (900ms) for complex aggregations.
 */
export const fetchIssueCardsData = async (): Promise<{
  invoices: OverdueInvoice[];
  contracts: ContractExpiring[];
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        invoices: mockOverdueInvoices,
        contracts: mockContractsExpiring,
      });
    }, 900);
  });
};

/**
 * Retrieves the latest holiday announcements for the system banner.
 */
export const fetchHolidaySchedule = async (): Promise<HolidayAnnouncement> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockHolidayAnnouncement), 500),
  );
};
