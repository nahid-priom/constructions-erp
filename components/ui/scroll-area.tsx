import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps
  extends React.HTMLAttributes<HTMLDivElement> {
  viewportClassName?: string;
}

export function ScrollArea({
  className,
  viewportClassName,
  children,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-slate-200 bg-white",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "max-h-80 w-full overflow-auto",
          viewportClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

