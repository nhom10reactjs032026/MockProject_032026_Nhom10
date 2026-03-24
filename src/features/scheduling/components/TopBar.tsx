import React, { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";

export const TopBar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-gray-100 flex items-center justify-between px-3 sm:px-4 lg:px-6 flex-shrink-0">
      <h1 className="text-base sm:text-lg lg:text-xl font-black text-gray-900 tracking-tight truncate">
        Notary office
      </h1>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications */}
        <button className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition-all text-gray-500">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">
            2
          </span>
        </button>

        {/* Avatar + role */}
        <button
          onClick={() => setShowDropdown((v) => !v)}
          className="flex items-center gap-1.5 sm:gap-2.5 pl-1 pr-2 sm:pr-3 py-1 rounded-2xl hover:bg-gray-50 border border-gray-100 transition-all relative"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
            KA
          </div>

          {/* Ẩn text trên mobile */}
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-gray-800 leading-tight">KA</div>
            <div className="text-[10px] text-gray-400">Dispatcher</div>
          </div>

          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />

          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-36 sm:w-40 bg-white rounded-xl border border-gray-100 shadow-lg py-1 z-10">
              <button className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-50">
                Profile
              </button>
              <button className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-50">
                Settings
              </button>
              <div className="border-t border-gray-100 my-1" />
              <button className="w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-500 hover:bg-red-50">
                Sign out
              </button>
            </div>
          )}
        </button>
      </div>
    </header>
  );
};