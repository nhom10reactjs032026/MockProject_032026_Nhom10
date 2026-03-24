import { CRMHeader } from "../components/CRMHeader";
import { CustomerFilters } from "../components/CustomerFilters";
import { CustomerTable } from "../components/CustomerTable";
import { mockCustomers } from "../mock/mockData";

export const CustomerListPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] font-sans">
      <CRMHeader currentTab="customers" />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          <div className="mb-4 lg:mb-6">
            <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
              Customer List
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Manage and monitor your executive accounts and client
              relationships.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6">
            <CustomerFilters onReset={() => {}} />
            <CustomerTable customers={mockCustomers} />
          </div>
        </div>
      </div>
    </div>
  );
};
