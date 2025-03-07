import { FC } from 'react';
import { Layout, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useAuth } from '@/shared/hooks/useAuth';
import styles from './Header.module.css';

const { Header: AntHeader } = Layout;

/**
 * Header component with user profile and navigation
 */
const Header: FC = () => {
  const { user, logout } = useAuth();

  const items: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  return (
    <AntHeader className={styles.header}>
      <div className={styles.logo}>
        User Management System
      </div>
      <div className={styles.rightSection}>
        <Dropdown menu={{ items }} placement="bottomRight">
          <Button type="text" className={styles.profileButton}>
            <Avatar icon={<UserOutlined />} />
            <span className={styles.username}>{user?.name}</span>
          </Button>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header; 