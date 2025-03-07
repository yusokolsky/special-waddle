import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: process.env.VITE_API_SCHEMA_URL || 'http://api.example.com/swagger.json',
  apiFile: './src/store/api.ts',
  apiImport: 'emptySplitApi',
  outputFiles: {
    './src/store/api/hooks/auth.ts': {
      filterEndpoints: (operationId, { path }) => {
        const authPattern = /\/api\/admin\/auth/;
        return (
          path &&
          (authPattern.test(path) || '/api/admin/administrators/me' === path)
        );
      },
      exportName: 'authApi',
      apiImport: 'authApi',
      flattenArg: true,
    },
    './src/store/api/hooks/users.ts': {
      filterEndpoints: (operationId, { path }) => {
        const rolesPattern = /\/api\/admin\/users/;
        return path && rolesPattern.test(path);
      },
      exportName: 'usersApi',
      apiImport: 'usersApi',
      flattenArg: true,
    },
  },
  exportName: 'generatedApi',
  hooks: true,
  tag: true,
}

export default config 