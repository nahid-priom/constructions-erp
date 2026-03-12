"use client";

import {
  Bell,
  CalendarRange,
  ChevronDown,
  Menu,
  Search,
  Shield,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppState, useRoleOptions } from "@/components/state/app-provider";
import { getRoleBadgeStyle } from "@/lib/rbac";

type AppHeaderProps = {
  title?: string;
  subtitle?: string;
  onMobileMenuClick?: () => void;
};

export function AppHeader({
  title = "Operations overview",
  subtitle = "Construction portfolio, cash flow, and site activity at a glance.",
  onMobileMenuClick,
}: AppHeaderProps) {
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const { currentRole, setCurrentRole, userProfile } = useAppState();
  const roleOptions = useRoleOptions();
  const roleStyle = getRoleBadgeStyle(currentRole);

  return (
    <header className="sticky top-0 z-30 flex h-auto flex-wrap items-center gap-3 border-b bg-background/80 px-4 py-2 backdrop-blur-md md:h-16 md:flex-nowrap md:gap-4 md:px-6 lg:px-8 2xl:px-10">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuClick}
          aria-label="Open navigation"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background text-foreground transition-colors hover:bg-muted md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="min-w-0 space-y-0.5">
          <h1 className="truncate text-sm font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="line-clamp-1 text-[11px] text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="hidden flex-[1.2] items-center gap-2 rounded-full border bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground md:flex">
        <Search className="h-3.5 w-3.5 shrink-0" />
        <Input
          type="search"
          placeholder="Search projects, vouchers, or contacts..."
          className="h-6 border-0 bg-transparent p-0 text-xs shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hidden rounded-full text-[11px] font-medium md:inline-flex"
        >
          <CalendarRange className="h-3.5 w-3.5" />
          <span>{todayLabel}</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="h-9 w-9 rounded-full"
        >
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border bg-background px-1.5 py-0.5 text-xs transition-colors hover:bg-muted"
            >
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-indigo-100 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  AE
                </AvatarFallback>
              </Avatar>

              <div className="hidden flex-col items-start text-left sm:flex">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {userProfile.officeId}
                </span>
                <span className="text-xs font-medium text-foreground">
                  {userProfile.name}
                </span>
              </div>

              <span
                className={`hidden items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] sm:inline-flex ${roleStyle.bg} ${roleStyle.color} ${roleStyle.border}`}
              >
                <Shield className="h-3 w-3" />
                {currentRole}
              </span>

              <ChevronDown className="hidden h-3 w-3 text-muted-foreground sm:inline" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56 text-xs">
            <DropdownMenuLabel className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              CURRENT SESSION
            </DropdownMenuLabel>
            <div className="px-2 py-1.5 text-[11px] text-muted-foreground">
              <div className="font-medium text-foreground">
                {userProfile.name}
              </div>
              <div className="uppercase tracking-[0.16em]">
                {userProfile.designation}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              SWITCH ROLE (UI PREVIEW)
            </DropdownMenuLabel>
            {roleOptions.map((role) => (
              <DropdownMenuItem
                key={role}
                className="flex items-center justify-between text-xs"
                onClick={() =>
                  setCurrentRole(role)
                }
              >
                <span>{role}</span>
                {role === currentRole && (
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">
                    Active
                  </span>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">
              Notification preferences
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs">
              View profile in settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
