import { PageHeader } from "@/components/shared/page-header"
import { StatCard } from "@/components/shared/stat-card"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProjectRow = {
  code: string
  name: string
  client: string
  location: string
  type: string
  status: "Completed" | "Running" | "Under Plan"
}

const projects: ProjectRow[] = [
  {
    code: "DU-0001",
    name: "12 Floors Commercial Building",
    client: "North View Properties Ltd.",
    location: "Banani, Dhaka",
    type: "Building Construction",
    status: "Running",
  },
  {
    code: "CTG-0007",
    name: "Factory Foundation Work",
    client: "Bay Industrial Holdings",
    location: "CEPZ, Chattogram",
    type: "Industrial Foundation",
    status: "Running",
  },
  {
    code: "SYL-0003",
    name: "Residential Tower Phase 1",
    client: "Sylhet Heights Developments",
    location: "Zindabazar, Sylhet",
    type: "Residential Tower",
    status: "Under Plan",
  },
  {
    code: "GZP-0004",
    name: "10 Katha Plot Development",
    client: "Gazipur Land Development",
    location: "Gazipur",
    type: "Land Development",
    status: "Completed",
  },
]

export default function AllProjectsPage() {
  const running = projects.filter((p) => p.status === "Running").length
  const completed = projects.filter((p) => p.status === "Completed").length
  const planned = projects.filter((p) => p.status === "Under Plan").length

  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="ALL PROJECTS"
        description="Consolidated view of all construction projects with codes, clients, and locations."
      />

      <section className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Projects"
          value={projects.length.toString()}
          helper="Tracked in this ERP"
        />
        <StatCard
          label="Running"
          value={running.toString()}
          helper="Active construction sites"
        />
        <StatCard
          label="Completed"
          value={completed.toString()}
          helper="Handover completed"
        />
        <StatCard
          label="Under Plan"
          value={planned.toString()}
          helper="Pre‑construction phase"
        />
      </section>

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Project Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "code", header: "Project Code", className: "min-w-[110px]" },
                {
                  key: "name",
                  header: "Project Name",
                  className: "min-w-[220px]",
                },
                {
                  key: "client",
                  header: "Client",
                  className: "min-w-[200px]",
                },
                {
                  key: "location",
                  header: "Location",
                  className: "min-w-[200px]",
                },
                {
                  key: "type",
                  header: "Type",
                  className: "min-w-[160px]",
                },
                {
                  key: "status",
                  header: "Status",
                  className: "min-w-[120px]",
                },
              ]}
              data={projects}
              rowKey={(row) => row.code}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

