import { Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RestrictedFileBadgeProps {
  label?: string;
}

export function RestrictedFileBadge({
  label = "RESTRICTED FILE",
}: RestrictedFileBadgeProps) {
  return (
    <Badge
      variant="danger"
      className="inline-flex items-center gap-1 border-red-200 bg-red-50 text-[10px] font-semibold uppercase tracking-[0.16em]"
    >
      <Lock className="h-3 w-3" />
      {label}
    </Badge>
  );
}

