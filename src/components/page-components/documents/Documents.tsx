import { useCallback, useState } from "react";
import { useGetAllDocuments } from "../../../services/document";
import type { BaseTableColumn, Meta } from "../../utils/types";
import BaseDynamicTable from "../../common/base-dynamic-table";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react";
import { Eye, Search } from "lucide-react";
import { BaseInput } from "../../common/form/base-input";
import { useForm } from "react-hook-form";
import useDebounce from "../../../hooks/useDebounce";

const column: Array<BaseTableColumn> = [
  {
    key: "_id",
    label: "Id",
  },
  {
    key: "sender",
    label: "Sender Detail",
  },
  {
    key: "createdAt",
    label: "createdAt",
  },
  {
    key: "action",
    label: "Actions",
  },
];

const Documents = () => {
  const { control, watch } = useForm();
  const watchSearchQuery = useDebounce(watch("searchQuery"));

  const navigate = useNavigate();
  const [meta, setMeta] = useState<Meta>({
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: 10,
    totalPages: 1,
    currentPage: 1,
  });
  const { data, isLoading } = useGetAllDocuments(
    meta?.currentPage,
    meta?.itemsPerPage,
    watchSearchQuery
  );
  const renderCell = useCallback((row: any, columnKey: any) => {
    const cellValue = row[columnKey];

    switch (columnKey) {
      case "_id":
        return <p># {row._id}</p>;
      case "createdAt":
        return (
          <span>
            {new Date(row.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        );

      case "sender":
        return (
          <div className="flex flex-col gap-2 ">
            <p>{row.sender.name}</p>
            <p>{row.sender.email}</p>
          </div>
        );

      case "action":
        return (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="bg-base-orange border-none text-white"
              onPress={() => {
                navigate(`/document/${row._id}`);
              }}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  // if (isLoading) return <>Loading...</>;

  const response = data?.data.data;
  return (
    <div>
      {
        <div className="flex flex-col gap-5">
          <BaseInput
            type="text"
            classNames={{
              inputWrapper: "border border-base-orange",
            }}
            label="Search Users"
            placeholder="John Doe"
            name="searchQuery"
            startContent={<Search className="w-4 h-4 text-gray-400" />}
            control={control}
          />
          <BaseDynamicTable
            columns={column}
            data={response || []}
            renderCell={renderCell}
            meta={meta}
            setMeta={setMeta}
            loading={isLoading}
          />
        </div>
      }
    </div>
  );
};

export default Documents;
