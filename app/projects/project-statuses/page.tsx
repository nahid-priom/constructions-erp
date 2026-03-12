import { PageHeader } from "@/components/shared/page-header"
import { ProgressList } from "@/components/shared/progress-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProjectStatusesPage() {
  const items = [
    {
      id: "completed",
      label: "Completed Projects",
      value: 64,
      helper: "Handover and final billing closed",
    },
    {
      id: "running",
      label: "Running Projects",
      value: 41,
      helper: "Sites with active work fronts",
    },
    {
      id: "under-plan",
      label: "Under Plan",
      value: 23,
      helper: "Opportunities in design / negotiation stage",
    },
  ]

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="PROJECT STATUSES"
        description="High‑level overview of completed, running, and under‑plan projects."
      />

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Status Mix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressList items={items} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-slate-600">
            <p>
              Status values are used across dashboards, accounts, and planning screens
              to keep a single source of truth for each project&apos;s lifecycle.
            </p>
            <p>
              Typical lifecycle: <span className="font-semibold">Under Plan</span>{" "}
              → <span className="font-semibold">Running</span> →{" "}
              <span className="font-semibold">Completed</span>.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

