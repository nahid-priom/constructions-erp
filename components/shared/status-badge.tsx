import { Badge } from "@/components/ui/badge"

type Status =
  | "Running"
  | "Pending"
  | "Closed"
  | "Completed"
  | "Due"
  | "Paid"
  | "Approved"
  | "Ongoing"
  | "Planned"

interface StatusBadgeProps {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "Running":
    case "Ongoing":
      return <Badge variant="success">Running</Badge>
    case "Completed":
      return <Badge variant="success">Completed</Badge>
    case "Closed":
      return <Badge variant="outline">Closed</Badge>
    case "Pending":
      return <Badge variant="warning">Pending</Badge>
    case "Due":
      return <Badge variant="danger">Due</Badge>
    case "Paid":
      return <Badge variant="success">Paid</Badge>
    case "Approved":
      return <Badge variant="success">Approved</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

