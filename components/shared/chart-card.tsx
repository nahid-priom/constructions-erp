import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function ChartCard({
  title,
  description,
  actions,
  children,
}: ChartCardProps) {
  return (
    <section className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-4 shadow-soft md:p-5 lg:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap justify-end gap-2">{actions}</div>}
      </div>
      <div className="flex-1 min-w-0">{children}</div>
    </section>
  );
}

