import type { ReactNode } from "react";

type TrendDirection = "up" | "down" | "neutral";

interface StatCardProps {
  label: string;
  value: string;
  helper?: string;
  trend?: {
    label: string;
    direction: TrendDirection;
  };
  icon?: ReactNode;
}

const trendColor: Record<TrendDirection, string> = {
  up: "text-emerald-600",
  down: "text-red-600",
  neutral: "text-muted-foreground",
};

export function StatCard({ label, value, helper, trend, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft md:p-5 lg:p-6">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {label}
          </p>
          <div className="text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </div>
        </div>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/5 text-primary">
            {icon}
          </div>
        )}
      </div>
      {helper && (
        <p className="text-xs text-muted-foreground">{helper}</p>
      )}
      {trend && (
        <p
          className={`mt-1 text-xs font-medium ${trendColor[trend.direction]}`}
        >
          {trend.label}
        </p>
      )}
    </div>
  );
}

