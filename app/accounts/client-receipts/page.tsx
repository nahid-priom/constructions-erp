import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleTable } from "@/components/shared/simple-table"
import { FilterBar } from "@/components/shared/filter-bar"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { ProgressList } from "@/components/shared/progress-list"

type ClientReceipt = {
  id: string
  date: string
  projectCode: string
  client: string
  invoice: string
  amount: number
  paymentMethod: string
  receivedBy: string
  remarks: string
}

const receipts: ClientReceipt[] = [
  {
    id: "CR-2026-0102",
    date: "10 Mar 2026",
    projectCode: "DU-0001",
    client: "North View Properties Ltd.",
    invoice: "IPC-06",
    amount: 2_400_000,
    paymentMethod: "RTGS",
    receivedBy: "Accounts Officer – Mahmudul Hasan",
    remarks: "Payment received as per contract schedule.",
  },
  {
    id: "CR-2026-0103",
    date: "08 Mar 2026",
    projectCode: "CTG-0007",
    client: "Bay Industrial Holdings",
    invoice: "Advance-02",
    amount: 3_000_000,
    paymentMethod: "Bank Transfer",
    receivedBy: "Senior Accounts – Farzana Akter",
    remarks: "Advance against piling & foundation works.",
  },
  {
    id: "CR-2026-0104",
    date: "07 Mar 2026",
    projectCode: "GZP-0004",
    client: "Gazipur Land Development",
    invoice: "IPC-02",
    amount: 1_250_000,
    paymentMethod: "Cheque",
    receivedBy: "Accounts Officer – Mahmudul Hasan",
    remarks: "Cheque cleared with no discrepancy.",
  },
]

export default function ClientReceiptsPage() {
  const totalReceived = receipts.reduce((sum, r) => sum + r.amount, 0)
  const planned =
    2_400_000 /* DU-0001 IPC-06 */ +
    3_000_000 /* CTG-0007 Advance-02 */ +
    1_600_000 /* GZP-0004 Planned IPC-02 */

  const achievement = Math.round((totalReceived / planned) * 100)

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Client Receipts"
        description="Track money received from clients against invoices and project codes."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Received (This Week)"
          value={totalReceived.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Confirmed receipts against projects"
        />
        <StatCard
          label="Billing Achievement"
          value={`${achievement}%`}
          helper="Collection vs billing plan"
          trend={{
            label: "Collections improving vs last month",
            direction: "up",
          }}
        />
        <StatCard
          label="Active Client Accounts"
          value="3 key clients"
          helper="Dhaka / Chattogram / Gazipur"
        />
        <StatCard
          label="Primary Mode"
          value="RTGS / Bank Transfer"
          helper="Preferred settlement channels"
        />
      </section>

      <FilterBar>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="w-full max-w-xs">
            <Input placeholder="Search by client, project, or reference" />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Project</span>
            <Select defaultValue="all">
              <option value="all">All projects</option>
              <option value="DU-0001">DU-0001</option>
              <option value="CTG-0007">CTG-0007</option>
              <option value="GZP-0004">GZP-0004</option>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Method</span>
            <Select defaultValue="all">
              <option value="all">All methods</option>
              <option value="RTGS">RTGS</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cheque">Cheque</option>
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
                header: "Receipt No",
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
                  <span className="text-xs font-semibold text-slate-900">
                    {row.projectCode}
                  </span>
                ),
                className: "min-w-[90px]",
              },
              {
                key: "client",
                header: "Client",
                className: "min-w-[200px]",
              },
              {
                key: "invoice",
                header: "Invoice / Reference",
                className: "min-w-[110px]",
              },
              {
                key: "amount",
                header: "Amount (BDT)",
                render: (row) =>
                  row.amount.toLocaleString("en-BD", {
                    maximumFractionDigits: 0,
                  }),
                className: "min-w-[130px] text-right",
              },
              {
                key: "paymentMethod",
                header: "Method",
                className: "min-w-[120px]",
              },
              {
                key: "receivedBy",
                header: "Received By",
                className: "min-w-[200px]",
              },
            ]}
            data={receipts}
            rowKey={(row) => row.id}
          />
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Due vs Received Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressList
                items={[
                  {
                    id: "received",
                    label: "Received",
                    value: achievement,
                    helper: totalReceived.toLocaleString("en-BD", {
                      style: "currency",
                      currency: "BDT",
                      maximumFractionDigits: 0,
                    }),
                  },
                  {
                    id: "due",
                    label: "Outstanding",
                    value: 100 - achievement,
                    helper: (planned - totalReceived).toLocaleString("en-BD", {
                      style: "currency",
                      currency: "BDT",
                      maximumFractionDigits: 0,
                    }),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

