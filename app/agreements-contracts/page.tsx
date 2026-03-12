import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FilterBar } from "@/components/shared/filter-bar"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type AgreementRow = {
  id: string
  type: "Agreement" | "Contract" | "W/O" | "P/O" | "Price Proposal"
  projectCode: string
  projectName: string
  location: string
  projectType: string
  partyName: string
  startDate: string
  deadline: string
  value: number
  status: "Running" | "Under Plan" | "Completed"
  restricted?: boolean
}

const agreements: AgreementRow[] = [
  {
    id: "AGR-2026-001",
    type: "Contract",
    projectCode: "DU-0001",
    projectName: "12 Floors Commercial Building",
    location: "Banani, Dhaka",
    projectType: "Commercial High-rise",
    partyName: "North View Properties Ltd.",
    startDate: "01 Jan 2026",
    deadline: "30 Jun 2027",
    value: 185_000_000,
    status: "Running",
    restricted: true,
  },
  {
    id: "WO-2026-014",
    type: "W/O",
    projectCode: "CTG-0007",
    projectName: "Factory Foundation Work",
    location: "CEPZ, Chattogram",
    projectType: "Industrial Foundation",
    partyName: "Rahman Foundation Works",
    startDate: "15 Dec 2025",
    deadline: "30 Apr 2026",
    value: 46_000_000,
    status: "Running",
  },
  {
    id: "PO-2026-033",
    type: "P/O",
    projectCode: "SYL-0003",
    projectName: "Residential Tower Phase 1",
    location: "Zindabazar, Sylhet",
    projectType: "Residential Tower",
    partyName: "North Bengal Cement",
    startDate: "20 Feb 2026",
    deadline: "20 Mar 2026",
    value: 8_600_000,
    status: "Under Plan",
  },
  {
    id: "PP-2026-009",
    type: "Price Proposal",
    projectCode: "GZP-0004",
    projectName: "10 Katha Plot Development",
    location: "Gazipur",
    projectType: "Land Development",
    partyName: "Gazipur Land Development",
    startDate: "05 Jan 2026",
    deadline: "15 Jan 2026",
    value: 12_400_000,
    status: "Completed",
  },
]

export default function AgreementsContractsPage() {
  const totalValue = agreements.reduce((sum, row) => sum + row.value, 0)
  const running = agreements.filter((row) => row.status === "Running").length
  const underPlan = agreements.filter((row) => row.status === "Under Plan").length

  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="AGREEMENTS & CONTRACTS"
        description="Register of project-wise agreements, contracts, work orders, and purchase orders."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Contract Value"
          value={totalValue.toLocaleString("en-BD", {
            style: "currency",
            currency: "BDT",
            maximumFractionDigits: 0,
          })}
          helper="Across all active agreements"
        />
        <StatCard
          label="Running Agreements"
          value={`${running} jobs`}
          helper="Currently under execution"
        />
        <StatCard
          label="Under Plan"
          value={`${underPlan} opportunities`}
          helper="Price proposals / PO under review"
        />
        <StatCard
          label="Restricted Files"
          value={`${agreements.filter((a) => a.restricted).length} records`}
          helper="Marked for limited access"
        />
      </section>

      <FilterBar>
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="w-full max-w-xs">
            <Input placeholder="Search by project, party, or agreement no." />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Type</span>
            <Select defaultValue="all">
              <option value="all">All</option>
              <option value="Agreement">Agreement</option>
              <option value="Contract">Contract</option>
              <option value="W/O">W/O</option>
              <option value="P/O">P/O</option>
              <option value="Price Proposal">Price Proposal</option>
            </Select>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>Status</span>
            <Select defaultValue="all">
              <option value="all">All</option>
              <option value="Running">Running</option>
              <option value="Under Plan">Under Plan</option>
              <option value="Completed">Completed</option>
            </Select>
          </div>
        </div>
      </FilterBar>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Agreements & Contracts Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                {
                  key: "id",
                  header: "Ref No",
                  render: (row: AgreementRow) => (
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900">
                        {row.id}
                      </span>
                      <span className="text-[11px] text-slate-600">
                        {row.type}
                      </span>
                    </div>
                  ),
                  className: "min-w-[140px]",
                },
                {
                  key: "projectCode",
                  header: "Project",
                  render: (row: AgreementRow) => (
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-slate-900">
                        {row.projectCode}
                      </span>
                      <span className="text-[11px] text-slate-600">
                        {row.projectName}
                      </span>
                    </div>
                  ),
                  className: "min-w-[220px]",
                },
                {
                  key: "location",
                  header: "Location",
                  className: "min-w-[150px]",
                },
                {
                  key: "partyName",
                  header: "Party",
                  className: "min-w-[190px]",
                },
                {
                  key: "deadline",
                  header: "Deadline",
                  render: (row: AgreementRow) => (
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-900">
                        {row.deadline}
                      </span>
                      <span className="text-[11px] text-slate-600">
                        Start: {row.startDate}
                      </span>
                    </div>
                  ),
                  className: "min-w-[150px]",
                },
                {
                  key: "value",
                  header: "Value (BDT)",
                  render: (row: AgreementRow) =>
                    row.value.toLocaleString("en-BD", {
                      maximumFractionDigits: 0,
                    }),
                  className: "min-w-[150px] text-right",
                },
                {
                  key: "status",
                  header: "Status",
                  render: (row: AgreementRow) => (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge
                        variant={
                          row.status === "Completed"
                            ? "success"
                            : row.status === "Under Plan"
                              ? "warning"
                              : "default"
                        }
                      >
                        {row.status}
                      </Badge>
                      {row.restricted && (
                        <Badge variant="outline">Restricted File</Badge>
                      )}
                    </div>
                  ),
                  className: "min-w-[160px]",
                },
              ]}
              data={agreements}
              rowKey={(row) => row.id}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

