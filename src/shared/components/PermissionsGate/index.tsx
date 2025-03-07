import { ReactNode } from 'react';
import { useAdminAdministratorsControllerGetProfileQuery } from '@/store/api/hooks/auth';
import { Permission } from '@/constants/permissions';

interface PermissionsGateProps {
  // Array of permissions required to render children
  requiredPermissions?: Permission[];
  children: ReactNode;
}

/**
 * Component that renders its children only if the current user
 * has the required permissions or is a super admin
 */
export const PermissionsGate = ({
  requiredPermissions,
  children,
}: PermissionsGateProps) => {
  // Fetch current user's profile and permissions
  const { data } = useAdminAdministratorsControllerGetProfileQuery();
  
  // Don't render anything if profile data is not loaded
  if (!data) return null;
  
  const { permissions, isSuperAdmin } = data;
  const userPermissions = new Set(permissions);

  // Super admin has access to everything
  if (isSuperAdmin) return children;

  // If no permissions are required, don't render anything
  if (!requiredPermissions) return null;
  
  // Check if user has at least one of the required permissions
  const hasPermission = requiredPermissions.some((perm) =>
    userPermissions.has(perm)
  );

  // Don't render anything if user doesn't have required permissions
  if (!hasPermission) return null;

  return children;
}; 