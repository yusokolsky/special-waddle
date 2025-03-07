import { FC } from 'react';
import { Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import styles from './Layout.module.css';

const { Content } = AntLayout;

/**
 * Main layout component that wraps the application content
 * Includes header, sidebar and content area
 */
const Layout: FC = () => {
  return (
    <AntLayout className={styles.layout}>
      <Header />
      <AntLayout className={styles.mainContent}>
        <Sidebar />
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
