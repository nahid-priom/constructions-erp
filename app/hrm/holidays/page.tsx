import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"

type Holiday = {
  id: string
  title: string
  start: string
  end: string
  description: string
  remarks: string
}

const holidays: Holiday[] = [
  {
    id: "1",
    title: "Eid-ul-Fitr",
    start: "10 Apr 2026",
    end: "14 Apr 2026",
    description: "Eid holidays for all head office and site employees.",
    remarks: "Site security and emergency team on duty.",
  },
  {
    id: "2",
    title: "Independence Day",
    start: "26 Mar 2026",
    end: "26 Mar 2026",
    description: "National holiday. Minimum site activity.",
    remarks: "Only critical concrete works allowed with prior approval.",
  },
]

export default function HolidaysPage() {
  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="Holidays"
        description="Company holiday calendar used for attendance and payroll processing."
      />

      <SimpleTable
        columns={[
          { key: "title", header: "Title" },
          { key: "start", header: "Start Date" },
          { key: "end", header: "End Date" },
          { key: "description", header: "Description" },
          { key: "remarks", header: "Remarks" },
        ]}
        data={holidays}
        rowKey={(row) => row.id}
      />
    </div>
  )
}

