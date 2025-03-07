import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAdminAdministratorsControllerGetProfileQuery } from "../../store/api/hooks/auth.ts";

/**
 * Hook for handling authentication state and operations
 * @returns Authentication state and methods
 */
export const useAuth = () => {
  const navigate = useNavigate();

  const { data: user } = useAdminAdministratorsControllerGetProfileQuery();
  const token = localStorage.getItem("token");

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = Boolean(token && user);

  /**
   * Handle authentication errors and expired sessions
   */
  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  /**
   * Logout handler
   */
  const logout = useCallback(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  return {
    isAuthenticated,
    user,
    logout,
  };
};
