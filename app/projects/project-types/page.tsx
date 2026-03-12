import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ProjectTypeRow = {
  type: string
  description: string
  typicalSize: string
  exampleCode: string
}

const projectTypes: ProjectTypeRow[] = [
  {
    type: "Building Construction",
    description: "Multi-storey commercial and residential buildings with full civil and finishing scope.",
    typicalSize: "10–20 floors, 8–20 katha",
    exampleCode: "DU-0001",
  },
  {
    type: "Land Development",
    description: "Land filling, boundary wall, road, and drainage work for plots and industrial land.",
    typicalSize: "5–25 katha",
    exampleCode: "GZP-0004",
  },
  {
    type: "Industrial Foundation",
    description: "Factory and warehouse foundation, machine bases, and heavy-duty flooring.",
    typicalSize: "Large spanning foundations",
    exampleCode: "CTG-0007",
  },
  {
    type: "Residential Tower",
    description: "High-rise residential towers including basements and amenities.",
    typicalSize: "12–20 floors",
    exampleCode: "SYL-0003",
  },
]

export default function ProjectTypesPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="PROJECT TYPES"
        description="Standard construction project types used for scoping, costing, and reporting."
      />

      <section className="w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Project Type Definitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleTable
              columns={[
                { key: "type", header: "Project Type", className: "min-w-[180px]" },
                {
                  key: "description",
                  header: "Description",
                  className: "min-w-[260px]",
                },
                {
                  key: "typicalSize",
                  header: "Typical Size",
                  className: "min-w-[160px]",
                },
                {
                  key: "exampleCode",
                  header: "Example Project Code",
                  className: "min-w-[150px]",
                },
              ]}
              data={projectTypes}
              rowKey={(row) => row.type}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

