import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type StoreRow = {
  date: string
  projectCode: string
  location: string
  itemName: string
  brand: string
  model: string
  serial: string
  qty: number
  remarks: string
}

const storeList: StoreRow[] = [
  {
    date: "09 Mar 2026",
    projectCode: "DU-0001",
    location: "Banani, Dhaka",
    itemName: "Concrete Mixer Machine",
    brand: "SANYO",
    model: "MX-350",
    serial: "MX350-DU-0001-09",
    qty: 2,
    remarks: "Allocated for core wall casting.",
  },
  {
    date: "09 Mar 2026",
    projectCode: "CTG-0007",
    location: "CEPZ, Chattogram",
    itemName: "Rebar Cutter",
    brand: "Makita",
    model: "RC-28",
    serial: "RC28-CTG-0007-03",
    qty: 1,
    remarks: "Kept at main store – restricted movement.",
  },
  {
    date: "08 Mar 2026",
    projectCode: "SYL-0003",
    location: "Zindabazar, Sylhet",
    itemName: "Shutter Panel Set",
    brand: "Local Fabrication",
    model: "SP-16",
    serial: "SP16-SYL-0003-12",
    qty: 45,
    remarks: "Steel shuttering panels for pile caps.",
  },
  {
    date: "08 Mar 2026",
    projectCode: "GZP-0004",
    location: "Gazipur",
    itemName: "Safety Helmet",
    brand: "3M",
    model: "SH-300",
    serial: "BATCH-2403",
    qty: 60,
    remarks: "Issued for labour and staff as per HSE.",
  },
]

export default function StoreListPage() {
  const totalItems = storeList.length
  const totalQty = storeList.reduce((sum, row) => sum + row.qty, 0)

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="INVENTORY – STORE LIST"
        description="Register of construction tools and materials by project code and location."
      />

      <section className="grid w-full min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Store Entries"
          value={totalItems.toString()}
          helper="Tracked in this view"
        />
        <StatCard
          label="Total Quantity"
          value={totalQty.toString()}
          helper="Tools and safety items"
        />
        <StatCard
          label="Active Projects"
          value="4 jobs"
          helper="DU / CTG / SYL / GZP"
        />
        <StatCard
          label="Restricted Assets"
          value="1 rebar cutter"
          helper="Movement with approval only"
        />
      </section>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Store Item Register
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
                  key: "location",
                  header: "Location",
                  className: "min-w-[180px]",
                },
                {
                  key: "itemName",
                  header: "Item Name",
                  className: "min-w-[180px]",
                },
                {
                  key: "brand",
                  header: "Brand",
                  className: "min-w-[120px]",
                },
                {
                  key: "model",
                  header: "Model",
                  className: "min-w-[120px]",
                },
                {
                  key: "serial",
                  header: "Serial / Batch",
                  className: "min-w-[150px]",
                },
                {
                  key: "qty",
                  header: "Qty",
                  className: "min-w-[70px] text-right",
                },
                {
                  key: "remarks",
                  header: "Remarks",
                  className: "min-w-[220px]",
                },
              ]}
              data={storeList}
              rowKey={(row) => row.projectCode + row.itemName + row.serial}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

