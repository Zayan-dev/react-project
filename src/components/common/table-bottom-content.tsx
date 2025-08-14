import { Pagination, Select, SelectItem } from "@heroui/react";
import type { PaginationMeta } from "../utils/types";

const TableBottomContent = ({
  page,
  setMeta,
  limit,
  totalItemCount,
  totalPages = Math.ceil((totalItemCount ?? 0) / limit),
}: {
  page: any;
  setMeta: any;
  limit?: any;
  setLimit?: any;
  totalItemCount?: number;
  totalPages?: number;
}) => {
  return (
    <div className="flex w-full justify-between items-center p-5">
      <div className="flex gap-2">
        <Select
          labelPlacement="outside-left"
          className="w-20"
          defaultSelectedKeys={[`${limit}`]}
          onChange={(e) => {
            setMeta((prev: PaginationMeta) => ({
              ...prev,
              itemsPerPage: Number(e.target.value),
            }));
            // setLimit(parseInt(e.target.value));
          }}
        >
          <SelectItem isReadOnly={limit == 10} key={"10"}>
            10
          </SelectItem>
          <SelectItem isReadOnly={limit == 20} key={"20"}>
            20
          </SelectItem>
          <SelectItem isReadOnly={limit == 30} key={"30"}>
            30
          </SelectItem>
        </Select>
        <Pagination
          isCompact
          showControls
          showShadow
          className="text-white"
          classNames={{
            cursor: "bg-base-orange",
          }}
          page={page}
          total={totalPages}
          onChange={(page) =>
            setMeta((prev: PaginationMeta) => ({ ...prev, currentPage: page }))
          }
        />
      </div>
    </div>
  );
};

export default TableBottomContent;
