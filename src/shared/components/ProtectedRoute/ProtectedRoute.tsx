import { FC, ReactElement } from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/shared/hooks/useAuth";

interface ProtectedRouteProps {
  element: ReactElement;
}

/**
 * ProtectedRoute component that handles authentication-based routing
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute: FC<ProtectedRouteProps> = ({ element }): ReactElement => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
