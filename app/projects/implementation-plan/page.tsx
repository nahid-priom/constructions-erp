import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type PlanRow = {
  sl: number
  workBreakdown: string
  engineer: string
  supervisor: string
  foreman: string
  headMistry: string
  mistry: number
  worker: number
  helper: number
  manDay: number
  startDate: string
  finishDate: string
}

const implementationPlan: PlanRow[] = [
  {
    sl: 1,
    workBreakdown: "Excavation and PCC for foundations",
    engineer: "Engr. Moinul Hasan",
    supervisor: "Kamrul Ahsan",
    foreman: "Md. Rashed",
    headMistry: "Abdul Karim",
    mistry: 6,
    worker: 18,
    helper: 10,
    manDay: 34,
    startDate: "05 Jan 2026",
    finishDate: "18 Jan 2026",
  },
  {
    sl: 2,
    workBreakdown: "RCC footing and column up to plinth",
    engineer: "Engr. Moinul Hasan",
    supervisor: "Kamrul Ahsan",
    foreman: "Md. Rashed",
    headMistry: "Abdul Karim",
    mistry: 8,
    worker: 22,
    helper: 12,
    manDay: 42,
    startDate: "20 Jan 2026",
    finishDate: "10 Feb 2026",
  },
  {
    sl: 3,
    workBreakdown: "Slab casting up to 4th floor",
    engineer: "Engr. Farzana Rahman",
    supervisor: "Kamrul Ahsan",
    foreman: "Md. Rashed",
    headMistry: "Abdul Karim",
    mistry: 10,
    worker: 26,
    helper: 14,
    manDay: 52,
    startDate: "15 Feb 2026",
    finishDate: "30 Mar 2026",
  },
]

export default function ImplementationPlanPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="IMPLEMENTATION PLAN"
        description="Work breakdown with assigned site team and man‑day plan for DU-0001."
      />

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Work Breakdown & Manpower Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "sl", header: "Sl", className: "min-w-[40px]" },
                {
                  key: "workBreakdown",
                  header: "Work Breakdown",
                  className: "min-w-[260px]",
                },
                {
                  key: "engineer",
                  header: "Engineer",
                  className: "min-w-[160px]",
                },
                {
                  key: "supervisor",
                  header: "Supervisor",
                  className: "min-w-[160px]",
                },
                {
                  key: "foreman",
                  header: "Foreman",
                  className: "min-w-[140px]",
                },
                {
                  key: "headMistry",
                  header: "Head Mistry",
                  className: "min-w-[140px]",
                },
                {
                  key: "mistry",
                  header: "Mistry",
                  className: "min-w-[80px] text-right",
                },
                {
                  key: "worker",
                  header: "Worker",
                  className: "min-w-[80px] text-right",
                },
                {
                  key: "helper",
                  header: "Helper",
                  className: "min-w-[80px] text-right",
                },
                {
                  key: "manDay",
                  header: "Man-Day",
                  className: "min-w-[90px] text-right",
                },
                {
                  key: "startDate",
                  header: "Start Date",
                  className: "min-w-[110px]",
                },
                {
                  key: "finishDate",
                  header: "Finish Date",
                  className: "min-w-[110px]",
                },
              ]}
              data={implementationPlan}
              rowKey={(row) => row.sl}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

