import type { ReactNode } from "react";

interface FilterBarProps {
  children: ReactNode;
}

export function FilterBar({ children }: FilterBarProps) {
  return (
    <section className="flex w-full flex-wrap items-center gap-3 rounded-2xl border border-border bg-card/70 px-3 py-2.5 text-xs shadow-soft md:px-4">
      {children}
    </section>
  );
}

