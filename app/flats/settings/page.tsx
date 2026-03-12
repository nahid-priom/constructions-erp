import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type FlatConfigRow = {
  tower: string
  flatType: string
  areaSft: number
  facing: string
  basePrice: number
  restricted: boolean
}

const flatConfigs: FlatConfigRow[] = [
  {
    tower: "Tower A",
    flatType: "3 Bed – Standard",
    areaSft: 1450,
    facing: "South",
    basePrice: 12_500,
    restricted: false,
  },
  {
    tower: "Tower A",
    flatType: "3 Bed – Corner",
    areaSft: 1650,
    facing: "South‑West",
    basePrice: 13_800,
    restricted: true,
  },
  {
    tower: "Tower B",
    flatType: "2 Bed – Compact",
    areaSft: 980,
    facing: "East",
    basePrice: 9_200,
    restricted: false,
  },
]

export default function FlatsSettingsPage() {
  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="FLATS – SETTINGS"
        description="Configuration of flat types, towers, and base pricing for sales module."
      />

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Flat Type Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "tower", header: "Tower", className: "min-w-[90px]" },
                {
                  key: "flatType",
                  header: "Flat Type",
                  className: "min-w-[180px]",
                },
                {
                  key: "areaSft",
                  header: "Area (Sft)",
                  className: "min-w-[100px] text-right",
                },
                {
                  key: "facing",
                  header: "Facing",
                  className: "min-w-[120px]",
                },
                {
                  key: "basePrice",
                  header: "Base Price (BDT/Sft)",
                  render: (row: FlatConfigRow) =>
                    row.basePrice.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[150px] text-right",
                },
                {
                  key: "restricted",
                  header: "Access",
                  render: (row: FlatConfigRow) =>
                    row.restricted ? (
                      <Badge variant="outline">Restricted File</Badge>
                    ) : (
                      <Badge variant="secondary">Standard</Badge>
                    ),
                  className: "min-w-[140px]",
                },
              ]}
              data={flatConfigs}
              rowKey={(row) => row.tower + row.flatType}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

