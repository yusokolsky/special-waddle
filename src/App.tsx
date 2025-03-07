import { FC, ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary/ErrorBoundary";
import Layout from "./shared/components/Layout/Layout.tsx";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "@/shared/hooks/useAuth";

interface ProtectedRouteProps {
  element: ReactElement;
}

/**
 * Main application component that handles routing and authentication
 * Implements protected routes and redirects
 */
const App: FC = (): ReactElement => {
  const { isAuthenticated } = useAuth();

  /**
   * Protect routes that require authentication
   * Redirect to login if not authenticated
   */
  const ProtectedRoute: FC<ProtectedRouteProps> = ({
    element,
  }): ReactElement => {
    return isAuthenticated
      ? element
      : ((<Navigate to="/login" replace />) as ReactElement);
  };

  return (
    <ErrorBoundary>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />
          }
        />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  ) as ReactElement;
};

export default App;
