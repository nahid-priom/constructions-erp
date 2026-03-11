import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  helper?: string;
  accent?: "indigo" | "green" | "orange" | "purple";
}

const accentRing: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  indigo: "bg-indigo-50 text-indigo-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
};

export function KpiCard({ icon, label, value, helper, accent = "indigo" }: KpiCardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            {label}
          </div>
          <div className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            {value}
          </div>
          {helper && (
            <p className="text-xs text-muted-foreground">
              {helper}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold",
            accentRing[accent],
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

