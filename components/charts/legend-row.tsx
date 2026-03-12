import type { ReactNode } from "react";

export interface LegendItem {
  label: string;
  value?: string;
  dotClassName: string;
}

interface LegendRowProps {
  items: LegendItem[];
  extra?: ReactNode;
}

export function LegendRow({ items, extra }: LegendRowProps) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <div key={item.label} className="inline-flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${item.dotClassName}`} />
            <span className="text-xs text-muted-foreground">
              {item.label}
              {item.value ? ` · ${item.value}` : ""}
            </span>
          </div>
        ))}
      </div>
      {extra}
    </div>
  );
}

