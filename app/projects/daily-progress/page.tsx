import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DailyProgressRow = {
  date: string
  projectCode: string
  taskName: string
  status: "Not Started" | "In Progress" | "Completed" | "Hold"
}

const dailyProgress: DailyProgressRow[] = [
  {
    date: "10 Mar 2026",
    projectCode: "DU-0001",
    taskName: "Core wall casting up to 8th floor",
    status: "Completed",
  },
  {
    date: "10 Mar 2026",
    projectCode: "CTG-0007",
    taskName: "Rebar fixing for footing grid D-6",
    status: "In Progress",
  },
  {
    date: "10 Mar 2026",
    projectCode: "SYL-0003",
    taskName: "Layout marking for pile caps",
    status: "In Progress",
  },
  {
    date: "09 Mar 2026",
    projectCode: "GZP-0004",
    taskName: "Earth filling completed – Lot 02",
    status: "Completed",
  },
]

export default function DailyProgressPage() {
  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="DAILY PROGRESS"
        description="Day-wise progress log by project code and task name."
      />

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Daily Progress Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "date", header: "Date", className: "min-w-[110px]" },
                {
                  key: "projectCode",
                  header: "Project Code",
                  className: "min-w-[110px]",
                },
                {
                  key: "taskName",
                  header: "Task Name",
                  className: "min-w-[260px]",
                },
                {
                  key: "status",
                  header: "Status",
                  className: "min-w-[120px]",
                },
              ]}
              data={dailyProgress}
              rowKey={(row) => row.projectCode + row.date}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

