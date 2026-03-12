import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"

type ManpowerAttendanceRow = {
  projectCode: string
  project: string
  date: string
  engineer: number
  supervisor: number
  foreman: number
  headMistry: number
  mistry: number
  worker: number
  helper: number
  total: number
  inTime: string
  outTime: string
  earlyOut: number
}

const manpowerAttendance: ManpowerAttendanceRow[] = [
  {
    projectCode: "DU-0001",
    project: "12 Floors Commercial Building",
    date: "10 Mar 2026",
    engineer: 2,
    supervisor: 3,
    foreman: 2,
    headMistry: 1,
    mistry: 8,
    worker: 22,
    helper: 10,
    total: 48,
    inTime: "08:00 AM",
    outTime: "05:10 PM",
    earlyOut: 1,
  },
  {
    projectCode: "CTG-0007",
    project: "Factory Foundation Work",
    date: "10 Mar 2026",
    engineer: 1,
    supervisor: 2,
    foreman: 1,
    headMistry: 1,
    mistry: 6,
    worker: 18,
    helper: 7,
    total: 36,
    inTime: "08:10 AM",
    outTime: "05:00 PM",
    earlyOut: 2,
  },
]

export default function ManpowerAttendancePage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Manpower Attendance"
        description="Project-wise manpower presence by role for daily monitoring and billing."
      />

      <SimpleTable
        columns={[
          { key: "projectCode", header: "Project No" },
          {
            key: "project",
            header: "Project",
          },
          { key: "date", header: "Date" },
          { key: "engineer", header: "Engineer" },
          { key: "supervisor", header: "Supervisor" },
          { key: "foreman", header: "Foreman" },
          { key: "headMistry", header: "Head Mistry" },
          { key: "mistry", header: "Mistry" },
          { key: "worker", header: "Worker" },
          { key: "helper", header: "Helper" },
          { key: "total", header: "Total" },
          { key: "inTime", header: "In Time" },
          { key: "outTime", header: "Out Time" },
          { key: "earlyOut", header: "Early Out" },
        ]}
        data={manpowerAttendance}
        rowKey={(row) => row.projectCode + row.date}
      />
    </div>
  )
}

