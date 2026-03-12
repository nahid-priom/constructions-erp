import { Badge } from "@/components/ui/badge"

interface DocumentChipProps {
  label: string
  status: "Available" | "Restricted" | "Missing"
}

export function DocumentChip({ label, status }: DocumentChipProps) {
  let variant: "default" | "outline" | "danger" = "default"
  if (status === "Restricted") variant = "outline"
  if (status === "Missing") variant = "danger"

  return (
    <Badge variant={variant}>
      {label} – {status}
    </Badge>
  )
}

