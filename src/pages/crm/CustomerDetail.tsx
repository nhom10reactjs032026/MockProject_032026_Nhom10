import { useState } from 'react';
import { CrmNavbar, CrmTabs } from '../../features/crm/components/Layout';
import { JobHistoryHeader, JobHistoryStats, JobHistoryTable, JobHistoryPagination } from '../../features/crm/components/JobHistory';
import { BillingStatsCards, InvoiceListTable, PaymentMethodsSection, BillingHelpFooter } from '../../features/crm/components/billing/BillingComponents';
import { CommunicationLogView } from '../../features/crm/components/communication/CommunicationLogTable';
import { ChevronRight } from 'lucide-react';

export default function CustomerDetailPage() {
  const [activeTab, setActiveTab] = useState('Jobs & Service History');

  const renderContent = () => {
    switch (activeTab) {
      case 'Jobs & Service History':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <JobHistoryHeader />
            <JobHistoryStats />
            <JobHistoryTable />
            <JobHistoryPagination />
          </div>
        );
      case 'Billing & Invoices':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <BillingStatsCards />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <InvoiceListTable />
              </div>
              <div className="lg:col-span-1">
                <PaymentMethodsSection />
              </div>
            </div>
            <BillingHelpFooter />
          </div>
        );
      case 'Communication Log':
        return <CommunicationLogView />;
      default:
        return (
          <div className="py-20 text-center text-slate-400 font-medium bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            Content for <span className="text-slate-800 font-bold">"{activeTab}"</span> is currently under development.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 pb-20">
      <CrmNavbar />
      
      {/* Breadcrumbs */}
      <div className="px-8 py-4 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/50 backdrop-blur-sm border-b border-gray-100">
        <span>Customer List</span>
        <ChevronRight size={10} strokeWidth={4} className="text-slate-300" />
        <span className="text-slate-600">Customer Detail</span>
      </div>

      <CrmTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-gray-100/50 min-h-[600px]">
          {renderContent()}
        </div>
      </main>

      <footer className="py-12 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-40">
        © 2023 Customer Relationship Management System
      </footer>
    </div>
  );
}
