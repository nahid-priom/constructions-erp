import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProjectCodeRow = {
  code: string
  name: string
  location: string
  type: string
  status: "Completed" | "Running" | "Under Plan"
}

const projectCodes: ProjectCodeRow[] = [
  {
    code: "DU-0001",
    name: "12 Floors Commercial Building",
    location: "Banani, Dhaka",
    type: "Building Construction",
    status: "Running",
  },
  {
    code: "CTG-0007",
    name: "Factory Foundation Work",
    location: "CEPZ, Chattogram",
    type: "Industrial Foundation",
    status: "Running",
  },
  {
    code: "SYL-0003",
    name: "Residential Tower Phase 1",
    location: "Zindabazar, Sylhet",
    type: "Residential Tower",
    status: "Under Plan",
  },
  {
    code: "GZP-0004",
    name: "10 Katha Plot Development",
    location: "Gazipur",
    type: "Land Development",
    status: "Completed",
  },
]

export default function ProjectCodesPage() {
  const running = projectCodes.filter((p) => p.status === "Running").length
  const completed = projectCodes.filter((p) => p.status === "Completed").length
  const planned = projectCodes.filter((p) => p.status === "Under Plan").length

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="PROJECT CODES"
        description="Master register of project codes with locations and current status."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Projects"
          value={projectCodes.length.toString()}
          helper="Registered in current financial year"
        />
        <StatCard
          label="Running Projects"
          value={running.toString()}
          helper="Sites under execution"
        />
        <StatCard
          label="Completed"
          value={completed.toString()}
          helper="Handover completed"
        />
        <StatCard
          label="Under Plan"
          value={planned.toString()}
          helper="Negotiation / planning stage"
        />
      </section>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Project Code Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                {
                  key: "code",
                  header: "Project Code",
                  className: "min-w-[110px]",
                },
                {
                  key: "name",
                  header: "Project Name",
                  className: "min-w-[220px]",
                },
                {
                  key: "location",
                  header: "Site Location",
                  className: "min-w-[200px]",
                },
                {
                  key: "type",
                  header: "Project Type",
                  className: "min-w-[180px]",
                },
                {
                  key: "status",
                  header: "Status",
                  className: "min-w-[120px]",
                },
              ]}
              data={projectCodes}
              rowKey={(row) => row.code}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

