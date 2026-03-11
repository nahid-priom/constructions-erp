import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  initials?: string;
}

export function Avatar({
  className,
  initials,
  children,
  ...props
}: AvatarProps & { children?: React.ReactNode }) {
  return (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700 dark:bg-neutral-800 dark:text-neutral-100",
        className,
      )}
      {...props}
    >
      {children ?? initials}
    </div>
  );
}

export function AvatarFallback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-700 dark:bg-neutral-700 dark:text-neutral-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

