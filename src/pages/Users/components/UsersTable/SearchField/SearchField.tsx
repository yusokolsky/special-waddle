import { SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { ChangeEvent, JSX, useEffect, useState } from "react";
import { SearchFieldProps } from "../../../types";

import styles from "./SearchField.module.css";

/**
 * SearchField component for filtering users table
 * @param props - Component props
 * @returns React component
 */
const SearchField = ({
  searchText,
  onSearch,
  onReset,
  hasActiveFilters,
}: SearchFieldProps): JSX.Element => {
  const [text, setText] = useState(searchText);

  // Sync local state with prop
  useEffect(() => {
    setText(searchText);
  }, [searchText]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <Input
        placeholder="Search users..."
        allowClear
        value={text}
        onChange={handleSearchChange}
        prefix={<SearchOutlined className={styles.searchIcon} />}
        className={styles.searchInput}
        onPressEnter={() => onSearch(text)}
      />
      <Button
        type="primary"
        onClick={() => onSearch(text)}
        className={styles.searchButton}
      >
        Search
      </Button>
      <Button
        type="default"
        onClick={onReset}
        className={styles.resetButton}
        disabled={!hasActiveFilters}
      >
        Reset filters
      </Button>
    </div>
  );
};

export default SearchField;
