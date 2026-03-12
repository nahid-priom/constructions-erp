"use client";

import { CalendarDays, MapPin, PieChart, TrendingUp, Filter, ChevronDown } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { ProgressList } from "@/components/shared/progress-list";
import { SimpleTable } from "@/components/shared/simple-table";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Timeline } from "@/components/shared/timeline";
import { SectionCard } from "@/components/shared/section-card";
import { ChartCard } from "@/components/shared/chart-card";
import { DataTableCard } from "@/components/shared/data-table-card";
import { SummaryTile } from "@/components/shared/summary-tile";
import { FilterBar } from "@/components/shared/filter-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BarChart } from "@/components/dashboard/BarChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { IncomeChart } from "@/components/dashboard/IncomeChart";

type RunningProject = {
  code: string;
  name: string;
  location: string;
  manager: string;
  progress: number;
  status: "Running" | "Ongoing";
};

type PaymentDue = {
  id: string;
  projectCode: string;
  project: string;
  client: string;
  dueDate: string;
  amount: number;
  status: "Due" | "Pending";
};

type LocationDistribution = {
  id: string;
  label: string;
  value: number;
};

type TimelineItem = {
  id: string;
  time: string;
  title: string;
  description: string;
  meta: string;
};

type ProgressItem = {
  id: string;
  label: string;
  value: number;
  helper: string;
};

const runningProjects: RunningProject[] = [
  {
    code: "DU-0001",
    name: "12 Floors Commercial Building",
    location: "Banani, Dhaka",
    manager: "Engr. Moinul Hasan",
    progress: 78,
    status: "Running",
  },
  {
    code: "CTG-0007",
    name: "Factory Foundation Work",
    location: "CEPZ, Chattogram",
    manager: "Engr. Farzana Rahman",
    progress: 62,
    status: "Ongoing",
  },
  {
    code: "SYL-0003",
    name: "Residential Tower Phase 1",
    location: "Zindabazar, Sylhet",
    manager: "Engr. Kamrul Ahsan",
    progress: 54,
    status: "Running",
  },
];

const paymentDueList: PaymentDue[] = [
  {
    id: "PV-2026-0008",
    projectCode: "DU-0001",
    project: "12 Floors Commercial Building",
    client: "North View Properties Ltd.",
    dueDate: "12 Mar 2026",
    amount: 1850000,
    status: "Due",
  },
  {
    id: "PV-2026-0011",
    projectCode: "CTG-0007",
    project: "Factory Foundation Work",
    client: "Bay Industrial Holdings",
    dueDate: "15 Mar 2026",
    amount: 1245000,
    status: "Pending",
  },
  {
    id: "PV-2026-0015",
    projectCode: "GZP-0004",
    project: "10 Katha Plot Development",
    client: "Gazipur Land Development",
    dueDate: "18 Mar 2026",
    amount: 890000,
    status: "Due",
  },
];

const projectLocationDistribution: LocationDistribution[] = [
  { id: "1", label: "Dhaka", value: 14 },
  { id: "2", label: "Chattogram", value: 7 },
  { id: "3", label: "Sylhet", value: 4 },
  { id: "4", label: "Gazipur", value: 6 },
];

const recentActivities: TimelineItem[] = [
  {
    id: "1",
    time: "09:20 AM",
    title: "Progress updated for DU-0001",
    description: "Core wall casting completed up to 8th floor.",
    meta: "Updated by Engr. Moinul Hasan",
  },
  {
    id: "2",
    time: "08:45 AM",
    title: "Payment received from North View Properties Ltd.",
    description: "Partial payment against IPC-06.",
    meta: "Finance | RTGS",
  },
  {
    id: "3",
    time: "Yesterday",
    title: "Attendance confirmed for CEPZ site",
    description: "54 manpower present across all shifts.",
    meta: "HRM | Manpower Attendance",
  },
];

const projectProgressItems: ProgressItem[] = [
  {
    id: "completed",
    label: "Completed Projects",
    value: 64,
    helper: "19 projects handed over",
  },
  {
    id: "running",
    label: "Running Projects",
    value: 41,
    helper: "12 active sites across 4 zones",
  },
  {
    id: "planned",
    label: "Planned Projects",
    value: 23,
    helper: "7 projects in negotiation stage",
  },
];

const revenueVsTarget: ProgressItem[] = [
  {
    id: "jan",
    label: "January",
    value: 86,
    helper: "BDT 3.8 Cr vs 4.4 Cr target",
  },
  {
    id: "feb",
    label: "February",
    value: 92,
    helper: "BDT 4.1 Cr vs 4.5 Cr target",
  },
  {
    id: "mar",
    label: "March (MTD)",
    value: 48,
    helper: "BDT 1.6 Cr vs 3.3 Cr target",
  },
];

const TOTAL_REVENUE_YTD = 125400000;

export default function DashboardPage() {
  const pendingPayments = paymentDueList.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const totalRevenueYtdFormatted = TOTAL_REVENUE_YTD.toLocaleString("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  });

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="Executive Dashboard"
        description="Project performance, collections, and site operations across the full construction portfolio."
        meta={
          <FilterBar>
            <span className="text-[11px] font-medium text-muted-foreground">
              Overview period
            </span>
            <Tabs defaultValue="month" className="h-7 text-xs">
              <TabsList className="h-7 rounded-full bg-muted">
                <TabsTrigger value="week" className="h-7 rounded-full px-3">
                  This week
                </TabsTrigger>
                <TabsTrigger value="month" className="h-7 rounded-full px-3">
                  This month
                </TabsTrigger>
                <TabsTrigger value="quarter" className="h-7 rounded-full px-3">
                  Quarter
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              size="sm"
              variant="outline"
              className="ml-auto inline-flex h-7 items-center gap-1 rounded-full border-border px-2.5 text-[11px]"
            >
              <Filter className="h-3 w-3" />
              Filters
              <ChevronDown className="h-3 w-3" />
            </Button>
          </FilterBar>
        }
      />

      <section className="grid w-full min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Pending Payments"
          value={pendingPayments.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Across 3 key clients this week"
          trend={{ label: "12% higher than last month", direction: "up" }}
          icon={<CalendarDays className="h-4 w-4" />}
        />

        <StatCard
          label="Project Overview"
          value="64 / 12 / 7"
          helper="Completed / Running / Planned"
          trend={{
            label: "2 projects handed over this quarter",
            direction: "up",
          }}
          icon={<PieChart className="h-4 w-4" />}
        />

        <StatCard
          label="Total Revenue (YTD)"
          value={totalRevenueYtdFormatted}
          helper="Confirmed invoiced revenue for FY 2025-26"
          trend={{ label: "Target achievement 88%", direction: "up" }}
          icon={<TrendingUp className="h-4 w-4" />}
        />

        <StatCard
          label="Active Locations"
          value="Dhaka / CTG / Sylhet / Gazipur"
          helper="12 sites with continuous activity"
          icon={<MapPin className="h-4 w-4" />}
        />
      </section>

      <section className="grid w-full min-w-0 gap-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8 lg:min-w-0">
          <DataTableCard
            title="Running Projects"
            description="Live overview of priority sites and responsible engineers."
            headers={[
              "Project",
              "Location",
              "Project manager",
              "Progress",
              "Status",
            ]}
            toolbar={
              <div className="flex min-w-0 flex-wrap items-center gap-2 sm:flex-nowrap">
                <Input
                  placeholder="Search by project or code"
                  className="h-8 w-full min-w-0 rounded-full bg-muted text-xs sm:w-40 md:w-56"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 shrink-0 rounded-full px-3 text-[11px]"
                >
                  View all
                </Button>
              </div>
            }
          >
            {runningProjects.map((row) => (
              <tr key={row.code}>
                <td className="whitespace-nowrap py-2.5 pr-4 align-top text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {row.code}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {row.name}
                    </span>
                  </div>
                </td>
                <td className="py-2.5 pr-4 align-top text-sm text-foreground/90">
                  {row.location}
                </td>
                <td className="py-2.5 pr-4 align-top text-sm text-foreground/90">
                  {row.manager}
                </td>
                <td className="py-2.5 pr-4 align-top min-w-0">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Overall</span>
                      <span className="font-medium text-foreground">
                        {row.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${row.progress}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-2.5 align-top">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </DataTableCard>

          <section className="grid gap-4 md:grid-cols-2">
            <SectionCard
              title="Project Progress"
              description="Completed, running, and planned projects across all zones."
            >
              <ProgressList items={projectProgressItems} />
            </SectionCard>

            <SectionCard
              title="Revenue vs Target"
              description="Month-wise collection achievement vs revenue target."
            >
              <ProgressList items={revenueVsTarget} />
            </SectionCard>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <ChartCard
              title="Revenue vs Target (YTD)"
              description="Collections trend across the financial year."
            >
              <IncomeChart />
            </ChartCard>

            <ChartCard
              title="Project Status Mix"
              description="Distribution of projects across running, completed, and planned."
            >
              <DonutChart />
            </ChartCard>
          </section>
        </div>

        <div className="space-y-4 lg:col-span-4 lg:min-w-0">
          <SectionCard
            title="Project Location Distribution"
            description="Where current projects are concentrated."
          >
            <div className="space-y-4">
              {projectLocationDistribution.map((item) => (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-foreground">
                      {item.value} sites
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${Math.min(item.value * 8, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Payment Due This Week"
            description="Client-wise pending bills that require follow-up."
          >
            <div className="space-y-3">
              {paymentDueList.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-border/70 bg-muted/40 p-3 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium text-foreground">
                      {item.projectCode}
                    </div>
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="mt-1 text-[13px] text-foreground/90">
                    {item.project}
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <span>{item.client}</span>
                    <span>{item.dueDate}</span>
                  </div>

                  <div className="mt-2 text-[13px] font-semibold text-foreground">
                    {item.amount.toLocaleString("en-BD", {
                      style: "currency",
                      currency: "BDT",
                      maximumFractionDigits: 0,
                    })}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            title="Recent Activities"
            description="Latest movements across projects, finance, and HRM."
          >
            <Timeline items={recentActivities} />
          </SectionCard>

          <Card className="mt-2">
            <CardHeader className="border-none px-0 pt-0">
              <CardTitle className="text-sm font-semibold">
                Portfolio Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-1 grid gap-3 px-0 pb-0">
              <SummaryTile
                label="Revenue pipeline (next 90 days)"
                value="≈ BDT 9.4 Cr"
                helper="Based on signed contracts and approved BOQs."
              />
              <SummaryTile
                label="Verified site attendance today"
                value="156 manpower"
                helper="Across Dhaka, CTG, Sylhet, and Gazipur."
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}