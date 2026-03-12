import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleTable } from "@/components/shared/simple-table"
import { ProgressList } from "@/components/shared/progress-list"

type BalanceRow = {
  id: string
  head: string
  group: "Assets" | "Liabilities" | "Equity"
  amountCurrent: number
  amountPrevious: number
}

const balanceSheetData: BalanceRow[] = [
  {
    id: "1",
    head: "Project Work-in-Progress",
    group: "Assets",
    amountCurrent: 68_500_000,
    amountPrevious: 62_400_000,
  },
  {
    id: "2",
    head: "Accounts Receivable – Clients",
    group: "Assets",
    amountCurrent: 18_200_000,
    amountPrevious: 16_800_000,
  },
  {
    id: "3",
    head: "Cash & Bank Balances",
    group: "Assets",
    amountCurrent: 7_600_000,
    amountPrevious: 6_900_000,
  },
  {
    id: "4",
    head: "Accounts Payable – Subcontractors",
    group: "Liabilities",
    amountCurrent: 12_300_000,
    amountPrevious: 11_700_000,
  },
  {
    id: "5",
    head: "Salary & Wages Payable",
    group: "Liabilities",
    amountCurrent: 3_400_000,
    amountPrevious: 3_200_000,
  },
  {
    id: "6",
    head: "Shareholders' Equity",
    group: "Equity",
    amountCurrent: 78_600_000,
    amountPrevious: 71_200_000,
  },
]

export default function BalanceSheetPage() {
  const assets = balanceSheetData.filter((row) => row.group === "Assets")
  const liabilities = balanceSheetData.filter(
    (row) => row.group === "Liabilities",
  )
  const equity = balanceSheetData.filter((row) => row.group === "Equity")

  const totalAssets = assets.reduce((sum, row) => sum + row.amountCurrent, 0)
  const totalLiabilities = liabilities.reduce(
    (sum, row) => sum + row.amountCurrent,
    0,
  )
  const totalEquity = equity.reduce((sum, row) => sum + row.amountCurrent, 0)

  const workingCapital =
    totalAssets - (totalLiabilities + totalEquity) + totalEquity

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Balance Sheet"
        description="Month-end position of assets, liabilities, and equity for construction operations."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Assets"
          value={totalAssets.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Projects, receivables, and cash"
        />
        <StatCard
          label="Liabilities"
          value={totalLiabilities.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Subcontractors & payroll dues"
        />
        <StatCard
          label="Equity"
          value={totalEquity.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Owners' funds in business"
        />
        <StatCard
          label="Working Capital Snapshot"
          value={workingCapital.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Available for project execution"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Balance Sheet – Current Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SimpleTable
                columns={[
                  {
                    key: "group",
                    header: "Group",
                    className: "min-w-[100px]",
                  },
                  {
                    key: "head",
                    header: "Head",
                    className: "min-w-[260px]",
                  },
                  {
                    key: "amountCurrent",
                    header: "Current (BDT)",
                    render: (row) =>
                      row.amountCurrent.toLocaleString("en-BD", {
                        maximumFractionDigits: 0,
                      }),
                    className: "min-w-[140px] text-right",
                  },
                  {
                    key: "amountPrevious",
                    header: "Previous (BDT)",
                    render: (row) =>
                      row.amountPrevious.toLocaleString("en-BD", {
                        maximumFractionDigits: 0,
                      }),
                    className: "min-w-[140px] text-right",
                  },
                ]}
                data={balanceSheetData}
                rowKey={(row) => row.id}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Composition Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressList
                items={[
                  {
                    id: "assets",
                    label: "Assets",
                    value: 100,
                    helper: totalAssets.toLocaleString("en-BD", {
                      style: "currency",
                      currency: "BDT",
                      maximumFractionDigits: 0,
                    }),
                  },
                  {
                    id: "liabilities",
                    label: "Liabilities",
                    value: Math.round(
                      (totalLiabilities / (totalLiabilities + totalEquity)) *
                        100,
                    ),
                    helper: totalLiabilities.toLocaleString("en-BD", {
                      style: "currency",
                      currency: "BDT",
                      maximumFractionDigits: 0,
                    }),
                  },
                  {
                    id: "equity",
                    label: "Equity",
                    value: Math.round(
                      (totalEquity / (totalLiabilities + totalEquity)) * 100,
                    ),
                    helper: totalEquity.toLocaleString("en-BD", {
                      style: "currency",
                      currency: "BDT",
                      maximumFractionDigits: 0,
                    }),
                  },
                ]}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Project-Linked Finance Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="rounded-xl bg-slate-50/70 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-900">
                    DU-0001 – 12 Floors Commercial Building
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    Positive
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-slate-600">
                  <div>
                    <div>Receivable</div>
                    <div className="font-semibold text-slate-900">
                      7,800,000
                    </div>
                  </div>
                  <div>
                    <div>Payable</div>
                    <div className="font-semibold text-slate-900">
                      3,200,000
                    </div>
                  </div>
                  <div>
                    <div>Exposure</div>
                    <div className="font-semibold text-slate-900">
                      4,600,000
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-slate-50/70 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-900">
                    CTG-0007 – Factory Foundation Work
                  </span>
                  <span className="text-[11px] font-semibold text-amber-700">
                    Tight
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-slate-600">
                  <div>
                    <div>Receivable</div>
                    <div className="font-semibold text-slate-900">
                      4,200,000
                    </div>
                  </div>
                  <div>
                    <div>Payable</div>
                    <div className="font-semibold text-slate-900">
                      3,900,000
                    </div>
                  </div>
                  <div>
                    <div>Exposure</div>
                    <div className="font-semibold text-slate-900">
                      300,000
                    </div>
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

