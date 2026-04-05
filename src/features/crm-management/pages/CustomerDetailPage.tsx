import { useState } from "react";
import { useParams } from "react-router-dom";
import { CRMHeader } from "../components/CRMHeader";
import { CustomerProfile } from "../components/CustomerProfile";
import { ContactsTable } from "../components/ContactsTable";
import { useCustomerDetail } from "../hooks";

// Configuration for available navigation tabs
const TABS = [
  "Profile",
  "Contacts",
  "Jobs & Service History",
  "Pricing & Contracts",
  "Billing & Invoices",
  "Communication Log",
  "Notes & Documents",
];

/**
 * Customer Detail Page.
 * Uses a tabbed interface to display various detailed information about a single customer.
 */
export const CustomerDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Profile");

  const { profileData, contactsData, isLoading } = useCustomerDetail(
    id,
    activeTab,
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] font-sans">
      <CRMHeader currentTab="customers" />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1200px] px-8 py-4 text-xs font-medium text-slate-500">
          <span className="cursor-pointer hover:text-slate-800">
            Customer List
          </span>
          <span className="mx-2">›</span>
          <span className="font-bold text-slate-900">Customer Detail</span>
        </div>
      </div>

      {/* Tabbed Navigation Bar */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1200px] px-8 py-8">
          <div className="mb-6 border-b border-slate-200 md:mb-8">
            <div className="flex gap-4 overflow-x-auto hide-scrollbar md:gap-8">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-[3px] pb-3 text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? "border-[#c4a47c] text-[#c4a47c]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Rendering */}
          {isLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl bg-white border border-slate-100 shadow-sm">
              <div className="text-slate-500 font-medium flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-[#c4a47c] border-t-transparent rounded-full animate-spin"></div>
                Đang tải thông tin...
              </div>
            </div>
          ) : (
            <>
              {/* Render specific component based on active tab */}
              {activeTab === "Profile" && (
                <CustomerProfile customer={profileData} />
              )}
              {activeTab === "Contacts" && (
                <ContactsTable contacts={contactsData} />
              )}

              {/* Placeholder for unimplemented tabs */}
              {!["Profile", "Contacts"].includes(activeTab) && (
                <div className="rounded-xl border border-slate-200 bg-white p-16 text-center shadow-sm">
                  <p className="font-medium text-slate-500">
                    This section is under development
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
