import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token')
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// Base API for auth endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: () => ({}),
})

// Base API for users endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  endpoints: () => ({}),
}) 