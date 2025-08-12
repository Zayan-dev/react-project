import { Radio, RadioGroup } from "@heroui/react";
import { useController } from "react-hook-form";
import type { BaseRadioGroupProps } from "../../utils/types";

export default function BaseRadioGroup({
  options,
  name,
  rules,
  control,
  ...props
}: BaseRadioGroupProps) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, rules, control });
  return (
    <RadioGroup
      isInvalid={!!error}
      errorMessage={error?.message}
      {...field}
      {...props}
    >
      {options.map((e) => (
        <Radio
          key={e.label}
          classNames={{ label: "text-white" }}
          value={e.value}
        >
          {e.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
