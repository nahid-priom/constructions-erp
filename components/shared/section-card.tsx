import type { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function SectionCard({
  title,
  description,
  children,
  footer,
}: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-soft md:p-5 lg:p-6">
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && (
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </header>
      )}
      <div>{children}</div>
      {footer && <footer className="mt-4">{footer}</footer>}
    </section>
  );
}

