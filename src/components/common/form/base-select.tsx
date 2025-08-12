import { useController } from "react-hook-form";
import { Select, SelectItem } from "@heroui/react";
import type { BaseSelectProps } from "../../utils/types";

export function BaseSelect({
  name,
  control,
  options,
  className,
  rules,
  selectionMode,
  classNames,
  defaultSelectedKeys,
  ...props
}: BaseSelectProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defaultSelectedKeys,
  });

  return (
    <Select
      selectedKeys={
        typeof field.value == "string" ? [field.value] : field.value
      }
      selectionMode={selectionMode}
      defaultSelectedKeys={defaultSelectedKeys}
      isInvalid={!!error}
      errorMessage={error?.message}
      {...props}
      onSelectionChange={(value: any) => {
        if (selectionMode === "multiple") {
          field.onChange([...value.values()]);
          return;
        }
        return field.onChange(value?.currentKey);
      }}
      classNames={{
        ...classNames,
        trigger: `!rounded-base ${classNames?.trigger}`,
      }}
    >
      {options.map((option) => (
        <SelectItem key={option.value}>{option.label}</SelectItem>
      ))}
    </Select>
  );
}
