import type {
  Customer,
  Contact,
  TopClientData,
  OverdueInvoice,
  ContractExpiring,
  CustomerProfileDetail,
} from "../types";
import {
  mockCustomers,
  mockGlobalLogisticsContacts,
  mockDashboardData,
  mockTopClients,
  mockOverdueInvoices,
  mockContractsExpiring,
  mockCustomerProfileDetail,
} from "../mock/mockData";

export const fetchCustomers = async (): Promise<Customer[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockCustomers), 800),
  );
};

export const fetchCustomerProfile = async (
  id: string,
): Promise<CustomerProfileDetail> => {
  console.log("Mock fetching profile for ID:", id);
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockCustomerProfileDetail), 600),
  );
};

export const fetchCustomerContacts = async (id: string): Promise<Contact[]> => {
  console.log("Mock fetching contacts for ID:", id);
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockGlobalLogisticsContacts), 800),
  );
};

export const fetchDashboardMetrics = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockDashboardData), 700),
  );
};

export const fetchTopClients = async (): Promise<TopClientData[]> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(mockTopClients), 600),
  );
};

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
