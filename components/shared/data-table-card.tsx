import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableWrapper } from "@/components/ui/data-table-wrapper";

interface DataTableCardProps {
  title: string;
  description?: string;
  headers: string[];
  children: ReactNode;
  toolbar?: ReactNode;
}

export function DataTableCard({
  title,
  description,
  headers,
  children,
  toolbar,
}: DataTableCardProps) {
  return (
    <DataTableWrapper
      title={title}
      description={description}
      toolbar={toolbar}
    >
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header}
                className="whitespace-nowrap"
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

