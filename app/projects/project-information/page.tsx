import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const projects = [
  {
    code: "DU-0001",
    name: "12 Floors Commercial Building",
    client: "North View Properties Ltd.",
    location: "Banani, Dhaka",
    type: "Building Construction",
    startDate: "01 Jan 2026",
    endDate: "30 Jun 2027",
    status: "Running",
  },
  {
    code: "CTG-0007",
    name: "Factory Foundation Work",
    client: "Bay Industrial Holdings",
    location: "CEPZ, Chattogram",
    type: "Industrial Foundation",
    startDate: "15 Dec 2025",
    endDate: "31 Oct 2026",
    status: "Running",
  },
  {
    code: "SYL-0003",
    name: "Residential Tower Phase 1",
    client: "Sylhet Heights Developments",
    location: "Zindabazar, Sylhet",
    type: "Residential Tower",
    startDate: "01 Apr 2026",
    endDate: "31 Dec 2027",
    status: "Under Plan",
  },
]

export default function ProjectInformationPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="PROJECT INFORMATION"
        description="Key details of running and planned construction projects."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.code}>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                {project.code} – {project.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Client</span>
                <span className="font-semibold text-slate-900">
                  {project.client}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Location</span>
                <span className="font-semibold text-slate-900">
                  {project.location}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Type</span>
                <span className="font-semibold text-slate-900">
                  {project.type}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Duration</span>
                <span className="font-semibold text-slate-900">
                  {project.startDate} → {project.endDate}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-semibold text-slate-900">
                  {project.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  )
}

