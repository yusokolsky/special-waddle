// @ts-nocheck
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './api/hooks/auth'
import { usersApi } from './api/hooks/users'
import { useDispatch, useSelector } from 'react-redux'
import { TypedUseSelectorHook } from 'react-redux'

/**
 * Configure Redux store with RTK Query APIs
 */
const rootReducer = {
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
}

const middlewares = [
  authApi.middleware,
  usersApi.middleware,
]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Export hooks for usage in functional components
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
