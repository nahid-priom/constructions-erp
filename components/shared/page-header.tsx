import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: ReactNode;
  meta?: ReactNode;
}

export function PageHeader({ title, description, meta }: PageHeaderProps) {
  return (
    <header className="flex w-full flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-3xl text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {meta && <div className="mt-2 w-full sm:mt-0 sm:w-auto">{meta}</div>}
    </header>
  );
}

