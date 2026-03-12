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
    <section className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-soft md:p-5 lg:p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          {description && (
            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        {actions}
      </div>
      <div className="flex-1">{children}</div>
    </section>
  );
}

