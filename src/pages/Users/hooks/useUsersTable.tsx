import { Form, TablePaginationConfig } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { FilterValue } from 'antd/lib/table/interface';
import { Key, useCallback, useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import {
  useAdminUsersControllerFindAllQuery,
  useAdminUsersControllerRemoveMutation,
  useAdminUsersControllerUpdateMutation,
  User,
} from '@/store/api/hooks/users';
import { PermissionsGate } from '@/shared/components/PermissionsGate';
import { PERMISSIONS } from '@/constants/permissions';
import {CustomColumnType, TableParams} from '../types';

// Default parameters for table queries
const DEFAULT_PARAMS: TableParams = {
  page: 1,
  limit: 10,
  searchText: '',
  sortField: undefined,
  sortOrder: undefined,
};

/**
 * Custom hook for managing UsersTable state and operations
 */
export const useUsersTable = () => {
  // State management
  const [users, setUsers] = useState<User[]>([]);
  const [form] = Form.useForm();
  const [hasMore, setHasMore] = useState(true);
  const [editingKey, setEditingKey] = useState<Key>('');
  const [tableParams, setTableParams] = useState<TableParams>(DEFAULT_PARAMS);

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // API queries and mutations
  const {
    data: usersData = { data: [], page: 1, totalPages: 1 },
    isLoading,
    isSuccess,
    isFetching,
    refetch,
    error,
  } = useAdminUsersControllerFindAllQuery(tableParams);

  const [updateUser, { error: updateError }] = useAdminUsersControllerUpdateMutation();
  const [removeUser, { error: deleteError }] = useAdminUsersControllerRemoveMutation();

  // Update users list when data changes
  useEffect(() => {
    if (isSuccess && usersData?.data) {
      setUsers((prev) =>
        usersData.page === 1 ? usersData.data : [...prev, ...usersData.data]
      );
      setHasMore(usersData.page < usersData.totalPages);
    }
  }, [isSuccess, usersData]);

  // Table operation handlers
  const resetTableState = useCallback(() => {
    setTableParams(DEFAULT_PARAMS);
    setUsers([]);
    setHasMore(true);
    setEditingKey('');
  }, []);

  const handleTableChange = useCallback(
    (
      _: TablePaginationConfig,
      __: Record<string, FilterValue | null>,
      sorter: SorterResult<User> | SorterResult<User>[]
    ) => {
      setTableParams((prev) => ({
        ...prev,
        limit: DEFAULT_PARAMS.limit,
        page: 1,
        sortField: Array.isArray(sorter) ? undefined : (sorter.field as string),
        sortOrder: Array.isArray(sorter)
          ? undefined
          : sorter.order === 'ascend'
          ? 'asc'
          : 'desc',
      }));
    },
    []
  );

  const handleSearch = useCallback((value: string) => {
    setTableParams((prev) => ({
      ...prev,
      searchText: value,
      page: 1,
    }));
  }, []);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setTableParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  }, [isFetching, hasMore]);

  // Row editing handlers
  const isEditing = useCallback(
    (record: User) => record.id === editingKey,
    [editingKey]
  );

  const edit = useCallback(
    (record: User) => {
      form.setFieldsValue({ ...record });
      setEditingKey(record.id);
    },
    [form]
  );

  const cancel = useCallback(() => {
    setEditingKey('');
  }, []);

  const save = useCallback(
    async (key: Key) => {
      try {
        const row = await form.validateFields();
        await updateUser({
          id: key.toString(),
          updateUserDto: row,
        }).unwrap();
        setEditingKey('');
        await refetch();
        setUpdateSuccess(true);
      } catch (error) {
        console.error('Save failed:', error);
      }
    },
    [form, updateUser, refetch]
  );

  // Table columns configuration
  const columns = useMemo(
    (): CustomColumnType[] => [
      {
        title: 'First Name',
        dataIndex: 'firstName',
        sorter: true,
        width: '15%',
        editable: true,
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        sorter: true,
        width: '15%',
        editable: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        sorter: true,
        width: '20%',
        editable: true,
      },
      {
        title: 'Actions',
        width: '15%',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a onClick={() => save(record.id)} style={{ marginRight: 8 }}>
                Save
              </a>
              <a onClick={cancel}>Cancel</a>
            </span>
          ) : (
            <PermissionsGate requiredPermissions={[PERMISSIONS.USERS.UPDATE]}>
              <EditOutlined onClick={() => edit(record)} style={{ marginRight: 8 }} />
              <DeleteOutlined onClick={() => removeUser(record.id.toString())} />
            </PermissionsGate>
          );
        },
      },
    ],
    [isEditing, save, cancel, edit, removeUser]
  );

  const hasActiveFilters = useMemo(() => {
    return !!(
      tableParams.searchText ||
      tableParams.sortField ||
      tableParams.sortOrder
    );
  }, [tableParams.searchText, tableParams.sortField, tableParams.sortOrder]);

  return {
    usersData: users,
    columns,
    isLoading,
    isFetching,
    tableParams,
    searchText: tableParams.searchText,
    handleTableChange,
    handleSearch,
    form,
    editingKey,
    isEditing,
    save,
    cancel,
    edit,
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
  };
};
