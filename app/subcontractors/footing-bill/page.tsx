import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type FootingBillRow = {
  billNo: string
  date: string
  projectCode: string
  contractor: string
  description: string
  amount: number
  status: "Pending" | "Approved" | "Paid"
}

const footingBills: FootingBillRow[] = [
  {
    billNo: "FB-DU-0001-06",
    date: "09 Mar 2026",
    projectCode: "DU-0001",
    contractor: "Rahman Foundation Works",
    description: "RCC footing casting up to gridline D-6 – RA Bill 06",
    amount: 1_850_000,
    status: "Approved",
  },
  {
    billNo: "FB-CTG-0007-04",
    date: "08 Mar 2026",
    projectCode: "CTG-0007",
    contractor: "Mithila Piling & Shuttering",
    description: "Shuttering and staging for pile caps – RA Bill 04",
    amount: 1_245_000,
    status: "Pending",
  },
]

export default function FootingBillPage() {
  const totalAmount = footingBills.reduce((sum, row) => sum + row.amount, 0)

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="SUB-CONTRACTOR FOOTING BILL"
        description="Register of footing‑related RA bills raised by subcontractors."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols=4">
        <StatCard
          label="Total Footing Bills"
          value={totalAmount.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Pending and approved"
        />
        <StatCard
          label="Number of Bills"
          value={footingBills.length.toString()}
          helper="Across key projects"
        />
      </section>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Footing Bill Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "billNo", header: "Bill No", className: "min-w-[150px]" },
                {
                  key: "date",
                  header: "Date",
                  className: "min-w-[110px]",
                },
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
                  render: (row: FootingBillRow) =>
                    row.amount.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[140px] text-right",
                },
                {
                  key: "status",
                  header: "Status",
                  className: "min-w-[110px]",
                },
              ]}
              data={footingBills}
              rowKey={(row) => row.billNo}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

