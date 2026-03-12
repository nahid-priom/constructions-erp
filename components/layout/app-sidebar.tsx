import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { isRouteVisibleForRole } from "@/lib/rbac";
import { useAppState } from "@/components/state/app-provider";
import {
  sidebarSections,
  type SidebarItem,
  type SidebarChildItem,
  type SidebarParentItem,
} from "@/components/layout/sidebar-config";

type SidebarNavProps = {
  onNavigate?: () => void;
  className?: string;
};

const isChildItem = (item: SidebarItem): item is SidebarChildItem =>
  "href" in item && !("children" in item);

const isParentItem = (item: SidebarItem): item is SidebarParentItem =>
  "children" in item;

const matchPath = (pathname: string, href: string, mode: "exact" | "startsWith" = "startsWith") => {
  if (mode === "exact") return pathname === href;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

export function SidebarNav({ onNavigate, className }: SidebarNavProps) {
  const pathname = usePathname();
  const { currentRole } = useAppState();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNavigate = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <nav
      className={cn(
        "flex-1 space-y-5 overflow-y-auto pr-1 text-sm",
        className,
      )}
    >
      {sidebarSections.map((section) => (
        <div key={section.id} className="space-y-1.5">
          <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/80">
            {section.title}
          </p>

          <div className="space-y-1">
            {section.items.map((item) => {
              if (isChildItem(item)) {
                if (!isRouteVisibleForRole(currentRole, item.href)) {
                  return null;
                }

                const Icon = item.icon;
                const isActive = matchPath(
                  pathname ?? "",
                  item.href,
                  item.match ?? "startsWith",
                );

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={handleNavigate}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                      "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                      isActive &&
                        "bg-indigo-50 text-indigo-600 shadow-soft ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/30",
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground",
                          isActive &&
                            "text-indigo-600 dark:text-indigo-300",
                        )}
                      />
                    )}
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              }

              if (isParentItem(item)) {
                const visibleChildren = item.children.filter((child) =>
                  isRouteVisibleForRole(currentRole, child.href),
                );

                if (!visibleChildren.length) return null;

                const Icon = item.icon;

                const hasActiveChild = visibleChildren.some((child) =>
                  matchPath(pathname ?? "", child.href, "startsWith"),
                );

                const isOpen =
                  openGroups[item.id] !== undefined
                    ? openGroups[item.id]
                    : hasActiveChild;

                const parentIsActive = hasActiveChild;

                return (
                  <div key={item.id} className="space-y-0.5">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={`${item.label} navigation`}
                      onClick={() => toggleGroup(item.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                        "text-muted-foreground hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                        parentIsActive &&
                          "bg-indigo-50 text-indigo-600 shadow-soft ring-1 ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/30",
                      )}
                    >
                      {Icon && (
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 text-muted-foreground",
                            parentIsActive &&
                              "text-indigo-600 dark:text-indigo-300",
                          )}
                        />
                      )}
                      <span className="flex-1 truncate text-left">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>

                    {isOpen && (
                      <div className="pl-2.5">
                        <div className="space-y-0.5 border-l border-border/60 pl-3">
                          {visibleChildren.map((child) => {
                            const childActive = matchPath(
                              pathname ?? "",
                              child.href,
                              child.match ?? "startsWith",
                            );

                            return (
                              <Link
                                key={child.id}
                                href={child.href}
                                onClick={handleNavigate}
                                className={cn(
                                  "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors",
                                  "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                                  childActive &&
                                    "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-100 dark:ring-indigo-500/40",
                                )}
                              >
                                <span className="relative flex h-1.5 w-1.5 shrink-0 items-center justify-center">
                                  <span
                                    className={cn(
                                      "h-1.5 w-1.5 rounded-full border border-muted-foreground/50 bg-background transition-colors",
                                      childActive &&
                                        "border-indigo-400 bg-indigo-500/80 shadow-[0_0_0_1px_rgba(129,140,248,0.45)]",
                                    )}
                                  />
                                </span>
                                <span className="truncate">{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden h-screen w-[280px] flex-shrink-0 flex-col border-r border-border bg-gradient-to-b from-background to-muted/40 px-4 py-5 md:flex">
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border/60 bg-background/70 px-3 py-2 shadow-sm backdrop-blur">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/90 text-sm font-semibold text-primary-foreground shadow-soft">
          AE
        </div>
        <div className="space-y-0.5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Construction ERP
          </div>
          <div className="text-sm font-semibold tracking-tight text-foreground">
            ARK Engineering &amp; Constructions
          </div>
        </div>
      </div>

      <SidebarNav />

      <div className="mt-4 border-t border-border/70 pt-4 text-[11px] text-muted-foreground">
        <p className="font-medium uppercase tracking-[0.16em]">System</p>
        <p className="mt-1 text-[11px] leading-snug">
          Central control for projects, finance, and site operations.
        </p>
      </div>
    </aside>
  );
}

