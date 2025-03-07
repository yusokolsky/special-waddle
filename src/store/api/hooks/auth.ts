import { authApi as api } from '../base';
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        adminAuthControllerSignIn: build.mutation<
            AdminAuthControllerSignInApiResponse,
            AdminAuthControllerSignInApiArg
        >({
            query: (queryArg) => ({
                url: `/api/admin/auth/sign-in`,
                method: 'POST',
                body: queryArg,
            }),
        }),
        adminAuthControllerRefreshToken: build.mutation<
            AdminAuthControllerRefreshTokenApiResponse,
            AdminAuthControllerRefreshTokenApiArg
        >({
            query: (queryArg) => ({
                url: `/api/admin/auth/refresh`,
                method: 'POST',
                body: queryArg,
            }),
        }),
        adminAuthControllerRequestPasswordReset: build.mutation<
            AdminAuthControllerRequestPasswordResetApiResponse,
            AdminAuthControllerRequestPasswordResetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/admin/auth/reset-password`,
                method: 'POST',
                body: queryArg,
            }),
        }),
        adminAuthControllerResetPasswordVerifyCode: build.mutation<
            AdminAuthControllerResetPasswordVerifyCodeApiResponse,
            AdminAuthControllerResetPasswordVerifyCodeApiArg
        >({
            query: (queryArg) => ({
                url: `/api/admin/auth/reset-password/verify-code`,
                method: 'POST',
                body: queryArg,
            }),
        }),
        adminAuthControllerRequestPasswordResetOtp: build.mutation<
            AdminAuthControllerRequestPasswordResetOtpApiResponse,
            AdminAuthControllerRequestPasswordResetOtpApiArg
        >({
            query: (queryArg) => ({
                url: `/api/admin/auth/reset-password/send-code`,
                method: 'POST',
                body: queryArg,
            }),
        }),
        adminAdministratorsControllerGetProfile: build.query<
            AdminAdministratorsControllerGetProfileApiResponse,
            AdminAdministratorsControllerGetProfileApiArg
        >({
            query: () => ({ url: `/api/admin/administrators/me` }),
        }),
    }),
    overrideExisting: false,
});
export { injectedRtkApi as authApi };
export type AdminAuthControllerSignInApiResponse =
/** status 200 Successfully authenticated */ AdminAuthTokensDto;
export type AdminAuthControllerSignInApiArg = SignInDto;
export type AdminAuthControllerRefreshTokenApiResponse =
/** status 200 New tokens generated successfully */ AdminAuthTokensDto;
export type AdminAuthControllerRefreshTokenApiArg = RefreshTokenDto;
export type AdminAuthControllerRequestPasswordResetApiResponse = unknown;
export type AdminAuthControllerRequestPasswordResetApiArg =
    AdminResetPasswordDto;
export type AdminAuthControllerResetPasswordVerifyCodeApiResponse = unknown;
export type AdminAuthControllerResetPasswordVerifyCodeApiArg = VerifyCodeDto;
export type AdminAuthControllerRequestPasswordResetOtpApiResponse = unknown;
export type AdminAuthControllerRequestPasswordResetOtpApiArg = RequestOtpDto;
export type AdminAdministratorsControllerGetProfileApiResponse =
/** status 200 Current administrator profile */ AdministratorResponseDto;
export type AdminAdministratorsControllerGetProfileApiArg = void;
export type AdminAuthTokensDto = {
    /** JWT access token */
    accessToken: string;
    /** JWT refresh token */
    refreshToken: string;
    /** Token expiration time in milliseconds */
    expiresIn: number;
};
export type SignInDto = {
    email: string;
    password: string;
};
export type RefreshTokenDto = {
    /** Refresh token */
    refreshToken: string;
};
export type AdminResetPasswordDto = {
    /** Email address for password reset */
    email: string;
    password: string;
    passwordConfirmation: string;
    /** Activation Code */
    activationCode: string;
};
export type VerifyCodeDto = {
    /** Email address */
    email: string;
    /** Activation Code */
    activationCode: string;
};
export type RequestOtpDto = {
    /** Email address for password reset */
    email: string;
};
export type Role = {
    id: number;
    name: string;
    /** JSON object containing role permissions */
    permissions: object;
    /** ID of parent role */
    parentRoleId: number | null;
};
export type AdministratorResponseDto = {
    id: number;
    name: string;
    fullName: string;
    email: string;
    isActive: boolean;
    lastLogin: string;
    role: Role;
    createdAt: string;
    updatedAt: string;
    isSuperAdmin: boolean;
    permissions: string[];
};
export const {
    useAdminAuthControllerSignInMutation,
    useAdminAuthControllerRefreshTokenMutation,
    useAdminAuthControllerRequestPasswordResetMutation,
    useAdminAuthControllerResetPasswordVerifyCodeMutation,
    useAdminAuthControllerRequestPasswordResetOtpMutation,
    useAdminAdministratorsControllerGetProfileQuery,
    useLazyAdminAdministratorsControllerGetProfileQuery,
} = injectedRtkApi;
