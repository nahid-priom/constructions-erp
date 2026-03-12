import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleTable } from "@/components/shared/simple-table"
import { FilterBar } from "@/components/shared/filter-bar"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type JournalRow = {
  id: string
  date: string
  projectCode: string
  narration: string
  debitAccount: string
  creditAccount: string
  debit: number
  credit: number
  postingDate: string
  status: "Posted" | "Pending"
}

const journalRegister: JournalRow[] = [
  {
    id: "JV-2026-0032",
    date: "10 Mar 2026",
    projectCode: "DU-0001",
    narration:
      "Being materials issued to site as per MR-015, charged to project inventory.",
    debitAccount: "Project Materials – DU-0001",
    creditAccount: "Central Store Inventory",
    debit: 480_000,
    credit: 480_000,
    postingDate: "10 Mar 2026",
    status: "Posted",
  },
  {
    id: "JV-2026-0031",
    date: "09 Mar 2026",
    projectCode: "CTG-0007",
    narration:
      "Being salary cost of site supervisory staff allocated for Feb 26.",
    debitAccount: "Project Overhead – CTG-0007",
    creditAccount: "Salary Payable",
    debit: 720_000,
    credit: 720_000,
    postingDate: "09 Mar 2026",
    status: "Posted",
  },
  {
    id: "JV-2026-0030",
    date: "08 Mar 2026",
    projectCode: "GZP-0004",
    narration: "Being advance received from client adjusted against billing.",
    debitAccount: "Client Advance – GZP-0004",
    creditAccount: "Project Revenue – GZP-0004",
    debit: 500_000,
    credit: 500_000,
    postingDate: "08 Mar 2026",
    status: "Pending",
  },
]

export default function JournalPage() {
  const totalDebit = journalRegister.reduce((sum, row) => sum + row.debit, 0)
  const posted = journalRegister.filter((row) => row.status === "Posted").length

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="Journal Register"
        description="Central register of journal vouchers with project mapping and posting status."
      />

      <section className="grid w-full min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Journal Value"
          value={totalDebit.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Cost and revenue adjustments"
        />
        <StatCard
          label="Posted Entries"
          value={`${posted} of ${journalRegister.length}`}
          helper="Reviewed and confirmed entries"
        />
        <StatCard
          label="Pending Entries"
          value={`${journalRegister.length - posted} entries`}
          helper="Awaiting approval for posting"
        />
        <StatCard
          label="Projects Impacted"
          value="3 projects"
          helper="Dhaka / Chattogram / Gazipur"
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
              <option value="GZP-0004">GZP-0004</option>
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

      <section className="w-full">
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
                  key: "id",
                  header: "Journal No",
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
                  className: "min-w-[130px]",
                },
                {
                  key: "projectCode",
                  header: "Project",
                  className: "min-w-[90px]",
                },
                {
                  key: "debitAccount",
                  header: "Debit A/C",
                  className: "min-w-[200px]",
                },
                {
                  key: "creditAccount",
                  header: "Credit A/C",
                  className: "min-w-[200px]",
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
              data={journalRegister}
              rowKey={(row) => row.id}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

