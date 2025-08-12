import { Checkbox, CheckboxGroup } from "@heroui/react";
import { useController } from "react-hook-form";
import type { BaseCheckBoxProps } from "../../utils/types";

export default function BaseCheckBox({
  options,
  name,
  rules,
  control,
  ...props
}: BaseCheckBoxProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });
  return (
    <CheckboxGroup
      {...field}
      isInvalid={!!error}
      errorMessage={error?.message}
      {...props}
    >
      {options.map((e) => (
        <Checkbox
          key={e.value}
          classNames={{ label: "!text-white" }}
          value={e.value}
        >
          {e.label}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}
