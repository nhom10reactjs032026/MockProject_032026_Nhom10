import { StatCard } from "../components/StatCard";
import { ComplianceAlerts } from "../components/ComplianceAlerts";
import { RecentComplianceLogs } from "../components/RecentComplianceLogs";
import { RegionalChartSummary } from "../components/RegionalChartSummary";
import { mockStats } from "../data/mockData";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { Header } from "../../../components/layout/Header";
import { Footer } from "../../../components/layout/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { JournalManagerTab } from "../components/JournalManagerTab";

export const NotaryJournalDashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'journal-manager'>('dashboard');

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col pt-20 transition-colors duration-500 font-['Plus_Jakarta_Sans']">
      <Header />

      {/* Hero Banner Section */}
      <section className="relative h-96 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&q=80&w=2301"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 text-center space-y-4 px-6 md:container mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white uppercase tracking-tight">
            Notary Journal Dashboard
          </h1>
          <nav className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
            <Link to="/" className="hover:text-[#c4a484] transition-colors">
              Home
            </Link>
            <span className="opacity-60 text-sm">/</span>
            <span className="opacity-80">Notary Journal Dashboard</span>
          </nav>
        </div>
      </section>

      {/* Tabs Menu */}
      <div className="bg-white border-b border-[#ebebeb]">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`py-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'dashboard' ? 'text-[#c4a484]' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Dashboard
            {activeTab === 'dashboard' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c4a484]"></span>}
          </button>
          <button 
            onClick={() => setActiveTab('journal-manager')}
            className={`py-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${activeTab === 'journal-manager' ? 'text-[#c4a484]' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Journal Manager
            {activeTab === 'journal-manager' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c4a484]"></span>}
          </button>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="py-12 px-6 flex-1">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'dashboard' ? (
            <div className="space-y-8">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
              <p className="text-muted-foreground text-sm mt-1">
                High-Level overview of company-wide journal integrity and
                regulatory status
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
              <Button
                variant="outline"
                className="bg-white border-[#ebebeb] text-foreground font-bold h-11 px-6 flex items-center justify-center gap-2 rounded-none hover:bg-white/50 text-xs uppercase tracking-widest transition-all w-full sm:w-auto"
              >
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button className="bg-[#c4a484] hover:bg-[#b08e6d] text-white font-bold h-11 px-6 flex items-center justify-center gap-2 rounded-none text-xs uppercase tracking-widest transition-all shadow-md w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                New Audit
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 sm:p-6 border border-[#ebebeb] shadow-sm flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 rounded-none">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-2 hidden sm:inline-block">
              FILTER:
            </span>
            <select className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-none px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] cursor-pointer text-foreground h-11 sm:h-10 w-full sm:w-auto">
              <option>All States</option>
            </select>
            <select className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-none px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] cursor-pointer text-foreground h-11 sm:h-10 w-full sm:w-auto">
              <option>All Offices</option>
            </select>
            <select className="bg-[#f8f8f8] border border-[#ebebeb] text-sm font-semibold rounded-none px-4 py-2 outline-none focus:ring-1 focus:ring-[#c4a484] cursor-pointer text-foreground h-11 sm:h-10 w-full sm:w-auto">
              <option>Last 30 Days</option>
            </select>
            <button className="text-[12px] font-bold text-[#c4a484] hover:opacity-80 transition-opacity ml-0 sm:ml-2 mt-2 sm:mt-0 py-2 sm:py-0 text-center w-full sm:w-auto">
              Clear Filter
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockStats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          <ComplianceAlerts />

          <RecentComplianceLogs />

          <RegionalChartSummary />
            </div>
          ) : (
            <JournalManagerTab />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
