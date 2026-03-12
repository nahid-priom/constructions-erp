"use client";

import { useState, type ReactNode } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { AppSidebar, SidebarNav } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { PageContainer } from "@/components/layout/page-container";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <AppSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <AppHeader onMobileMenuClick={() => setMobileOpen(true)} />
        <PageContainer>{children}</PageContainer>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <div className="flex h-full flex-col">
            <SheetHeader className="border-b px-4 py-3 text-left">
              <SheetTitle className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Navigation
              </SheetTitle>
            </SheetHeader>

            <SidebarNav
              onNavigate={() => setMobileOpen(false)}
              className="flex-1 px-2 py-3"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}