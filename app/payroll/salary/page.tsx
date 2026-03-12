import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterBar } from "@/components/shared/filter-bar"
import { Select } from "@/components/ui/select"

type SalaryRow = {
  officeId: string
  name: string
  designation: string
  department: string
  basic: number
  houseRent: number
  medical: number
  conveyance: number
  bonus: number
  againstProjectNo: string
}

const salaries: SalaryRow[] = [
  {
    officeId: "AR-0001",
    name: "Md. Arifur Rahman",
    designation: "Proprietor",
    department: "Management",
    basic: 0,
    houseRent: 0,
    medical: 0,
    conveyance: 0,
    bonus: 0,
    againstProjectNo: "ALL",
  },
  {
    officeId: "AR-0023",
    name: "Engr. Moinul Hasan",
    designation: "Project Engineer",
    department: "Projects & Engineering",
    basic: 85_000,
    houseRent: 42_500,
    medical: 5_000,
    conveyance: 4_000,
    bonus: 8_000,
    againstProjectNo: "DU-0001",
  },
  {
    officeId: "AR-0038",
    name: "Farzana Akter",
    designation: "Accounts Officer",
    department: "Accounts & Finance",
    basic: 65_000,
    houseRent: 32_500,
    medical: 4_000,
    conveyance: 3_000,
    bonus: 6_500,
    againstProjectNo: "CTG-0007",
  },
  {
    officeId: "AR-0047",
    name: "Kamrul Ahsan",
    designation: "Site Supervisor",
    department: "Site Operations",
    basic: 45_000,
    houseRent: 22_500,
    medical: 3_000,
    conveyance: 3_000,
    bonus: 4_500,
    againstProjectNo: "SYL-0003",
  },
]

export default function PayrollSalaryPage() {
  const totalMonthly = salaries.reduce(
    (sum, row) =>
      sum +
      row.basic +
      row.houseRent +
      row.medical +
      row.conveyance +
      row.bonus,
    0,
  )

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="PAYROLL – SALARY STRUCTURE"
        description="Breakdown of salary components against project codes for key staff."
      />

      <section className="grid w-full min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Monthly Payroll"
          value={totalMonthly.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="For listed employees"
        />
        <StatCard
          label="Projects Covered"
          value="DU-0001 / CTG-0007 / SYL-0003"
          helper="Allocation based on work orders"
        />
        <StatCard
          label="Average Gross Salary"
          value={Math.round(totalMonthly / salaries.length).toLocaleString(
            "en-BD",
            {
              style: "currency",
              currency: "BDT",
              maximumFractionDigits: 0,
            },
          )}
          helper="Per employee"
        />
        <StatCard
          label="Site Operations Share"
          value="Approx. 40%"
          helper="Labour & supervisory cost"
        />
      </section>

      <FilterBar>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Department</span>
            <Select defaultValue="all">
              <option value="all">All</option>
              <option value="Management">Management</option>
              <option value="Projects & Engineering">Projects & Engineering</option>
              <option value="Accounts & Finance">Accounts & Finance</option>
              <option value="Site Operations">Site Operations</option>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Project</span>
            <Select defaultValue="all">
              <option value="all">All</option>
              <option value="DU-0001">DU-0001</option>
              <option value="CTG-0007">CTG-0007</option>
              <option value="SYL-0003">SYL-0003</option>
            </Select>
          </div>
        </div>
      </FilterBar>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Salary Component Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                {
                  key: "officeId",
                  header: "Office ID",
                  className: "min-w-[90px]",
                },
                {
                  key: "name",
                  header: "Name",
                  className: "min-w-[150px]",
                },
                {
                  key: "designation",
                  header: "Designation",
                  className: "min-w-[150px]",
                },
                {
                  key: "department",
                  header: "Department",
                  className: "min-w-[160px]",
                },
                {
                  key: "basic",
                  header: "Basic",
                  render: (row: SalaryRow) =>
                    row.basic.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[100px] text-right",
                },
                {
                  key: "houseRent",
                  header: "House Rent",
                  render: (row: SalaryRow) =>
                    row.houseRent.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[110px] text-right",
                },
                {
                  key: "medical",
                  header: "Medical",
                  render: (row: SalaryRow) =>
                    row.medical.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[100px] text-right",
                },
                {
                  key: "conveyance",
                  header: "Conveyance",
                  render: (row: SalaryRow) =>
                    row.conveyance.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[110px] text-right",
                },
                {
                  key: "bonus",
                  header: "Bonus",
                  render: (row: SalaryRow) =>
                    row.bonus.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[100px] text-right",
                },
                {
                  key: "againstProjectNo",
                  header: "Against Project No.",
                  className: "min-w-[130px]",
                },
              ]}
              data={salaries}
              rowKey={(row) => row.officeId}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

