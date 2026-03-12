import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgressList } from "@/components/shared/progress-list"
import { AttendanceSummaryTable } from "@/components/domains/hr/attendance-summary-table"

type AttendanceSummaryRow = {
  month: string
  projectCode: string
  location: string
  totalDays: number
  present: number
  absent: number
}

const summaryRows: AttendanceSummaryRow[] = [
  {
    month: "Feb 2026",
    projectCode: "DU-0001",
    location: "Banani, Dhaka",
    totalDays: 26,
    present: 25,
    absent: 1,
  },
  {
    month: "Feb 2026",
    projectCode: "CTG-0007",
    location: "CEPZ, Chattogram",
    totalDays: 26,
    present: 24,
    absent: 2,
  },
]

export default function AttendanceSummaryPage() {
  const totalPresent = summaryRows.reduce((sum, r) => sum + r.present, 0)
  const totalAbsent = summaryRows.reduce((sum, r) => sum + r.absent, 0)
  const utilization = Math.round(
    (totalPresent / (totalPresent + totalAbsent || 1)) * 100,
  )

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="Attendance Summary"
        description="Month-wise and project-wise attendance summary for salary processing."
      />

      <section className="grid w-full min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Present Days"
          value={totalPresent.toString()}
          helper="Across focused projects"
        />
        <StatCard
          label="Total Absent Days"
          value={totalAbsent.toString()}
          helper="Excludes approved leave"
        />
        <StatCard
          label="Average Utilization"
          value={`${utilization}%`}
          helper="Presence vs scheduled days"
        />
        <StatCard
          label="Projects Covered"
          value={`${summaryRows.length} projects`}
          helper="Core active jobs"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:min-w-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Project Attendance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceSummaryTable rows={summaryRows} />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 lg:col-span-5 lg:min-w-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                Attendance Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressList
                items={[
                  {
                    id: "presence",
                    label: "Presence Ratio",
                    value: utilization,
                    helper: "Present vs total scheduled days",
                  },
                  {
                    id: "absence",
                    label: "Absence Ratio",
                    value: 100 - utilization,
                    helper: "Includes unplanned absences only",
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

