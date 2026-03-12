import type { ReactNode } from "react";

interface DashboardContainerProps {
  children: ReactNode;
}

export function DashboardContainer({ children }: DashboardContainerProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-neutral-50 px-4 py-6 sm:px-5 md:px-8 lg:px-10 dark:bg-neutral-950">
      <div className="space-y-6">{children}</div>
    </main>
  );
}

