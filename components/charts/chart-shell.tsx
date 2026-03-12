import type { ReactNode } from "react";

interface ChartShellProps {
  children: ReactNode;
}

export function ChartShell({ children }: ChartShellProps) {
  return (
    <div className="flex h-64 flex-col justify-between gap-4 md:h-72">
      {children}
    </div>
  );
}

