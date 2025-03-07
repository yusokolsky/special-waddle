import { Form, Input, Select, Switch } from "antd";
import { User } from "@/store/api/hooks/users";
import styles from "./EditableCell.module.css";

interface SelectOption {
  value: string;
  label: string;
  permissions?: string[];
}

interface EditableCellProps {
  editing: boolean;
  dataIndex: keyof User;
  title: React.ReactNode;
  inputType: "number" | "text" | "boolean" | "select";
  inputOptions?: SelectOption[];
  record: User;
  index: number;
  children: React.ReactNode;
}

/**
 * Returns the appropriate input component based on the input type
 * @param inputType - Type of input to render
 * @param inputOptions - Options for select input type
 * @returns React input component
 */
const getInputNode = (inputType: string, inputOptions?: SelectOption[]) => {
  switch (inputType) {
    case "boolean":
      return <Switch />;
    case "select":
      return <Select options={inputOptions} />;
    default:
      return <Input />;
  }
};

/**
 * EditableCell component for inline editing in tables
 * @param props - Component props
 * @returns React component
 */
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  inputOptions,
  record,
  index,
  children,
  ...restProps
}: EditableCellProps): JSX.Element => {
  return (
    <td {...restProps} className={editing ? styles.editingCell : ""}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[]}
          initialValue={record[dataIndex]}
        >
          {getInputNode(inputType, inputOptions)}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
