import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableWrapper } from "@/components/ui/data-table-wrapper";
import { cn } from "@/lib/utils";

interface DataTableCardProps {
  title: string;
  subtitle?: string;
  headers: string[];
  children: ReactNode;
}

export function DataTableCard({
  title,
  subtitle,
  headers,
  children,
}: DataTableCardProps) {
  return (
    <DataTableWrapper
      title={title}
      description={subtitle}
    >
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header}
                className={cn("whitespace-nowrap")}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{children}</TableBody>
      </Table>
    </DataTableWrapper>
  );
}

