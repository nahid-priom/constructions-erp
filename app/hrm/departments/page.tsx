import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleTable } from "@/components/shared/simple-table"

type Department = {
  id: string
  name: string
  head: string
  employees: number
  location: string
}

const departments: Department[] = [
  {
    id: "1",
    name: "Projects & Engineering",
    head: "Engr. Moinul Hasan",
    employees: 18,
    location: "Banani Head Office",
  },
  {
    id: "2",
    name: "Accounts & Finance",
    head: "Md. Saiful Islam",
    employees: 7,
    location: "Banani Head Office",
  },
  {
    id: "3",
    name: "HR & Administration",
    head: "Farzana Akter",
    employees: 5,
    location: "Banani Head Office",
  },
  {
    id: "4",
    name: "Site Operations – Dhaka",
    head: "Engr. Kamrul Ahsan",
    employees: 42,
    location: "Dhaka Region Sites",
  },
]

export default function DepartmentsPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Departments"
        description="Organisational departments overseeing projects, finance, HR, and regional site operations."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {departments.map((dept) => (
          <Card key={dept.id}>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                {dept.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div>
                <div className="text-slate-500">Department Head</div>
                <div className="font-semibold text-slate-900">
                  {dept.head}
                </div>
              </div>
              <div>
                <div className="text-slate-500">Team Strength</div>
                <div className="font-semibold text-slate-900">
                  {dept.employees} employees
                </div>
              </div>
              <div>
                <div className="text-slate-500">Location</div>
                <div className="font-semibold text-slate-900">
                  {dept.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="w-full">
        <SimpleTable
          columns={[
            { key: "name", header: "Department" },
            { key: "head", header: "Head of Department" },
            { key: "employees", header: "Employees" },
            { key: "location", header: "Base Location" },
          ]}
          data={departments}
          rowKey={(row) => row.id}
        />
      </section>
    </div>
  )
}

