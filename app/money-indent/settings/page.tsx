import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type IndentCategoryRow = {
  category: string
  description: string
  approvalFlow: string
  restrictedDelete: boolean
}

const indentCategories: IndentCategoryRow[] = [
  {
    category: "Site Running Bill",
    description: "Routine money indent for site materials and labour payments.",
    approvalFlow: "Site Engineer → Project Engineer → Accounts → Proprietor",
    restrictedDelete: true,
  },
  {
    category: "Advance to Sub-Contractor",
    description: "Advance payment request against work order / contract.",
    approvalFlow: "Project Engineer → Accounts → Proprietor",
    restrictedDelete: true,
  },
  {
    category: "Petty Cash Refill",
    description: "Small value petty cash indent for site and HO.",
    approvalFlow: "Site Supervisor / Admin → Accounts",
    restrictedDelete: false,
  },
]

export default function MoneyIndentSettingsPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="MONEY INDENT – SETTINGS"
        description="Configuration of money indent categories, approval statuses, and control rules."
      />

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Indent Categories & Approval Flow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SimpleTable
              columns={[
                {
                  key: "category",
                  header: "Category",
                  className: "min-w-[180px]",
                },
                {
                  key: "description",
                  header: "Description",
                  className: "min-w-[260px]",
                },
                {
                  key: "approvalFlow",
                  header: "Approval Flow",
                  className: "min-w-[260px]",
                },
                {
                  key: "restrictedDelete",
                  header: "Delete Control",
                  render: (row: IndentCategoryRow) =>
                    row.restrictedDelete ? (
                      <Badge variant="outline">Can&apos;t delete without my permission</Badge>
                    ) : (
                      <Badge variant="secondary">Standard</Badge>
                    ),
                  className: "min-w-[200px]",
                },
              ]}
              data={indentCategories}
              rowKey={(row) => row.category}
            />

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                Restricted actions:
              </span>
              <span>
                Categories marked as{" "}
                <span className="font-semibold">Can&apos;t delete without my permission</span>{" "}
                cannot be removed directly.
              </span>
              <Button size="sm" variant="outline" disabled>
                Delete selected (restricted)
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

