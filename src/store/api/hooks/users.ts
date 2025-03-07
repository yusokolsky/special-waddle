import { authApi as api } from '../base';

const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        adminUsersControllerCreate: build.mutation<
            AdminUsersControllerCreateApiResponse,
            AdminUsersControllerCreateApiArg
        >({
            query: (queryArg) => ({
                url: `/api/admin/users`,
                method: 'POST',
                body: queryArg,
            }),
        }),
        adminUsersControllerFindAll: build.query<
            AdminUsersControllerFindAllApiResponse,
            AdminUsersControllerFindAllApiArg
        >({
            query: (queryArg) => ({
                url: `/api/admin/users`,
                params: {
                    page: queryArg.page,
                    limit: queryArg.limit,
                    query: queryArg.query,
                    sort: queryArg.sort,
                },
            }),
        }),
        adminUsersControllerFindOne: build.query<
            AdminUsersControllerFindOneApiResponse,
            AdminUsersControllerFindOneApiArg
        >({
            query: (queryArg) => ({ url: `/api/admin/users/${queryArg}` }),
        }),
        adminUsersControllerUpdate: build.mutation<
            AdminUsersControllerUpdateApiResponse,
            AdminUsersControllerUpdateApiArg
        >({
            query: (queryArg) => ({
                url: `/api/admin/users/${queryArg.id}`,
                method: 'PATCH',
                body: queryArg.updateUserDto,
            }),
        }),
        adminUsersControllerRemove: build.mutation<
            AdminUsersControllerRemoveApiResponse,
            AdminUsersControllerRemoveApiArg
        >({
            query: (queryArg) => ({
                url: `/api/admin/users/${queryArg}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false,
});
export { injectedRtkApi as usersApi };
export type AdminUsersControllerCreateApiResponse = /** status 200  */ User;
export type AdminUsersControllerCreateApiArg = CreateUserDto;
export type AdminUsersControllerFindAllApiResponse ={
    data: AdminUserResponseDto[];
    totalPages:number;
    page:number;
};
/** status 200  */;
export type AdminUsersControllerFindAllApiArg = {
    page?: number;
    limit?: number;
    query?: string;
    /** Sorting parameters. Format: sort[0]=field,order. Example: sort[0]=lastName,asc&sort[1]=firstName,desc */
    sort?: string[];
};
export type AdminUsersControllerFindOneApiResponse = /** status 200  */ {
  data: User[];
  totalPages:number;
  page:number;
};
export type AdminUsersControllerFindOneApiArg = string;
export type AdminUsersControllerUpdateApiResponse = /** status 200  */ User;
export type AdminUsersControllerUpdateApiArg = {
    id: string;
    updateUserDto: UpdateUserDto;
};
export type AdminUsersControllerRemoveApiResponse = unknown;
export type AdminUsersControllerRemoveApiArg = string;
export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    position: string;
    howDidYouHearAboutUs: string;
    acceptsEmailContact: boolean;
    isVerified: boolean;
    phone: string;
    language: string;
    storeUserToken: string;
};
export type CreateUserDto = {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    externalService?: string;
    externalServiceUserId?: string;
    phone?: string;
    language?: string;
};
export type UserSubscriptionStatusDto = {
    hasActiveSubscription: boolean;
    activeSubscriptionId?: number;
    expiresAt?: string;
    isInTrial?: boolean;
    renewsAutomatically?: boolean;
    daysUntilExpiration?: number;
    platformProductId?: string;
    platform?: object;
    nameProductId?: string;
};
export type AdminUserResponseDto = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    position: string;
    howDidYouHearAboutUs: string;
    acceptsEmailContact: boolean;
    isVerified: boolean;
    phone: string;
    language: string;
    storeUserToken: string;
    /** Active subscription details */
    activeSubscription: UserSubscriptionStatusDto;
    /** Array of strategy IDs associated with the user */
    strategyIds: number[];
    isSuperAdmin: boolean;
    permissions: string[];
};
export type UpdateUserDto = {
    email?: string;
    firstName?: string;
    lastName?: string;
    position?: string;
    howDidYouHearAboutUs?: string;
    acceptsEmailContact?: boolean;
    isVerified?: boolean;
    phone?: string;
    language?: string;
    storeUserToken?: string;
    password?: string;
};
export const {
    useAdminUsersControllerCreateMutation,
    useAdminUsersControllerFindAllQuery,
    useLazyAdminUsersControllerFindAllQuery,
    useAdminUsersControllerFindOneQuery,
    useLazyAdminUsersControllerFindOneQuery,
    useAdminUsersControllerUpdateMutation,
    useAdminUsersControllerRemoveMutation,
} = injectedRtkApi;
