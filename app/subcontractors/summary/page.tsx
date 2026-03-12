import { PageHeader } from "@/components/shared/page-header"
import { ProgressList } from "@/components/shared/progress-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubcontractorSummaryPage() {
  const items = [
    {
      id: "billed",
      label: "Billed",
      value: 78,
      helper: "BDT 13.7 Cr total RA bills",
    },
    {
      id: "paid",
      label: "Paid",
      value: 64,
      helper: "BDT 11.2 Cr released",
    },
    {
      id: "due",
      label: "Outstanding",
      value: 36,
      helper: "BDT 2.5 Cr payable",
    },
  ]

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="SUB-CONTRACTOR SUMMARY"
        description="High‑level summary of subcontractor billing and payment position."
      />

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Billing vs Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressList items={items} />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

