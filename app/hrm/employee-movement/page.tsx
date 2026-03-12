import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { StatusBadge } from "@/components/shared/status-badge"

type MovementRow = {
  officeId: string
  name: string
  designation: string
  department: string
  purpose: string
  location: string
  start: string
  end: string
  totalDay: number
  status: "Running" | "Completed" | "Planned"
}

const movements: MovementRow[] = [
  {
    officeId: "AR-0023",
    name: "Engr. Moinul Hasan",
    designation: "Project Engineer",
    department: "Projects & Engineering",
    purpose: "Site visit & client coordination",
    location: "Banani ➝ Uttara (Dhaka)",
    start: "10 Mar 2026",
    end: "10 Mar 2026",
    totalDay: 1,
    status: "Completed",
  },
  {
    officeId: "AR-0038",
    name: "Farzana Akter",
    designation: "Accounts Officer",
    department: "Accounts & Finance",
    purpose: "Bank visit for LC documentation",
    location: "Banani ➝ Motijheel",
    start: "11 Mar 2026",
    end: "11 Mar 2026",
    totalDay: 1,
    status: "Running",
  },
]

export default function EmployeeMovementPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Employee Movement"
        description="Field movement register for approvals, allowances, and safety tracking."
      />

      <SimpleTable
        columns={[
          { key: "officeId", header: "Office ID" },
          { key: "name", header: "Name" },
          { key: "designation", header: "Designation" },
          { key: "department", header: "Department" },
          { key: "purpose", header: "Purpose" },
          { key: "location", header: "Location" },
          { key: "start", header: "Start" },
          { key: "end", header: "End" },
          { key: "totalDay", header: "Total Day" },
          {
            key: "status",
            header: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
        ]}
        data={movements}
        rowKey={(row) => row.officeId + row.start}
      />
    </div>
  )
}

