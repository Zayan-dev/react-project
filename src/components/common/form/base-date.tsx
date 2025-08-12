import { DateInput } from "@heroui/react";
import { useController } from "react-hook-form";
import type { BaseDateProps } from "../../utils/types";

export default function BaseDate({
  name,
  control,
  rules,
  classNames,
  ...props
}: BaseDateProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules });
  return (
    <DateInput
      {...field}
      classNames={{
        ...classNames,
        inputWrapper: `!rounded-base ${classNames?.inputWrapper}`,
      }}
      isInvalid={!!error}
      errorMessage={error?.message}
      {...props}
    />
  );
}
