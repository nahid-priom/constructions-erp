import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type FlatSaleRow = {
  flatNo: string
  tower: string
  type: string
  buyer: string
  bookingDate: string
  salePrice: number
  status: "Booked" | "Registered" | "Available"
}

const flatSales: FlatSaleRow[] = [
  {
    flatNo: "A-7B",
    tower: "Tower A",
    type: "3 Bed – Corner",
    buyer: "Akhlaqur Rahman",
    bookingDate: "15 Feb 2026",
    salePrice: 23_000_000,
    status: "Registered",
  },
  {
    flatNo: "A-6A",
    tower: "Tower A",
    type: "3 Bed – Standard",
    buyer: "Sariful Islam",
    bookingDate: "02 Mar 2026",
    salePrice: 21_800_000,
    status: "Booked",
  },
  {
    flatNo: "B-5C",
    tower: "Tower B",
    type: "2 Bed – Compact",
    buyer: "–",
    bookingDate: "-",
    salePrice: 0,
    status: "Available",
  },
]

export default function FlatsSalesPage() {
  const booked = flatSales.filter((f) => f.status !== "Available")
  const totalValue = booked.reduce((sum, row) => sum + row.salePrice, 0)

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="FLATS – SALES"
        description="Sales register for residential flats linked to construction projects."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Booked / Registered"
          value={`${booked.length} flats`}
          helper="Confirmed customers"
        />
        <StatCard
          label="Available"
          value={`${flatSales.filter((f) => f.status === "Available").length} flats`}
          helper="Ready for booking"
        />
        <StatCard
          label="Total Sales Value"
          value={totalValue.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Booked and registered flats"
        />
        <StatCard
          label="Primary Location"
          value="Dhaka (Banani)"
          helper="Linked to DU-0001 project"
        />
      </section>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Flat Sales Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "flatNo", header: "Flat No", className: "min-w-[80px]" },
                {
                  key: "tower",
                  header: "Tower",
                  className: "min-w-[80px]",
                },
                {
                  key: "type",
                  header: "Type",
                  className: "min-w-[180px]",
                },
                {
                  key: "buyer",
                  header: "Buyer",
                  className: "min-w-[200px]",
                },
                {
                  key: "bookingDate",
                  header: "Booking Date",
                  className: "min-w-[110px]",
                },
                {
                  key: "salePrice",
                  header: "Sale Price (BDT)",
                  render: (row: FlatSaleRow) =>
                    row.salePrice
                      ? row.salePrice.toLocaleString("en-BD", {
                          maximumFractionDigits: 0,
                        })
                      : "-",
                  className: "min-w-[150px] text-right",
                },
                {
                  key: "status",
                  header: "Status",
                  className: "min-w-[110px]",
                },
              ]}
              data={flatSales}
              rowKey={(row) => row.flatNo}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

