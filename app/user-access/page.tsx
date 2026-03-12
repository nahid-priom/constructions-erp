 "use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleTable } from "@/components/shared/simple-table"
import { FilterBar } from "@/components/shared/filter-bar"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { StatusBadge } from "@/components/shared/status-badge"
import { Badge } from "@/components/ui/badge"

type UserAccessRow = {
  id: number
  date: string
  officeId: string
  name: string
  designation: string
  department: string
  cell: string
  closeDate?: string
  status: "Running" | "Closed" | "Pending"
}

const users: UserAccessRow[] = [
  {
    id: 1,
    date: "01 Jan 2024",
    officeId: "AR-0001",
    name: "Md. Arifur Rahman",
    designation: "Proprietor",
    department: "Management",
    cell: "+880 1711 000 000",
    status: "Running",
  },
  {
    id: 2,
    date: "15 Feb 2024",
    officeId: "AR-0023",
    name: "Engr. Moinul Hasan",
    designation: "Project Engineer",
    department: "Projects",
    cell: "+880 1711 002 323",
    status: "Running",
  },
  {
    id: 3,
    date: "05 Mar 2024",
    officeId: "AR-0038",
    name: "Farzana Akter",
    designation: "Accounts Officer",
    department: "Accounts & Finance",
    cell: "+880 1711 003 838",
    status: "Running",
  },
  {
    id: 4,
    date: "01 Jun 2024",
    officeId: "AR-0047",
    name: "Kamrul Ahsan",
    designation: "Site Supervisor",
    department: "Projects",
    cell: "+880 1711 004 747",
    status: "Pending",
  },
]

export default function UserAccessPage() {
  const [selected, setSelected] = useState<UserAccessRow | null>(users[0])

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="User Access Control"
        description="Manage ERP user profiles, office IDs, and access status across departments."
      />

      <FilterBar>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="w-full max-w-xs">
            <Input placeholder="Search by name, office ID, or mobile" />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Status</span>
            <Select defaultValue="all">
              <option value="all">All</option>
              <option value="Running">Running</option>
              <option value="Pending">Pending</option>
              <option value="Closed">Closed</option>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Department</span>
            <Select defaultValue="all">
              <option value="all">All departments</option>
              <option value="Management">Management</option>
              <option value="Projects">Projects</option>
              <option value="Accounts & Finance">Accounts & Finance</option>
            </Select>
          </div>
        </div>
      </FilterBar>

      <section className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8 lg:min-w-0">
          <SimpleTable
            columns={[
              {
                key: "id",
                header: "Sl",
                render: (row) => row.id,
                className: "min-w-[40px]",
              },
              {
                key: "date",
                header: "Date",
                className: "min-w-[110px]",
              },
              {
                key: "officeId",
                header: "Office ID",
                className: "min-w-[90px]",
              },
              {
                key: "name",
                header: "Name",
                className: "min-w-[160px]",
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
                key: "cell",
                header: "Cell No",
                className: "min-w-[130px]",
              },
              {
                key: "closeDate",
                header: "Close Date",
                className: "min-w-[110px]",
              },
              {
                key: "status",
                header: "Status",
                render: (row) =>
                  row.status === "Closed" ? (
                    <StatusBadge status="Closed" />
                  ) : row.status === "Pending" ? (
                    <StatusBadge status="Pending" />
                  ) : (
                    <StatusBadge status="Running" />
                  ),
                className: "min-w-[110px]",
              },
            ]}
            data={users}
            rowKey={(row) => row.officeId}
            mobileRender={(row) => (
              <button
                type="button"
                onClick={() => setSelected(row)}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {row.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {row.officeId} • {row.designation}
                    </div>
                  </div>
                  <div>
                    <StatusBadge
                      status={
                        row.status === "Closed"
                          ? "Closed"
                          : row.status === "Pending"
                            ? "Pending"
                            : "Running"
                      }
                    />
                  </div>
                </div>
              </button>
            )}
          />
        </div>

        <div className="lg:col-span-4 lg:min-w-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                User Profile Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {selected ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {selected.name}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {selected.designation} • {selected.department}
                      </div>
                    </div>
                    <StatusBadge
                      status={
                        selected.status === "Closed"
                          ? "Closed"
                          : selected.status === "Pending"
                            ? "Pending"
                            : "Running"
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-slate-500">Office ID</div>
                      <div className="font-semibold text-slate-900">
                        {selected.officeId}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Access From</div>
                      <div className="font-semibold text-slate-900">
                        {selected.date}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Mobile</div>
                      <div className="font-semibold text-slate-900">
                        {selected.cell}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Close Date</div>
                      <div className="font-semibold text-slate-900">
                        {selected.closeDate ?? "-"}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge variant="outline">Dashboard</Badge>
                    <Badge variant="outline">Projects</Badge>
                    <Badge variant="outline">HRM</Badge>
                    <Badge variant="outline">Accounts</Badge>
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-500">
                  Select a user from the list to view detailed access
                  information and assigned modules.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

