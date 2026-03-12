import {
  BarChart3,
  LineChart,
  PieChart,
  Users,
  Filter,
  ChevronDown,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressList } from "@/components/shared/progress-list";
import { SimpleTable } from "@/components/shared/simple-table";
import { StatusBadge } from "@/components/shared/status-badge";
import { ChartCard } from "@/components/shared/chart-card";
import { DataTableCard } from "@/components/shared/data-table-card";
import { FilterBar } from "@/components/shared/filter-bar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

type TrendRow = {
  month: string
  revenue: number
  expense: number
  margin: number
}

type ProjectPerformance = {
  code: string
  name: string
  progress: number
  status: "Running" | "Completed" | "Planned"
}

type ManpowerUtilization = {
  projectCode: string
  project: string
  planned: number
  present: number
}

type PaymentSummary = {
  contractor: string
  project: string
  billed: number
  paid: number
  due: number
}

const revenueExpenseTrend: TrendRow[] = [
  { month: "Nov 25", revenue: 3.4, expense: 2.7, margin: 21 },
  { month: "Dec 25", revenue: 3.9, expense: 3.0, margin: 23 },
  { month: "Jan 26", revenue: 4.1, expense: 3.1, margin: 24 },
  { month: "Feb 26", revenue: 4.3, expense: 3.2, margin: 25 },
  { month: "Mar 26 (MTD)", revenue: 1.6, expense: 1.2, margin: 26 },
]

const projectPerformance: ProjectPerformance[] = [
  {
    code: "DU-0001",
    name: "12 Floors Commercial Building",
    progress: 78,
    status: "Running",
  },
  {
    code: "CTG-0007",
    name: "Factory Foundation Work",
    progress: 62,
    status: "Running",
  },
  {
    code: "SYL-0003",
    name: "Residential Tower Phase 1",
    progress: 54,
    status: "Running",
  },
  {
    code: "GZP-0004",
    name: "10 Katha Plot Development",
    progress: 96,
    status: "Completed",
  },
]

const manpowerUtilization: ManpowerUtilization[] = [
  {
    projectCode: "DU-0001",
    project: "12 Floors Commercial Building",
    planned: 68,
    present: 63,
  },
  {
    projectCode: "CTG-0007",
    project: "Factory Foundation Work",
    planned: 54,
    present: 49,
  },
  {
    projectCode: "SYL-0003",
    project: "Residential Tower Phase 1",
    planned: 42,
    present: 39,
  },
]

const subcontractorPayments: PaymentSummary[] = [
  {
    contractor: "Rahman Foundation Works",
    project: "Factory Foundation Work",
    billed: 6.4,
    paid: 5.2,
    due: 1.2,
  },
  {
    contractor: "Mithila Piling & Shuttering",
    project: "12 Floors Commercial Building",
    billed: 4.1,
    paid: 3.6,
    due: 0.5,
  },
  {
    contractor: "Sylhet Civil Traders",
    project: "Residential Tower Phase 1",
    billed: 3.2,
    paid: 2.5,
    due: 0.7,
  },
]

const topProjects = [
  {
    id: "1",
    code: "DU-0001",
    name: "12 Floors Commercial Building",
    margin: 24,
    performance: "Ahead of schedule with healthy margin.",
  },
  {
    id: "2",
    code: "GZP-0004",
    name: "10 Katha Plot Development",
    margin: 22,
    performance: "Completed with controlled cost overrun.",
  },
  {
    id: "3",
    code: "CTG-0007",
    name: "Factory Foundation Work",
    margin: 19,
    performance: "Progress aligned with baseline program.",
  },
]

const overduePayments = [
  {
    id: "1",
    project: "12 Floors Commercial Building",
    client: "North View Properties Ltd.",
    days: 18,
    amount: 980000,
  },
  {
    id: "2",
    project: "Residential Tower Phase 1",
    client: "Sylhet Heights Developments",
    days: 11,
    amount: 640000,
  },
]

export default function AnalyticsPage() {
  const totalRevenue = revenueExpenseTrend.reduce(
    (sum, row) => sum + row.revenue,
    0,
  );
  const totalExpense = revenueExpenseTrend.reduce(
    (sum, row) => sum + row.expense,
    0,
  );

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Analytics Overview"
        description="Revenue, cost, manpower, and project performance analytics across all running sites."
        meta={
          <FilterBar>
            <Tabs defaultValue="month" className="h-7 text-xs">
              <TabsList className="h-7 rounded-full bg-muted">
                <TabsTrigger value="month" className="h-7 rounded-full px-3">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="quarter" className="h-7 rounded-full px-3">
                  Quarterly
                </TabsTrigger>
                <TabsTrigger value="year" className="h-7 rounded-full px-3">
                  Yearly
                </TabsTrigger>
              </TabsList>
              <TabsContent value="month" />
              <TabsContent value="quarter" />
              <TabsContent value="year" />
            </Tabs>
            <Input
              placeholder="Filter by project or client"
              className="h-8 w-40 rounded-full bg-muted text-xs md:w-56"
            />
            <Button
              size="sm"
              variant="outline"
              className="ml-auto inline-flex h-7 items-center gap-1 rounded-full border-border px-2.5 text-[11px]"
            >
              <Filter className="h-3 w-3" />
              Advanced
              <ChevronDown className="h-3 w-3" />
            </Button>
          </FilterBar>
        }
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Revenue Trend (Last 5 Months)"
          value={`${totalRevenue.toFixed(1)} Cr`}
          helper="Cumulative invoiced revenue"
          trend={{
            label: "Stable upward movement",
            direction: "up",
          }}
          icon={<LineChart className="h-4 w-4" />}
        />
        <StatCard
          label="Expense Trend"
          value={`${totalExpense.toFixed(1)} Cr`}
          helper="Materials, labour, and overheads"
          trend={{
            label: "Cost contained within 75–78%",
            direction: "neutral",
          }}
          icon={<BarChart3 className="h-4 w-4" />}
        />
        <StatCard
          label="Average Project Margin"
          value="22–24%"
          helper="Weighted by project value"
          trend={{
            label: "On track vs annual budget",
            direction: "up",
          }}
          icon={<PieChart className="h-4 w-4" />}
        />
        <StatCard
          label="Active Site Manpower"
          value="156 personnel"
          helper="Across 3 primary locations"
          trend={{
            label: "Utilization 92% vs plan",
            direction: "up",
          }}
          icon={<Users className="h-4 w-4" />}
        />
      </section>

      <section className="grid w-full gap-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <DataTableCard
            title="Revenue & Expense Trend"
            description="Month-wise revenue, expense, and margin profile."
            headers={["Month", "Revenue (Cr)", "Expense (Cr)", "Margin %"]}
            toolbar={
              <Button
                size="sm"
                variant="outline"
                className="h-8 rounded-full px-3 text-[11px]"
              >
                Export summary
              </Button>
            }
          >
            {revenueExpenseTrend.map((row) => (
              <tr key={row.month}>
                <td className="whitespace-nowrap py-2.5 pr-4 text-sm text-foreground/90">
                  {row.month}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-sm text-foreground/90">
                  {row.revenue.toFixed(1)}
                </td>
                <td className="whitespace-nowrap py-2.5 pr-4 text-sm text-foreground/90">
                  {row.expense.toFixed(1)}
                </td>
                <td className="w-52 py-2.5 align-top">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>{row.margin}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${row.margin}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </DataTableCard>

          <DataTableCard
            title="Project Progress Performance"
            description="Physical progress and status of key projects."
            headers={["Project", "Progress", "Status"]}
          >
            {projectPerformance.map((row) => (
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
                <td className="w-52 py-2.5 pr-4 align-top">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Physical</span>
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
                <td className="whitespace-nowrap py-2.5 align-top">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </DataTableCard>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <ChartCard
            title="Project Status Mix"
            description="Running, completed, and planned share of portfolio."
          >
            <ProgressList
              items={[
                {
                  id: "running",
                  label: "Running",
                  value: 48,
                  helper: "12 active jobs",
                },
                {
                  id: "completed",
                  label: "Completed",
                  value: 37,
                  helper: "19 projects closed",
                },
                {
                  id: "planned",
                  label: "Planned",
                  value: 15,
                  helper: "7 in pipeline",
                },
              ]}
            />
          </ChartCard>

          <ChartCard
            title="Manpower Utilization"
            description="Planned vs present headcount at key sites."
          >
            {manpowerUtilization.map((row) => {
              const utilization = Math.round(
                (row.present / row.planned) * 100,
              );
              return (
                <div
                  key={row.projectCode}
                  className="mb-3 rounded-xl bg-muted/60 p-3 last:mb-0"
                >
                  <div className="text-xs font-medium text-foreground">
                    {row.projectCode}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {row.project}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Planned: {row.planned}</span>
                    <span>Present: {row.present}</span>
                    <span className="font-semibold text-foreground">
                      {utilization}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${utilization}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </ChartCard>

          <ChartCard
            title="Overdue Payments"
            description="Invoices past due date requiring escalation."
          >
            <div className="space-y-3 text-xs">
              {overduePayments.map((row) => (
                <div
                  key={row.id}
                  className="rounded-xl border border-border/70 bg-muted/40 p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-foreground">
                      {row.project}
                    </span>
                    <StatusBadge status="Due" />
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {row.client}
                  </p>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{row.days} days overdue</span>
                    <span className="font-semibold text-foreground">
                      {row.amount.toLocaleString("en-BD", {
                        style: "currency",
                        currency: "BDT",
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Top Performing Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl bg-muted/60 p-3 text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="font-medium text-foreground">
                        {project.code}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {project.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-emerald-700">
                        {project.margin}% margin
                      </div>
                      <div className="text-[10px] text-emerald-600">
                        Running healthy
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    {project.performance}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

