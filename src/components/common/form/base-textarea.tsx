import { useController } from "react-hook-form";
import { Textarea } from "@heroui/react";
import type { BaseTextAreaProps } from "../../utils/types";

export function BaseTextArea({
  name,
  rules,
  control,
  defaultValue,
  classNames,
  ...props
}: BaseTextAreaProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <Textarea
      {...field}
      classNames={{
        ...classNames,
        input: `${classNames?.input} !outline-none`,
      }}
      isInvalid={!!error}
      errorMessage={error?.message}
      {...props}
    />
  );
}
