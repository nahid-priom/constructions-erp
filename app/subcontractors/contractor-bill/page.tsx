import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ContractorBillRow = {
  billNo: string
  date: string
  contractor: string
  projectCode: string
  amount: number
  paid: number
}

const contractorBills: ContractorBillRow[] = [
  {
    billNo: "CB-DU-0001-06",
    date: "09 Mar 2026",
    contractor: "Rahman Foundation Works",
    projectCode: "DU-0001",
    amount: 1_850_000,
    paid: 1_000_000,
  },
  {
    billNo: "CB-CTG-0007-04",
    date: "08 Mar 2026",
    contractor: "Mithila Piling & Shuttering",
    projectCode: "CTG-0007",
    amount: 1_245_000,
    paid: 800_000,
  },
]

export default function ContractorBillPage() {
  const totalAmount = contractorBills.reduce((sum, row) => sum + row.amount, 0)
  const totalPaid = contractorBills.reduce((sum, row) => sum + row.paid, 0)
  const totalDue = totalAmount - totalPaid

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="SUB-CONTRACTOR BILL REGISTER"
        description="Summary of subcontractor bills with paid and due amounts."
      />

      <section className="grid w-full min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Billed"
          value={totalAmount.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Subcontractor RA bills"
        />
        <StatCard
          label="Total Paid"
          value={totalPaid.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Released against bills"
        />
        <StatCard
          label="Outstanding"
          value={totalDue.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Due to subcontractors"
        />
        <StatCard
          label="Active Projects"
          value="DU-0001 / CTG-0007"
          helper="Linked with RA bills"
        />
      </section>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Contractor Bill Register
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
                  key: "contractor",
                  header: "Contractor",
                  className: "min-w-[200px]",
                },
                {
                  key: "projectCode",
                  header: "Project Code",
                  className: "min-w-[110px]",
                },
                {
                  key: "amount",
                  header: "Bill Amount (BDT)",
                  render: (row: ContractorBillRow) =>
                    row.amount.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[140px] text-right",
                },
                {
                  key: "paid",
                  header: "Paid (BDT)",
                  render: (row: ContractorBillRow) =>
                    row.paid.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[140px] text-right",
                },
              ]}
              data={contractorBills}
              rowKey={(row) => row.billNo}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

