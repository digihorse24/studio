import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T | 'actions';
  cell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export function DataTable<T extends { id: string | number }>({ columns, data }: DataTableProps<T>) {
  // Defensive check to prevent build errors if data is not an array.
  const safeData = Array.isArray(data) ? data : [];

  return (
    <div className="border-b">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeData.length > 0 ? (
            safeData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className="py-3">
                    {column.cell ? column.cell(row) : String(row[column.accessorKey as keyof T])}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Keine Daten gefunden.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
