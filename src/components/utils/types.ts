import type {
  CheckboxGroupProps,
  DateInputProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
  TextAreaProps,
  TimeInputProps,
} from "@heroui/react";
import type { Control, FieldValues, RegisterOptions } from "react-hook-form";

type Options = { label: string; value: string }[];

export interface BaseCheckBoxProps
  extends Omit<CheckboxGroupProps, "children"> {
  options: Options;
  name: string;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  control: Control<any>;
}

export interface BaseDateProps extends DateInputProps {
  name: string;
  control: Control;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

export interface BaseInputProps extends InputProps {
  name: string;
  control: Control<FieldValues, any, FieldValues> | undefined;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
      >
    | undefined;
}

export interface BaseRadioGroupProps extends Omit<RadioGroupProps, "children"> {
  options: Options;
  name: string;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  control: Control<any>;
}

export interface BaseSelectProps extends Omit<SelectProps, "children"> {
  name: string;
  control: Control<any>;
  options: { value: string | number; label: string }[];
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

export interface BaseTextAreaProps extends TextAreaProps {
  name: string;
  control: Control;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

export interface BaseTimeProps extends TimeInputProps {
  name: string;
  control: Control;
  rules?: Omit<
    RegisterOptions<any, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}
