import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ClientPayrollRow = {
  sl: number
  clientName: string
  projectCode: string
  projectName: string
  billingMonth: string
  manpowerCount: number
  totalSalary: number
  status: "Running" | "Closed"
}

const clientDetails: ClientPayrollRow[] = [
  {
    sl: 1,
    clientName: "North View Properties Ltd.",
    projectCode: "DU-0001",
    projectName: "12 Floors Commercial Building",
    billingMonth: "Feb 2026",
    manpowerCount: 42,
    totalSalary: 1_980_000,
    status: "Running",
  },
  {
    sl: 2,
    clientName: "Bay Industrial Holdings",
    projectCode: "CTG-0007",
    projectName: "Factory Foundation Work",
    billingMonth: "Feb 2026",
    manpowerCount: 36,
    totalSalary: 1_540_000,
    status: "Running",
  },
  {
    sl: 3,
    clientName: "Gazipur Land Development",
    projectCode: "GZP-0004",
    projectName: "10 Katha Plot Development",
    billingMonth: "Jan 2026",
    manpowerCount: 18,
    totalSalary: 620_000,
    status: "Closed",
  },
]

export default function PayrollClientDetailsPage() {
  const totalSalary = clientDetails.reduce(
    (sum, row) => sum + row.totalSalary,
    0,
  )

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="PAYROLL – CLIENT DETAILS"
        description="Project-wise salary cost summary for client billing and reconciliation."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Salary Cost (Selected)"
          value={totalSalary.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Across current client projects"
        />
        <StatCard
          label="Active Clients"
          value="2 running"
          helper="With current payroll mapping"
        />
        <StatCard
          label="Closed Projects"
          value="1 job"
          helper="Payroll reconciled and closed"
        />
        <StatCard
          label="Average Manpower"
          value="32 per project"
          helper="Per active project"
        />
      </section>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Client-wise Payroll Mapping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                {
                  key: "sl",
                  header: "Sl",
                  className: "min-w-[40px]",
                },
                {
                  key: "clientName",
                  header: "Client",
                  className: "min-w-[200px]",
                },
                {
                  key: "projectCode",
                  header: "Project",
                  render: (row: ClientPayrollRow) => (
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900">
                        {row.projectCode}
                      </span>
                      <span className="text-[11px] text-slate-600">
                        {row.projectName}
                      </span>
                    </div>
                  ),
                  className: "min-w-[220px]",
                },
                {
                  key: "billingMonth",
                  header: "Billing Month",
                  className: "min-w-[110px]",
                },
                {
                  key: "manpowerCount",
                  header: "Manpower",
                  className: "min-w-[100px] text-right",
                },
                {
                  key: "totalSalary",
                  header: "Total Salary (BDT)",
                  render: (row: ClientPayrollRow) =>
                    row.totalSalary.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[160px] text-right",
                },
                {
                  key: "status",
                  header: "Status",
                  className: "min-w-[100px]",
                },
              ]}
              data={clientDetails}
              rowKey={(row) => row.sl}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

