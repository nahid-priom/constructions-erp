import type { ReactNode } from "react";

interface SummaryTileProps {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
}

export function SummaryTile({
  label,
  value,
  helper,
  icon,
}: SummaryTileProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-muted/60 px-3 py-2.5">
      {icon && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary">
          {icon}
        </div>
      )}
      <div className="space-y-0.5">
        <p className="text-[11px] font-medium text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
        {helper && (
          <p className="text-[11px] text-muted-foreground">{helper}</p>
        )}
      </div>
    </div>
  );
}

