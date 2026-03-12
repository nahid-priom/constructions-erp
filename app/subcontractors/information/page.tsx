import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type SubcontractorRow = {
  name: string
  workType: string
  mobile: string
  runningProjects: number
  billed: number
  paid: number
}

const subcontractors: SubcontractorRow[] = [
  {
    name: "Rahman Foundation Works",
    workType: "Foundation & RCC",
    mobile: "+880 1711 222 333",
    runningProjects: 2,
    billed: 6_400_000,
    paid: 5_200_000,
  },
  {
    name: "Mithila Piling & Shuttering",
    workType: "Piling & Shuttering",
    mobile: "+880 1811 444 555",
    runningProjects: 1,
    billed: 4_100_000,
    paid: 3_600_000,
  },
  {
    name: "Sylhet Civil Traders",
    workType: "Earth Work & RCC",
    mobile: "+880 1911 666 777",
    runningProjects: 1,
    billed: 3_200_000,
    paid: 2_500_000,
  },
]

export default function SubcontractorInformationPage() {
  const totalBilled = subcontractors.reduce((sum, s) => sum + s.billed, 0)
  const totalPaid = subcontractors.reduce((sum, s) => sum + s.paid, 0)
  const totalDue = totalBilled - totalPaid

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="SUB-CONTRACTOR INFORMATION"
        description="Master list of subcontractors with contact, work type, and billing summary."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Subcontractors"
          value={subcontractors.length.toString()}
          helper="Active vendors"
        />
        <StatCard
          label="Total Billed"
          value={totalBilled.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Across all current jobs"
        />
        <StatCard
          label="Total Paid"
          value={totalPaid.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Released from accounts"
        />
        <StatCard
          label="Outstanding"
          value={totalDue.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Payable against RA bills"
        />
      </section>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Subcontractor Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "name", header: "Name", className: "min-w-[200px]" },
                {
                  key: "workType",
                  header: "Work Type",
                  className: "min-w-[180px]",
                },
                {
                  key: "mobile",
                  header: "Mobile",
                  className: "min-w-[140px]",
                },
                {
                  key: "runningProjects",
                  header: "Running Projects",
                  className: "min-w-[120px] text-right",
                },
                {
                  key: "billed",
                  header: "Billed (BDT)",
                  render: (row: SubcontractorRow) =>
                    row.billed.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[130px] text-right",
                },
                {
                  key: "paid",
                  header: "Paid (BDT)",
                  render: (row: SubcontractorRow) =>
                    row.paid.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[130px] text-right",
                },
              ]}
              data={subcontractors}
              rowKey={(row) => row.name}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

