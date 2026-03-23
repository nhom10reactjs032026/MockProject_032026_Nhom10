import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

export const TopBar = () => {
  return (
    <header className="h-20 border-b border-border bg-white flex items-center justify-between px-8">
      <div className="flex items-center gap-8 h-full">
        <div className="h-full flex items-center border-b-2 border-primary text-primary font-bold text-lg">
          Dashboard
        </div>
        <div className="h-full flex items-center text-muted-foreground font-semibold text-lg hover:text-foreground cursor-pointer transition-colors">
          Journal Manager
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search entries..." 
            className="w-full pl-10 bg-secondary/30 border-none rounded-lg h-10 focus-visible:ring-1 focus-visible:ring-primary/50"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-2 border-l border-border">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-foreground">Admin/Compliance</span>
          </div>
          <Avatar className="w-10 h-10 rounded-lg border border-border">
            <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
