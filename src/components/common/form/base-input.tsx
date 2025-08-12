import { useController } from "react-hook-form";
import { Input } from "@heroui/react";
import type { BaseInputProps } from "../../utils/types";

export function BaseInput({
  name,
  control,
  className,
  defaultValue,
  rules,
  label,
  accept,
  multiple,
  type,
  classNames,
  ...props
}: BaseInputProps) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <>
      {type != "file" && (
        <Input
          error={!!fieldError}
          type={type}
          label={label}
          isInvalid={!!fieldError}
          errorMessage={fieldError?.message}
          classNames={{
            ...classNames,
            inputWrapper: `!rounded-base ${classNames?.inputWrapper}`,
            input: `${classNames?.input} !outline-none`,
          }}
          className={`${className} !outline-none !border-none !rounded-base`}
          {...field}
          {...props}
        />
      )}
      {type == "file" && (
        <Input
          error={!!fieldError}
          type={type}
          id={name}
          label={label}
          accept={accept}
          multiple={multiple}
          isInvalid={!!fieldError}
          errorMessage={fieldError?.message}
          classNames={{
            ...classNames,
            inputWrapper: `!rounded-base ${classNames?.inputWrapper}`,
          }}
          className={`${className} !outline-none absolute opacity-0 top-0 !border-none`}
          value={undefined}
          onChange={(e) => {
            const { files } = e.target;
            if (files?.length) {
              field.onChange(Object.values(files));
            }
          }}
          {...props}
        />
      )}
    </>
  );
}
