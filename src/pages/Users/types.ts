// Table related types
import { ReactElement, ReactNode } from "react";
import { ColumnType } from "antd/es/table";
import { NamePath } from "antd/es/form/interface";
import { User } from "@/store/api/hooks/users";

/**
 * Sort order type for table columns
 */
export type SortOrder = "asc" | "desc";

/**
 * Table parameters interface for API requests
 */
export interface TableParams {
  page: number;
  limit: number;
  searchText: string;
  sortField?: string;
  sortOrder?: SortOrder;
}

/**
 * Select option interface for dropdown menus
 */
export interface SelectOption {
  value: string;
  label: string;
  permissions?: string[];
}

/**
 * Props interface for editable table cells
 */
export interface EditableCellProps {
  editing: boolean;
  dataIndex: NamePath;
  title: ReactNode;
  inputType: "number" | "text" | "boolean" | "select";
  inputOptions?: SelectOption[];
  record: User;
  index: number;
  children: ReactNode;
}

// Search related types
/**
 * Props interface for search field component
 */
export interface SearchFieldProps {
  searchText: string;
  onSearch: (value: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

/**
 * Extended column type for custom table columns
 */
export interface CustomColumnType extends Omit<ColumnType<User>, 'render'> {
  title: string;
  dataIndex?: string;
  width?: string;
  editable?: boolean;
  sorter?: boolean;
  render?: (text: any, record: User) => ReactElement;
}
