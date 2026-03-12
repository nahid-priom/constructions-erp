import type { ReactNode } from "react";

export interface InfoItem {
  label: string;
  value: ReactNode;
}

interface InfoListProps {
  items: InfoItem[];
  columns?: 1 | 2;
}

export function InfoList({ items, columns = 1 }: InfoListProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "";

  return (
    <dl className={`grid gap-x-6 gap-y-3 text-sm ${gridCols}`}>
      {items.map((item) => (
        <div key={item.label} className="space-y-0.5">
          <dt className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {item.label}
          </dt>
          <dd className="text-sm text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

