import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type UnitRateRow = {
  sl: number
  description: string
  unit: string
  rate: number
}

const unitRates: UnitRateRow[] = [
  {
    sl: 1,
    description: "RCC footing including rebar and concrete (up to 1.5m depth)",
    unit: "Cft",
    rate: 620,
  },
  {
    sl: 2,
    description: "Shuttering and staging for column and beam",
    unit: "Sft",
    rate: 95,
  },
  {
    sl: 3,
    description: "Brick soling with sand filling and compaction",
    unit: "Sft",
    rate: 70,
  },
]

export default function SubcontractorUnitRatePage() {
  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="SUB-CONTRACTOR UNIT RATE"
        description="Approved subcontractor unit rates for key construction activities."
      />

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Unit Rate Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "sl", header: "Sl", className: "min-w-[40px]" },
                {
                  key: "description",
                  header: "Description",
                  className: "min-w-[260px]",
                },
                { key: "unit", header: "Unit", className: "min-w-[80px]" },
                {
                  key: "rate",
                  header: "Rate (BDT)",
                  render: (row: UnitRateRow) =>
                    row.rate.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[120px] text-right",
                },
              ]}
              data={unitRates}
              rowKey={(row) => row.sl}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

