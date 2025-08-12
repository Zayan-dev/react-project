import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

export default function BaseTable({
  tableHeading,
  tableData,
}: {
  tableHeading?: any;
  tableData: any;
}) {
  if (!tableData) {
    return <div>Loading...</div>;
  }

  const columns =
    tableData?.columns?.map((column: string) => ({
      key: column,
      label: column.toUpperCase(),
    })) ?? [];
  const rows = tableData?.rows.map((item: any, rowIndex: number) => {
    const row: any = {};
    item.forEach((value: string, index: number) => {
      row[columns[index].key] = value;
    });
    row["key"] = rowIndex;
    return row;
  });

  return (
    <section>
      <h2 className="text-2xl text-white font-semibold mb-4">
        {tableHeading || "Alignment"}
      </h2>
      <Table
        aria-label="Base Table"
        classNames={{
          wrapper: "p-6 bg-slate-700 rounded-md",
          th: "bg-slate-600 text-base-orange",
          td: "text-base-gray",
        }}
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item: any) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
}
