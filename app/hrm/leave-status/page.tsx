import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { StatusBadge } from "@/components/shared/status-badge"

type LeaveStatusRow = {
  officeId: string
  name: string
  designation: string
  department: string
  leaveType: string
  start: string
  end: string
  days: number
  leaveSystem: string
  status: "Approved" | "Pending" | "Running"
}

const leaveStatus: LeaveStatusRow[] = [
  {
    officeId: "AR-0023",
    name: "Engr. Moinul Hasan",
    designation: "Project Engineer",
    department: "Projects & Engineering",
    leaveType: "Casual Leave",
    start: "15 Mar 2026",
    end: "16 Mar 2026",
    days: 2,
    leaveSystem: "Online",
    status: "Approved",
  },
  {
    officeId: "AR-0038",
    name: "Farzana Akter",
    designation: "Accounts Officer",
    department: "Accounts & Finance",
    leaveType: "Sick Leave",
    start: "18 Mar 2026",
    end: "19 Mar 2026",
    days: 2,
    leaveSystem: "Manual",
    status: "Pending",
  },
]

export default function LeaveStatusPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Leave Status"
        description="Current leave applications with approval status and duration."
      />

      <SimpleTable
        columns={[
          { key: "officeId", header: "Office ID" },
          { key: "name", header: "Name" },
          { key: "designation", header: "Designation" },
          { key: "department", header: "Department" },
          { key: "leaveType", header: "Leave Type" },
          { key: "start", header: "Start" },
          { key: "end", header: "End" },
          { key: "days", header: "Days" },
          { key: "leaveSystem", header: "Leave System" },
          {
            key: "status",
            header: "Status",
            render: (row) =>
              row.status === "Approved" ? (
                <StatusBadge status="Approved" />
              ) : row.status === "Pending" ? (
                <StatusBadge status="Pending" />
              ) : (
                <StatusBadge status="Running" />
              ),
          },
        ]}
        data={leaveStatus}
        rowKey={(row) => row.officeId + row.start}
      />
    </div>
  )
}

