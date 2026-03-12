import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleTable } from "@/components/shared/simple-table"
import { StatusBadge } from "@/components/shared/status-badge"

type Employee = {
  officeId: string
  name: string
  designation: string
  department: string
  contact: string
  joiningDate: string
  status: "Running" | "Pending"
}

const employees: Employee[] = [
  {
    officeId: "AR-0001",
    name: "Md. Arifur Rahman",
    designation: "Proprietor",
    department: "Management",
    contact: "+880 1711 000 000",
    joiningDate: "01 Jan 2018",
    status: "Running",
  },
  {
    officeId: "AR-0023",
    name: "Engr. Moinul Hasan",
    designation: "Project Engineer",
    department: "Projects & Engineering",
    contact: "+880 1711 002 323",
    joiningDate: "15 Feb 2021",
    status: "Running",
  },
  {
    officeId: "AR-0038",
    name: "Farzana Akter",
    designation: "Accounts Officer",
    department: "Accounts & Finance",
    contact: "+880 1711 003 838",
    joiningDate: "05 Mar 2020",
    status: "Running",
  },
  {
    officeId: "AR-0047",
    name: "Kamrul Ahsan",
    designation: "Site Supervisor",
    department: "Projects & Engineering",
    contact: "+880 1711 004 747",
    joiningDate: "01 Jun 2024",
    status: "Pending",
  },
]

export default function EmployeesPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Employees"
        description="Master list of employees with office IDs, contact details, and HR status."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {employees.map((emp) => (
          <Card key={emp.officeId}>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                {emp.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Office ID</span>
                <span className="font-semibold text-slate-900">
                  {emp.officeId}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Designation</span>
                <span className="font-semibold text-slate-900">
                  {emp.designation}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Department</span>
                <span className="font-semibold text-slate-900">
                  {emp.department}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Joining Date</span>
                <span className="font-semibold text-slate-900">
                  {emp.joiningDate}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="w-full">
        <SimpleTable
          columns={[
            { key: "officeId", header: "Office ID" },
            { key: "name", header: "Name" },
            { key: "designation", header: "Designation" },
            { key: "department", header: "Department" },
            { key: "contact", header: "Contact" },
            { key: "joiningDate", header: "Joining Date" },
            {
              key: "status",
              header: "Status",
              render: (row) =>
                row.status === "Pending" ? (
                  <StatusBadge status="Pending" />
                ) : (
                  <StatusBadge status="Running" />
                ),
            },
          ]}
          data={employees}
          rowKey={(row) => row.officeId}
        />
      </section>
    </div>
  )
}

