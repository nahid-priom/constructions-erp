import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-background px-4 py-6 md:px-6 lg:px-8 xl:px-8 2xl:px-10">
      <div className="space-y-6">{children}</div>
    </main>
  );
}

