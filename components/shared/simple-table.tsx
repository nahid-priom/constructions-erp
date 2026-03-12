import type { ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Column<T> {
  key: keyof T | string;
  header: string;
  className?: string;
  align?: "left" | "right" | "center";
  render?: (row: T) => ReactNode;
}

interface SimpleTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => React.Key;
  mobileRender?: (row: T) => ReactNode;
}

export function SimpleTable<T>({
  columns,
  data,
  rowKey,
  mobileRender,
}: SimpleTableProps<T>) {
  return (
    <>
      {mobileRender ? (
        <>
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {columns.map((col) => (
                      <TableHead
                        key={col.header}
                        className={`${col.className ?? ""} ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}
                      >
                        {col.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={rowKey(row)}>
                      {columns.map((col, index) => (
                        <TableCell
                          key={col.header}
                          className={`${col.className ?? ""} ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : index === 0 ? "font-medium" : "font-normal"}`}
                        >
                          {col.render
                            ? col.render(row)
                            : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              (row as any)[col.key as string]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            {data.map((row) => (
              <div
                key={rowKey(row)}
                className="rounded-2xl border border-border bg-card p-3 text-xs shadow-soft"
              >
                {mobileRender(row)}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead
                    key={col.header}
                    className={`${col.className ?? ""} ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}`}
                  >
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={rowKey(row)}>
                  {columns.map((col, index) => (
                    <TableCell
                      key={col.header}
                      className={`${col.className ?? ""} ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : index === 0 ? "font-medium" : "font-normal"}`}
                    >
                      {col.render
                        ? col.render(row)
                        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          (row as any)[col.key as string]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}

