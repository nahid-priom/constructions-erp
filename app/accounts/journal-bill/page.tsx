import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleTable } from "@/components/shared/simple-table"
import { FilterBar } from "@/components/shared/filter-bar"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type JournalEntry = {
  id: string
  date: string
  ref: string
  narration: string
  debit: number
  credit: number
  projectCode: string
  status: "Posted" | "Pending"
}

type BillRow = {
  id: string
  billNo: string
  date: string
  vendor: string
  projectCode: string
  amount: number
  status: "Approved" | "Pending"
}

const journalEntries: JournalEntry[] = [
  {
    id: "1",
    date: "10 Mar 2026",
    ref: "JV-2026-0032",
    narration: "Being site materials issued to DU-0001 as per MR-015.",
    debit: 480_000,
    credit: 480_000,
    projectCode: "DU-0001",
    status: "Posted",
  },
  {
    id: "2",
    date: "09 Mar 2026",
    ref: "JV-2026-0031",
    narration: "Being salary cost allocated to factory project for Feb 26.",
    debit: 720_000,
    credit: 720_000,
    projectCode: "CTG-0007",
    status: "Posted",
  },
]

const bills: BillRow[] = [
  {
    id: "1",
    billNo: "BILL-CTG-042",
    date: "08 Mar 2026",
    vendor: "Rahman Foundation Works",
    projectCode: "CTG-0007",
    amount: 1_350_000,
    status: "Approved",
  },
  {
    id: "2",
    billNo: "BILL-DU-061",
    date: "07 Mar 2026",
    vendor: "North Bengal Cement",
    projectCode: "DU-0001",
    amount: 980_000,
    status: "Pending",
  },
]

export default function JournalBillPage() {
  const totalDebit = journalEntries.reduce((sum, j) => sum + j.debit, 0)
  const totalBills = bills.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Journal & Bill Register"
        description="Project-wise journal entries with linked bills and posting status."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Journal Amount"
          value={totalDebit.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Recognised cost for this week"
        />
        <StatCard
          label="Total Bills Under Process"
          value={totalBills.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Pending and approved bills"
        />
        <StatCard
          label="Posted Entries"
          value="2 vouchers"
          helper="All reviewed by accounts"
        />
        <StatCard
          label="Bill Approval Ratio"
          value="50%"
          helper="Pending approval to be cleared"
        />
      </section>

      <FilterBar>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Project</span>
            <Select defaultValue="all">
              <option value="all">All projects</option>
              <option value="DU-0001">DU-0001</option>
              <option value="CTG-0007">CTG-0007</option>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Status</span>
            <Select defaultValue="all">
              <option value="all">All</option>
              <option value="Posted">Posted</option>
              <option value="Pending">Pending</option>
            </Select>
          </div>
        </div>
      </FilterBar>

      <section className="grid gap-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Journal Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleTable
                columns={[
                  {
                    key: "ref",
                    header: "Journal Ref",
                    render: (row) => (
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-900">
                          {row.ref}
                        </span>
                        <span className="text-[11px] text-slate-600">
                          {row.date}
                        </span>
                      </div>
                    ),
                    className: "min-w-[150px]",
                  },
                  {
                    key: "projectCode",
                    header: "Project",
                    className: "min-w-[120px]",
                  },
                  {
                    key: "narration",
                    header: "Narration",
                    className: "min-w-[260px]",
                  },
                  {
                    key: "debit",
                    header: "Debit (BDT)",
                    render: (row) =>
                      row.debit.toLocaleString("en-BD", {
                        maximumFractionDigits: 0,
                      }),
                    className: "min-w-[130px] text-right",
                  },
                  {
                    key: "credit",
                    header: "Credit (BDT)",
                    render: (row) =>
                      row.credit.toLocaleString("en-BD", {
                        maximumFractionDigits: 0,
                      }),
                    className: "min-w-[130px] text-right",
                  },
                  {
                    key: "status",
                    header: "Status",
                    render: (row) => (
                      <Badge
                        variant={row.status === "Posted" ? "success" : "warning"}
                      >
                        {row.status}
                      </Badge>
                    ),
                    className: "min-w-[100px]",
                  },
                ]}
                data={journalEntries}
                rowKey={(row) => row.id}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Linked Bills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleTable
                columns={[
                  {
                    key: "billNo",
                    header: "Bill No",
                    render: (row) => (
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-900">
                          {row.billNo}
                        </span>
                        <span className="text-[11px] text-slate-600">
                          {row.date}
                        </span>
                      </div>
                    ),
                    className: "min-w-[150px]",
                  },
                  {
                    key: "vendor",
                    header: "Vendor",
                    className: "min-w-[180px]",
                  },
                  {
                    key: "projectCode",
                    header: "Project",
                    className: "min-w-[90px]",
                  },
                  {
                    key: "amount",
                    header: "Amount (BDT)",
                    render: (row) =>
                      row.amount.toLocaleString("en-BD", {
                        maximumFractionDigits: 0,
                      }),
                    className: "min-w-[120px] text-right",
                  },
                  {
                    key: "status",
                    header: "Status",
                    render: (row) => (
                      <Badge
                        variant={row.status === "Approved" ? "success" : "warning"}
                      >
                        {row.status}
                      </Badge>
                    ),
                    className: "min-w-[100px]",
                  },
                ]}
                data={bills}
                rowKey={(row) => row.id}
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

