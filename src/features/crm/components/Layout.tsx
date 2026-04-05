import { Bell, Settings, Plus, Briefcase } from 'lucide-react';

export function CrmNavbar() {
  return (
    <nav className="h-16 border-b border-gray-100 bg-white flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 text-white font-bold text-center leading-none">S</div>
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight leading-tight">
            Customer Relationship<br/>Management
          </span>
        </div>
        
        <div className="flex items-center gap-6 text-sm font-medium text-slate-500 ml-4">
          <a href="#" className="hover:text-blue-600 transition-colors">Dashboard</a>
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 py-5 translate-y-[2px]">Customer List</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-all shadow-sm">
          <Plus size={16} />
          Add new customer
        </button>
        <button className="flex items-center gap-2 border border-blue-900 text-blue-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-all">
          <Briefcase size={16} />
          Create new job
        </button>
        
        <div className="flex items-center gap-3 ml-2 border-l pl-4 border-gray-100">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
            <Bell size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all">
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-100 overflow-hidden ml-1 cursor-pointer ring-1 ring-orange-200">
             <img src="https://ui-avatars.com/api/?name=Admin&background=FF8A65&color=fff" alt="User" />
          </div>
        </div>
      </div>
    </nav>
  );
}

import { TABS } from '../constants/mockData';

interface CrmTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function CrmTabs({ activeTab, onTabChange }: CrmTabsProps) {
  return (
    <div className="bg-white border-b border-gray-100 px-8 overflow-x-auto no-scrollbar pt-4">
      <div className="flex items-center gap-6 whitespace-nowrap">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`pb-3 text-sm font-medium transition-all relative outline-none ${
              tab === activeTab
                ? 'text-blue-600'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
            {tab === activeTab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
