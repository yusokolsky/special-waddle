import { Table, Form, notification, Spin } from "antd";
import { FC, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { User } from "@/store/api/hooks/users";
import EditableCell from "@/shared/components/EditableCell/EditableCell";
import { useUsersTable } from "../../hooks/useUsersTable";
import SearchField from "./SearchField/SearchField";
import styles from "./UsersTable.module.css";

/**
 * Constants for table layout calculations
 * @constant
 */
const HEADER_HEIGHT = 260;
const PADDING_BOTTOM = 20;

/**
 * UsersTable component displays a list of users with infinite scroll and inline editing capabilities
 * Implements virtual scrolling for large datasets and optimized re-renders
 */
const UsersTable: FC = () => {
  // Calculate initial table height based on window size
  const [tableHeight, setTableHeight] = useState(() =>
    typeof window === "undefined"
      ? 500
      : window.innerHeight - HEADER_HEIGHT - PADDING_BOTTOM,
  );

  const {
    usersData,
    columns,
    isLoading,
    isFetching,
    searchText,
    handleTableChange,
    handleSearch,
    form,
    loadMore,
    hasMore,
    resetTableState,
    hasActiveFilters,
    error,
    updateError,
    deleteError,
    updateSuccess,
    deleteSuccess,
    setUpdateSuccess,
    setDeleteSuccess,
  } = useUsersTable();

  // Memoized configurations
  const stickyConfig = useMemo(
    () => ({
      offsetHeader: 0,
    }),
    [],
  );

  const containerStyle = useMemo(
    () => ({
      height: `${tableHeight + 90}px`,
      overflow: "auto",
      position: "relative" as const,
    }),
    [tableHeight],
  );

  const infiniteScrollStyle = useMemo(
    () => ({
      overflow: "visible" as const,
    }),
    [],
  );

  // Update table height on window resize with debounce
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateHeight = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setTableHeight(window.innerHeight - HEADER_HEIGHT - PADDING_BOTTOM);
      }, 150);
    };

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle notifications for different operations
  useEffect(() => {
    if (error) {
      notification.error({
        message: "Error",
        description: error.toString(),
      });
    }
    if (updateError) {
      notification.error({
        message: "Error",
        description: updateError.toString() || "Failed to update user",
      });
    }
    if (updateSuccess) {
      notification.success({
        message: "Success",
        description: "User updated successfully",
      });
      setUpdateSuccess(false);
    }
    if (deleteError) {
      notification.error({
        message: "Error",
        description: deleteError.toString() || "Failed to delete user",
      });
    }
    if (deleteSuccess) {
      notification.success({
        message: "Success",
        description: "User deleted successfully",
      });
      setDeleteSuccess(false);
    }
  }, [
    error,
    updateError,
    deleteError,
    updateSuccess,
    deleteSuccess,
    setUpdateSuccess,
    setDeleteSuccess,
  ]);

  return (
    <div className={styles.container}>
      <SearchField
        searchText={searchText}
        onSearch={handleSearch}
        onReset={resetTableState}
        hasActiveFilters={hasActiveFilters}
      />
      <Form form={form} component={false}>
        <div id="scrollableTable" style={containerStyle}>
          <InfiniteScroll
            dataLength={usersData.length}
            next={loadMore}
            hasMore={hasMore}
            loader={hasMore && <Spin className={styles.moreLoader} />}
            scrollableTarget="scrollableTable"
            style={infiniteScrollStyle}
          >
            <Table<User>
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              columns={columns}
              dataSource={usersData}
              rowKey="id"
              pagination={false}
              loading={isLoading || isFetching}
              onChange={handleTableChange}
              sticky={stickyConfig}
              scroll={{ x: true }}
            />
          </InfiniteScroll>
        </div>
      </Form>
    </div>
  );
};

export default UsersTable;
