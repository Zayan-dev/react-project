import type {
  CheckboxGroupProps,
  DateInputProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
  TextAreaProps,
  TimeInputProps,
} from "@heroui/react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { Control, FieldValues, RegisterOptions } from "react-hook-form";

// Base Types
export type Options = { label: string; value: string }[];

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "admin" | "user" | "moderator";

// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Form Component Props
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

// Navigation Types
export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current: boolean;
  children?: NavigationItem[];
}

// Dashboard Types
export interface DashboardStat {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export interface ActivityItem {
  id: number;
  type: "user" | "payment" | "system" | "alert";
  message: string;
  time: string;
  status: "success" | "warning" | "danger" | "primary";
}

// Table Types
export interface TableColumn<T = any> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string | number;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
  sortBy?: keyof T;
  sortDirection?: "asc" | "desc";
}

// Modal Types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  children: React.ReactNode;
}

// Toast Types
export interface ToastOptions {
  title: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type PaginationMeta = {
  currentPage: number;
  itemCount: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type BaseTableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
};

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export type BaseTableProps = {
  loading?: boolean;
  bottomContentPlacement?: any;
  columns: Array<BaseTableColumn>;
  data: Array<any>;
  meta?: PaginationMeta;
  topContent?: ReactNode;
  emptyContent?: ReactNode;
  renderCell?: (item: any, columnKey: string) => ReactNode;
  pagination?: boolean;
  setMeta?: Dispatch<SetStateAction<Meta>>;
  fetchData?: (
    page: number,
    pageSize: number,
    searchQuery?: string,
    carrierType?: number,
    country?: string,
    timeDuration?: number,
    startTime?: string,
    endTime?: string,
    Status?: number,
    userId?: string
  ) => Promise<void>;
  selectMode?: "none" | "single" | "multiple";
  onSelectionChange?: (selectedKeys: any) => void;
};
