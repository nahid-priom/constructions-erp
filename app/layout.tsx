import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { AppProvider } from "@/components/state/app-provider";

export const metadata: Metadata = {
  title: "ARK ENGINEERING & CONSTRUCTIONS ERP",
  description:
    "Construction ERP operations control center for running projects, accounts, and site operations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}

