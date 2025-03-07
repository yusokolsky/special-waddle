import { FC, ReactElement } from "react";
import { Routes, Route, Navigate } from "react-router";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary/ErrorBoundary";
import ProtectedRoute from "@/shared/components/ProtectedRoute/ProtectedRoute";
import Layout from "./shared/components/Layout/Layout";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "@/shared/hooks/useAuth";

/**
 * Main application component that handles routing
 */
const App: FC = (): ReactElement => {
  const { isAuthenticated } = useAuth();

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
  );
};

export default App;
