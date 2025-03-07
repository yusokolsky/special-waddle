// Define all available permissions in the application
// Each permission is structured as 'resource.action'
/**
 * Application permission constants
 * Defines all available permissions in the system
 */
export const PERMISSIONS = {
  USERS: {
    VIEW: 'users.view',
    CREATE: 'users.create',
    UPDATE: 'users.update',
    DELETE: 'users.delete'
  },
  DASHBOARD: {
    VIEW: 'dashboard.view'
  },
  SETTINGS: {
    VIEW: 'settings.view',
    UPDATE: 'settings.update'
  }
} as const;

/**
 * Union type of all possible permissions
 */
export type Permission =
    | 'users.view'
    | 'users.create'
    | 'users.update'
    | 'users.delete'
    | 'dashboard.view'
    | 'settings.view'
    | 'settings.update';

// Create specific permission types for each resource
export type UserPermissions = typeof PERMISSIONS['USERS'][keyof typeof PERMISSIONS['USERS']];
export type DashboardPermissions = typeof PERMISSIONS['DASHBOARD'][keyof typeof PERMISSIONS['DASHBOARD']];
export type SettingsPermissions = typeof PERMISSIONS['SETTINGS'][keyof typeof PERMISSIONS['SETTINGS']];

/**
 * Type guard to check if a string is a valid permission
 */
export const isValidPermission = (permission: string): permission is Permission => {
  return Object.values(PERMISSIONS)
      .flatMap(group => Object.values(group))
      .includes(permission as Permission);
};