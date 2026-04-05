import { CRMHeader } from "../components/CRMHeader";
import { CustomerFilters } from "../components/CustomerFilters";
import { CustomerTable } from "../components/CustomerTable";
import { useCustomers } from "../hooks";

/**
 * Customer List Page.
 * Displays a tabular view of all clients with filtering capabilities.
 */
export const CustomerListPage = () => {
  const { customers, isLoading } = useCustomers();

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] font-sans">
      <CRMHeader currentTab="customers" />
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
          {/* Page Header */}
          <div className="mb-4 lg:mb-6">
            <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
              Customer List
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Manage and monitor your executive accounts and client
              relationships.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col gap-4 lg:gap-6">
            <CustomerFilters onReset={() => {}} />

            {/* Render loading state or the actual data table */}
            {isLoading ? (
              <div className="flex h-64 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="text-slate-500 font-medium flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin"></div>
                  Đang tải danh sách khách hàng...
                </div>
              </div>
            ) : (
              <CustomerTable customers={customers} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
