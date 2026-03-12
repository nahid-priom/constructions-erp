import { SimpleTable } from "@/components/shared/simple-table"

type AttendanceSummaryRow = {
  month: string
  projectCode: string
  location: string
  totalDays: number
  present: number
  absent: number
}

interface AttendanceSummaryTableProps {
  rows: AttendanceSummaryRow[]
}

export function AttendanceSummaryTable({ rows }: AttendanceSummaryTableProps) {
  return (
    <SimpleTable
      columns={[
        { key: "month", header: "Month", className: "min-w-[110px]" },
        {
          key: "projectCode",
          header: "Project Code",
          className: "min-w-[110px]",
        },
        {
          key: "location",
          header: "Location",
          className: "min-w-[200px]",
        },
        {
          key: "totalDays",
          header: "Total Days",
          className: "min-w-[100px] text-right",
        },
        {
          key: "present",
          header: "Present",
          className: "min-w-[90px] text-right",
        },
        {
          key: "absent",
          header: "Absent",
          className: "min-w-[90px] text-right",
        },
      ]}
      data={rows}
      rowKey={(row) => row.month + row.projectCode}
    />
  )
}

