import { PageHeader } from "@/components/shared/page-header"
import { SimpleTable } from "@/components/shared/simple-table"

type LeaveType = {
  id: string
  name: string
  paid: boolean
  annualDays: number
  remarks: string
}

const leaveTypes: LeaveType[] = [
  {
    id: "1",
    name: "Paid Leave",
    paid: true,
    annualDays: 14,
    remarks: "Encashment not allowed.",
  },
  {
    id: "2",
    name: "Sick Leave",
    paid: true,
    annualDays: 10,
    remarks: "Medical documents may be required.",
  },
  {
    id: "3",
    name: "Casual Leave",
    paid: true,
    annualDays: 7,
    remarks: "Planned at least 3 days ahead.",
  },
  {
    id: "4",
    name: "Leave Without Pay",
    paid: false,
    annualDays: 30,
    remarks: "Approval from management required.",
  },
]

export default function LeaveTypesPage() {
  return (
    <div className="w-full space-y-6 lg:space-y-8">
      <PageHeader
        title="Leave Types"
        description="Standard leave categories used in attendance, payroll, and HR approvals."
      />

      <SimpleTable
        columns={[
          { key: "name", header: "Leave Type" },
          {
            key: "paid",
            header: "Paid",
            render: (row) => (row.paid ? "Yes" : "No"),
          },
          { key: "annualDays", header: "Annual Days" },
          { key: "remarks", header: "Remarks" },
        ]}
        data={leaveTypes}
        rowKey={(row) => row.id}
      />
    </div>
  )
}

