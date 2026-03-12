import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleTable } from "@/components/shared/simple-table"
import { FilterBar } from "@/components/shared/filter-bar"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type ReceivedVoucher = {
  id: string
  date: string
  projectCode: string
  project: string
  client: string
  itemName: string
  amount: number
  paymentMethod: string
}

const received: ReceivedVoucher[] = [
  {
    id: "RV-2026-0041",
    date: "09 Mar 2026",
    projectCode: "DU-0001",
    project: "12 Floors Commercial Building",
    client: "North View Properties Ltd.",
    itemName: "Payment against IPC-06",
    amount: 2_400_000,
    paymentMethod: "RTGS",
  },
  {
    id: "RV-2026-0043",
    date: "08 Mar 2026",
    projectCode: "CTG-0007",
    project: "Factory Foundation Work",
    client: "Bay Industrial Holdings",
    itemName: "Advance against contract",
    amount: 3_000_000,
    paymentMethod: "Bank Transfer",
  },
]

export default function ReceivedVoucherPage() {
  const totalReceived = received.reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Received Voucher Register"
        description="Client-wise money received records with project mapping and payment methods."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Collections (This Week)"
          value={totalReceived.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Confirmed deposits in bank"
          trend={{ label: "Aligned with billing plan", direction: "up" }}
        />
        <StatCard
          label="Projects Covered"
          value="2 major jobs"
          helper="Dhaka & Chattogram region"
        />
        <StatCard
          label="Primary Payment Mode"
          value="RTGS / Bank Transfer"
          helper="Corporate client settlement"
        />
        <StatCard
          label="Average Collection"
          value={Math.round(totalReceived / received.length).toLocaleString(
            "en-BD",
            {
              style: "currency",
              currency: "BDT",
              maximumFractionDigits: 0,
            },
          )}
          helper="Per voucher"
        />
      </section>

      <FilterBar>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="w-full max-w-xs">
            <Input placeholder="Search by voucher, client, or project" />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Project</span>
            <Select defaultValue="all">
              <option value="all">All projects</option>
              <option value="DU-0001">DU-0001</option>
              <option value="CTG-0007">CTG-0007</option>
            </Select>
          </div>
        </div>
      </FilterBar>

      <section className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <SimpleTable
            columns={[
              {
                key: "id",
                header: "Voucher",
                render: (row) => (
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-900">
                      {row.id}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {row.date}
                    </span>
                  </div>
                ),
                className: "min-w-[140px]",
              },
              {
                key: "projectCode",
                header: "Project",
                render: (row) => (
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-900">
                      {row.projectCode}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {row.project}
                    </span>
                  </div>
                ),
                className: "min-w-[220px]",
              },
              {
                key: "client",
                header: "Client",
                className: "min-w-[200px]",
              },
              {
                key: "itemName",
                header: "Description",
                className: "min-w-[220px]",
              },
              {
                key: "amount",
                header: "Amount (BDT)",
                render: (row) =>
                  row.amount.toLocaleString("en-BD", {
                    maximumFractionDigits: 0,
                  }),
                className: "min-w-[140px] text-right",
              },
              {
                key: "paymentMethod",
                header: "Method",
                className: "min-w-[120px]",
              },
            ]}
            data={received}
            rowKey={(row) => row.id}
          />
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Receipt Style Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-700">
                      Money Receipt
                    </div>
                    <div className="text-[10px] text-slate-500">
                      For client collections
                    </div>
                  </div>
                  <Badge variant="outline">Receipt Layout</Badge>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <div className="text-slate-500">Receipt No</div>
                    <div className="font-semibold text-slate-900">
                      RV-2026-0041
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Date</div>
                    <div className="font-semibold text-slate-900">
                      09 Mar 2026
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Received From</div>
                    <div className="font-semibold text-slate-900">
                      North View Properties Ltd.
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Project</div>
                    <div className="font-semibold text-slate-900">
                      DU-0001 – 12 Floors Commercial Building
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">
                      Being the amount received against IPC-06.
                    </span>
                    <span className="font-semibold text-slate-900">
                      2,400,000
                    </span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-slate-600">
                  <div>
                    <div>Received By</div>
                    <div className="mt-2 h-7 rounded-md border border-dashed border-slate-300" />
                  </div>
                  <div>
                    <div>Approved By</div>
                    <div className="mt-2 h-7 rounded-md border border-dashed border-slate-300" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

