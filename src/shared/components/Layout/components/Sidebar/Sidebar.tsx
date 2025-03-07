import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router';
import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/shared/hooks/useAuth';
import styles from './Sidebar.module.css';

const { Sider } = Layout;

/**
 * Sidebar component with navigation menu
 */
const Sidebar: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useAuth();

  return (
    <Sider className={styles.sider}>
      <div className={styles.logo} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname.split('/')[1] || 'dashboard']}
        items={[
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => navigate('/dashboard'),
          },
          {
            key: 'users',
            icon: <UserOutlined />,
            label: 'Users',
            onClick: () => navigate('/users'),
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: logout,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar; 