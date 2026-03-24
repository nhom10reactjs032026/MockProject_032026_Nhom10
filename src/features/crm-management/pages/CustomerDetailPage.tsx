import { useState } from "react";
import { CRMHeader } from "../components/CRMHeader";
import { CustomerProfile } from "../components/CustomerProfile";
import { ContactsTable } from "../components/ContactsTable";
import { mockGlobalLogisticsContacts } from "../mock/mockData";

const TABS = [
  "Profile",
  "Contacts",
  "Jobs & Service History",
  "Pricing & Contracts",
  "Billing & Invoices",
  "Communication Log",
  "Notes & Documents",
];

export const CustomerDetailPage = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f9fa] font-sans">
      <CRMHeader currentTab="customers" />

      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-[1200px] px-8 py-4 text-xs font-medium text-slate-500">
          <span className="cursor-pointer hover:text-slate-800">
            Customer List
          </span>
          <span className="mx-2">›</span>
          <span className="font-bold text-slate-900">Customer Detail</span>
        </div>
      </div>

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
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "Profile" && <CustomerProfile />}

          {activeTab === "Contacts" && (
            <ContactsTable contacts={mockGlobalLogisticsContacts} />
          )}

          {!["Profile", "Contacts"].includes(activeTab) && (
            <div className="rounded-xl border border-slate-200 bg-white p-16 text-center shadow-sm">
              <p className="font-medium text-slate-500">
                This section is under development
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
