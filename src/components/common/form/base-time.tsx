import { TimeInput } from "@heroui/react";
import { useController } from "react-hook-form";
import type { BaseTimeProps } from "../../utils/types";

export default function BaseTime({
  name,
  control,
  rules,
  classNames,
  ...props
}: BaseTimeProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });
  return (
    <TimeInput
      {...field}
      isInvalid={!!error}
      errorMessage={error?.message}
      {...props}
      classNames={{
        ...classNames,
        inputWrapper: `!rounded-base ${classNames?.inputWrapper}`,
      }}
    />
  );
}
