import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterBar } from "@/components/shared/filter-bar"
import { Select } from "@/components/ui/select"

type PayrollRow = {
  sl: number
  date: string
  officeId: string
  name: string
  designation: string
  projectCode: string
  presentDays: number
  absentDays: number
  netPayable: number
  status: "Prepared" | "Approved" | "Hold"
}

const payrollSheet: PayrollRow[] = [
  {
    sl: 1,
    date: "29 Feb 2026",
    officeId: "AR-0023",
    name: "Engr. Moinul Hasan",
    designation: "Project Engineer",
    projectCode: "DU-0001",
    presentDays: 26,
    absentDays: 0,
    netPayable: 149_500,
    status: "Approved",
  },
  {
    sl: 2,
    date: "29 Feb 2026",
    officeId: "AR-0047",
    name: "Kamrul Ahsan",
    designation: "Site Supervisor",
    projectCode: "CTG-0007",
    presentDays: 25,
    absentDays: 1,
    netPayable: 73_500,
    status: "Prepared",
  },
  {
    sl: 3,
    date: "29 Feb 2026",
    officeId: "MS-0101",
    name: "Md. Rashed",
    designation: "Head Mistry",
    projectCode: "SYL-0003",
    presentDays: 27,
    absentDays: 0,
    netPayable: 56_700,
    status: "Hold",
  },
]

export default function PayrollSheetPage() {
  const totalNet = payrollSheet.reduce((sum, row) => sum + row.netPayable, 0)

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="PAYROLL SHEET"
        description="Month-end payroll sheet linked with manpower attendance and project codes."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Net Payable"
          value={totalNet.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="For listed records"
        />
        <StatCard
          label="Approved"
          value="1 employee"
          helper="Ready for disbursement"
        />
        <StatCard
          label="Prepared"
          value="1 employee"
          helper="Pending approval"
        />
        <StatCard
          label="On Hold"
          value="1 employee"
          helper="Clarification required"
        />
      </section>

      <FilterBar>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Project</span>
            <Select defaultValue="all">
              <option value="all">All</option>
              <option value="DU-0001">DU-0001</option>
              <option value="CTG-0007">CTG-0007</option>
              <option value="SYL-0003">SYL-0003</option>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Status</span>
            <Select defaultValue="all">
              <option value="all">All</option>
              <option value="Prepared">Prepared</option>
              <option value="Approved">Approved</option>
              <option value="Hold">Hold</option>
            </Select>
          </div>
        </div>
      </FilterBar>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Payroll Sheet – Summary
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
                  key: "date",
                  header: "Date",
                  className: "min-w-[110px]",
                },
                {
                  key: "officeId",
                  header: "Office ID",
                  className: "min-w-[90px]",
                },
                {
                  key: "name",
                  header: "Name",
                  className: "min-w-[150px]",
                },
                {
                  key: "designation",
                  header: "Designation",
                  className: "min-w-[150px]",
                },
                {
                  key: "projectCode",
                  header: "Project Code",
                  className: "min-w-[100px]",
                },
                {
                  key: "presentDays",
                  header: "Present",
                  className: "min-w-[80px] text-right",
                },
                {
                  key: "absentDays",
                  header: "Absent",
                  className: "min-w-[80px] text-right",
                },
                {
                  key: "netPayable",
                  header: "Net Payable (BDT)",
                  render: (row: PayrollRow) =>
                    row.netPayable.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[140px] text-right",
                },
                {
                  key: "status",
                  header: "Status",
                  className: "min-w-[100px]",
                },
              ]}
              data={payrollSheet}
              rowKey={(row) => row.sl}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

