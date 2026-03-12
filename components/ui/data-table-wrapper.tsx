import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DataTableWrapperProps = {
  title?: string;
  description?: string;
  toolbar?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DataTableWrapper({
  title,
  description,
  toolbar,
  children,
  className,
}: DataTableWrapperProps) {
  return (
    <Card
      className={cn(
        "rounded-2xl border bg-card shadow-soft",
        "p-4 md:p-5 lg:p-6",
        className,
      )}
    >
      {(title || description || toolbar) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            {title && (
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {toolbar}
        </div>
      )}
      <div className="w-full overflow-x-auto">
        {children}
      </div>
    </Card>
  );
}

