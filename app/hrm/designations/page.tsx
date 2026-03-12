import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"

type DesignationRow = {
  id: string
  designation: string
  department: string
  grade: string
}

const designations: DesignationRow[] = [
  {
    id: "1",
    designation: "Proprietor & Managing Director",
    department: "Management",
    grade: "Executive",
  },
  {
    id: "2",
    designation: "Project Engineer",
    department: "Projects & Engineering",
    grade: "Officer",
  },
  {
    id: "3",
    designation: "Site Supervisor",
    department: "Projects & Engineering",
    grade: "Staff",
  },
  {
    id: "4",
    designation: "Head Mistry",
    department: "Site Operations",
    grade: "Site Grade A",
  },
  {
    id: "5",
    designation: "Accounts Officer",
    department: "Accounts & Finance",
    grade: "Officer",
  },
  {
    id: "6",
    designation: "HR Executive",
    department: "HR & Administration",
    grade: "Officer",
  },
]

export default function DesignationsPage() {
  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="Designations"
        description="Standardised roles and grades mapped to each department."
      />

      <SimpleTable
        columns={[
          { key: "designation", header: "Designation" },
          { key: "department", header: "Department" },
          { key: "grade", header: "Grade" },
        ]}
        data={designations}
        rowKey={(row) => row.id}
      />
    </div>
  )
}

