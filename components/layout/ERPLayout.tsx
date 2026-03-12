"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/app-shell";

interface ERPLayoutProps {
  children: ReactNode;
}

// Legacy wrapper kept for backward compatibility.
// New code should use AppShell directly via app/layout.tsx.
export function ERPLayout({ children }: ERPLayoutProps) {
  return <AppShell>{children}</AppShell>;
}

