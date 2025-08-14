import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import type { BaseTableProps } from "../utils/types";
import TableBottomContent from "./table-bottom-content";
import TableSkeleton from "./table-skeleton";

const BaseDynamicTable = ({
  loading = false,
  columns,
  data,
  renderCell,
  meta,
  setMeta,
  selectMode = "none",
  onSelectionChange,
  bottomContentPlacement = "inside",
}: BaseTableProps) => {
  const handleSelectionChange = (keys: any) => {
    if (onSelectionChange) {
      onSelectionChange(keys);
    }
  };

  return (
    <>
      {!loading ? (
        <Table
          bottomContentPlacement={bottomContentPlacement}
          selectionMode={selectMode}
          onSelectionChange={handleSelectionChange}
          classNames={{
            wrapper: "shadow-none ",
            th: [
              "bg-transparent",
              "text-default-500",
              "border-b",
              "border-divider",
              "text-xs",
            ],
            td: ["text-xs"],
            table: "overflow-auto",
          }}
          aria-label="Example static collection table"
          bottomContent={
            meta && (
              <TableBottomContent
                page={meta.currentPage}
                setMeta={setMeta}
                limit={meta.itemsPerPage}
                totalItemCount={meta.totalItems}
                totalPages={meta.totalPages}
              />
            )
          }
          checkboxesProps={{
            classNames: {
              wrapper: "after:bg-foreground after:bg-layout-focus text-white",
            },
          }}
        >
          <TableHeader columns={columns}>
            {(column: any) => (
              <TableColumn key={column.key} allowsSorting>
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No Data Found"} items={data}>
            {(item: any) => (
              <TableRow key={item._id}>
                {(columnKey: any) => (
                  <TableCell>
                    {renderCell ? renderCell(item, columnKey) : item[columnKey]}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <TableSkeleton />
      )}
    </>
  );
};

export default BaseDynamicTable;
