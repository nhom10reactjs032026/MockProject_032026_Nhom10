import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Menu, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

interface TopBarProps {
  onToggleSidebar?: () => void;
}

export const TopBar = ({ onToggleSidebar }: TopBarProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="h-14 border-b border-[#ebebeb] bg-white flex items-center justify-between px-4 shrink-0 relative z-40">
      {/* Left: Hamburger toggle */}
      <button
        onClick={onToggleSidebar}
        className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-[#c4a484] hover:bg-[#fdf6ef] transition-colors rounded-sm"
        aria-label="Toggle sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Right: Search + Notifications + User */}
      <div className="flex items-center gap-3">
        {/* Search — hidden on very small screens */}
        <div className="relative hidden sm:block w-56 md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search entries..."
            className="w-full pl-9 bg-[#f8f8f8] border-[#ebebeb] rounded-none h-9 focus-visible:ring-1 focus-visible:ring-[#c4a484]/50 text-sm"
          />
        </div>

        {/* Bell */}
        <button
          className="w-9 h-9 border border-[#ebebeb] bg-[#f8f8f8] flex items-center justify-center text-muted-foreground hover:text-[#c4a484] transition-colors rounded-none"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* User / Login Section */}
        <div className="flex items-center pl-3 border-l border-[#ebebeb]" ref={dropdownRef}>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 outline-none group"
              >
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-foreground leading-tight group-hover:text-[#c4a484] transition-colors">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium leading-tight">
                    {user?.role === 'notary' ? 'Notary Public' : user?.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                </div>
                <Avatar className="w-9 h-9 rounded-none border border-[#ebebeb] group-hover:border-[#c4a484] transition-colors">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${user?.email}`} />
                  <AvatarFallback className="rounded-none bg-[#fdf6ef] text-[#c4a484] font-bold text-xs">
                    {user?.name?.substring(0, 2).toUpperCase() || 'UN'}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white border border-[#ebebeb] shadow-lg py-1 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                  <div className="px-3 py-2 border-b border-[#ebebeb] mb-1 sm:hidden">
                    <p className="text-sm font-bold truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => { setIsDropdownOpen(false); /* navigate('/profile') */ }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-[#c4a484] hover:bg-[#fdf6ef] transition-colors font-medium"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => { setIsDropdownOpen(false); /* navigate('/settings') */ }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-[#c4a484] hover:bg-[#fdf6ef] transition-colors font-medium"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <div className="h-px bg-[#ebebeb] my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/account/login"
              className="flex items-center gap-2 h-9 px-3 text-sm font-bold text-[#c4a484] bg-[#fdf6ef] hover:bg-[#f5ebd8] transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="uppercase tracking-widest hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

