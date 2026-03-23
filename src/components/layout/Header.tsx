import React from "react";
import { Search, User, ChevronDown, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/notary-journal");

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-xl border-b border-border/10 py-6 px-6 sm:px-12 flex items-center justify-between transition-all duration-500 group shadow-sm hover:shadow-xl">
      <div className="flex items-center">
        <Logo />
      </div>

      <nav className="hidden xl:flex items-center gap-10">
        <NavItems isDashboard={isDashboard} currentPath={location.pathname} />
      </nav>

      <div className="flex items-center gap-4 sm:gap-8">
        <div className="hidden sm:flex items-center gap-6 pr-8 border-r border-border/20">
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link
            to="/account/login"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Navigation Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="xl:hidden hover:bg-primary/10 rounded-full"
            >
              <Menu className="w-6 h-6 text-foreground" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-10 w-[300px] sm:w-[400px] bg-background border-r border-border/10"
          >
            <SheetHeader className="text-left mb-12 p-0">
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-6">
              <NavItems
                isDashboard={isDashboard}
                currentPath={location.pathname}
              />
            </nav>
            <div className="mt-12 pt-12 border-t border-border/10 flex flex-col gap-6">
              <Link
                to="/account/login"
                className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors"
              >
                <User className="w-5 h-5 text-primary" />
                Đăng nhập
              </Link>
              <a
                href="#"
                className="flex items-center gap-4 text-sm font-black uppercase tracking-widest hover:text-primary transition-colors"
              >
                <Search className="w-5 h-5" /> Search
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

const Logo = () => (
  <a href="/" className="flex flex-col group cursor-pointer">
    <span className="text-3xl font-bold text-foreground uppercase mb-1">
      WolfArch
    </span>
    <span className="text-[10px] font-semibold text-primary tracking-[0.4em] block uppercase opacity-70 shadow-sm">
      Premium Notary
    </span>
  </a>
);

const NavItems = ({
  isDashboard,
  currentPath,
}: {
  isDashboard: boolean;
  currentPath: string;
}) => {
  if (isDashboard) {
    return (
      <>
        <NavItem label="Overview" href="/" active={currentPath === "/"} />
        <NavItem
          label="Registry"
          href="/notary-journal/registry"
          active={currentPath.includes("/registry")}
        />
        <NavItem
          label="Detail"
          href="/notary-journal/detail"
          active={currentPath.includes("/detail")}
        />
        <NavItem
          label="Technical"
          href="/notary-journal/technical"
          active={currentPath.includes("/technical")}
        />
        <NavItem
          label="Traceability"
          href="/notary-journal/traceability"
          active={currentPath.includes("/traceability")}
        />
        <NavItem
          label="Security"
          href="/notary-journal/security"
          active={currentPath.includes("/security")}
        />
        <NavItem
          label="Risk Handling"
          href="/notary-journal/risk"
          active={currentPath.includes("/risk")}
        />
        <NavItem
          label="Oversight"
          href="/notary-journal/oversight"
          active={currentPath.includes("/oversight")}
        />
        <NavItem
          label="Journal"
          href="/notary-journal"
          active={currentPath === "/notary-journal"}
        />
      </>
    );
  }

  return (
    <>
      <NavItem label="Trang chủ" active={currentPath === "/"} href="/" />
      <NavItem label="Giới thiệu" active={currentPath === "/about"} />
      <NavItem
        label="Dự án"
        hasDropdown
        active={currentPath.startsWith("/projects")}
      />
      <NavItem label="Dịch vụ" active={currentPath === "/services"} />
      <NavItem label="Liên hệ" active={currentPath === "/contact"} />
    </>
  );
};

const NavItem = ({
  label,
  active,
  hasDropdown,
  href = "#",
}: {
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
  href?: string;
}) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300 relative py-2",
      active ? "text-primary" : "text-muted-foreground hover:text-foreground",
    )}
  >
    {label}
    {hasDropdown && (
      <ChevronDown className="w-3.5 h-3.5 opacity-20 group-hover:opacity-50 transition-opacity" />
    )}
    {active && (
      <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary rounded-full transition-all duration-300" />
    )}
  </Link>
);
