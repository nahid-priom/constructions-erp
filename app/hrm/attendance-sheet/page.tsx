import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"
import { DocumentChip } from "@/components/shared/document-chip"

type AttendanceSheetRow = {
  projectNo: string
  location: string
  date: string
  officeId: string
  employeeName: string
  inTime: string
  outTime: string
  signature: string
  file: string
  remark: string
}

const attendanceSheet: AttendanceSheetRow[] = [
  {
    projectNo: "DU-0001",
    location: "Banani, Dhaka",
    date: "10 Mar 2026",
    officeId: "AR-0047",
    employeeName: "Kamrul Ahsan",
    inTime: "08:00 AM",
    outTime: "05:10 PM",
    signature: "Available",
    file: "Attendance Sheet – DU-0001 – 10 Mar",
    remark: "Concrete casting at gridline D-6.",
  },
  {
    projectNo: "CTG-0007",
    location: "CEPZ, Chattogram",
    date: "10 Mar 2026",
    officeId: "AR-0053",
    employeeName: "Jahangir Alam",
    inTime: "08:10 AM",
    outTime: "05:00 PM",
    signature: "Available",
    file: "Attendance Sheet – CTG-0007 – 10 Mar",
    remark: "Piling rig mobilised at south block.",
  },
]

export default function AttendanceSheetPage() {
  return (
    <div className="w-full max-w-full space-y-6 overflow-x-hidden lg:space-y-8">
      <PageHeader
        title="Attendance Sheet"
        description="Project-wise daily attendance sheet used for payroll and site records."
      />

      <SimpleTable
        columns={[
          { key: "projectNo", header: "Project No" },
          { key: "location", header: "Location" },
          { key: "date", header: "Date" },
          { key: "officeId", header: "Office ID" },
          { key: "employeeName", header: "Employee Name" },
          { key: "inTime", header: "In" },
          { key: "outTime", header: "Out" },
          { key: "signature", header: "Signature" },
          {
            key: "file",
            header: "File",
            render: (row) => (
              <DocumentChip label="Attendance Sheet" status="Available" />
            ),
          },
          { key: "remark", header: "Remark" },
        ]}
        data={attendanceSheet}
        rowKey={(row) => row.projectNo + row.officeId + row.date}
      />
    </div>
  )
}

