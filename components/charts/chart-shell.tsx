import type { ReactNode } from "react";

interface ChartShellProps {
  children: ReactNode;
}

export function ChartShell({ children }: ChartShellProps) {
  return (
    <div className="flex min-h-[220px] flex-col justify-between gap-4 sm:min-h-[260px] md:min-h-[280px]">
      {children}
    </div>
  );
}

