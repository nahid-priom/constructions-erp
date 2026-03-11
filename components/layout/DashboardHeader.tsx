"use client";

import { ChevronDown, CalendarRange, Download, Filter } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  name?: string;
}

export function DashboardHeader({ name = "Arif Hossain" }: DashboardHeaderProps) {
  const todayLabel = "Monday, 11 November 2025";

  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Welcome {name}
        </p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Today is {todayLabel}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="hidden items-center gap-2 rounded-full border-neutral-200 text-xs font-medium text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 md:inline-flex"
        >
          <CalendarRange className="h-3.5 w-3.5" />
          <span>Sep 11 – Oct 10</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="hidden items-center gap-2 rounded-full border-neutral-200 text-xs font-medium text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900 lg:inline-flex"
        >
          <Filter className="h-3.5 w-3.5" />
          <span>Monthly</span>
          <ChevronDown className="h-3 w-3 opacity-70" />
        </Button>

        <Button
          variant="default"
          size="sm"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-3.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          <Download className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Export</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-1.5 py-0.5 text-xs shadow-sm hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-indigo-100 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
                  AH
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-xs font-medium text-neutral-800 dark:text-neutral-100 sm:inline">
                {name}
              </span>
              <ChevronDown className="hidden h-3 w-3 text-neutral-500 sm:inline" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44" align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Notification settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

