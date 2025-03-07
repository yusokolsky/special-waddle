import { PermissionsGate } from '@/shared/components/PermissionsGate';
import { PERMISSIONS } from '@/constants/permissions';
import UsersTable from './components/UsersTable/UsersTable';
import styles from './Users.module.css';

/**
 * Users page component
 * Protected by permissions check for users.view access
 */
const Users = () => {
  return (
    <PermissionsGate requiredPermissions={[PERMISSIONS.USERS.VIEW]}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.scrollArea}>
            <UsersTable />
          </div>
        </div>
      </div>
    </PermissionsGate>
  );
};

export default Users;
