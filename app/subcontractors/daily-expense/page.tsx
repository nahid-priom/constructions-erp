import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DailyExpenseRow = {
  date: string
  projectCode: string
  contractor: string
  description: string
  amount: number
}

const dailyExpenses: DailyExpenseRow[] = [
  {
    date: "10 Mar 2026",
    projectCode: "DU-0001",
    contractor: "Rahman Foundation Works",
    description: "Extra labour for concrete finishing – night shift",
    amount: 85_000,
  },
  {
    date: "10 Mar 2026",
    projectCode: "CTG-0007",
    contractor: "Mithila Piling & Shuttering",
    description: "Additional shutter panel rental – 2 days",
    amount: 42_000,
  },
  {
    date: "09 Mar 2026",
    projectCode: "SYL-0003",
    contractor: "Sylhet Civil Traders",
    description: "Sand and brick soling – day labour",
    amount: 56_000,
  },
]

export default function SubcontractorDailyExpensePage() {
  const total = dailyExpenses.reduce((sum, row) => sum + row.amount, 0)

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="SUB-CONTRACTOR DAILY EXPENSE"
        description="Daily expense log raised by subcontractors against running projects."
      />

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Daily Expense Register – Total{" "}
              {total.toLocaleString("en-BD", {
                style: "currency",
                currency: "BDT",
                maximumFractionDigits: 0,
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "date", header: "Date", className: "min-w-[110px]" },
                {
                  key: "projectCode",
                  header: "Project Code",
                  className: "min-w-[110px]",
                },
                {
                  key: "contractor",
                  header: "Contractor",
                  className: "min-w-[200px]",
                },
                {
                  key: "description",
                  header: "Description",
                  className: "min-w-[260px]",
                },
                {
                  key: "amount",
                  header: "Amount (BDT)",
                  render: (row: DailyExpenseRow) =>
                    row.amount.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[140px] text-right",
                },
              ]}
              data={dailyExpenses}
              rowKey={(row) => row.projectCode + row.date + row.contractor}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

