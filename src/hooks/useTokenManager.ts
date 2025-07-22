import { useEffect, useCallback } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useAuth } from "./useAuth";

// Utility function to decode JWT and check expiration
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true; // If we can't decode, consider it expired
  }
};

// Utility function to get time until token expires (in minutes)
const getTokenExpirationTime = (token: string): number | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    const timeUntilExpiration = (payload.exp - currentTime) / 60; // Convert to minutes
    return timeUntilExpiration > 0 ? timeUntilExpiration : 0;
  } catch {
    return null;
  }
};

export const useTokenManager = () => {
  const { user, logout } = useUserStore();
  const { refreshToken } = useAuth();

  // Check if current token is expired
  const checkTokenExpiration = useCallback(() => {
    if (!user?.token) return false;
    return isTokenExpired(user.token);
  }, [user?.token]);

  // Get minutes until token expires
  const getTimeUntilExpiration = useCallback(() => {
    if (!user?.token) return null;
    return getTokenExpirationTime(user.token);
  }, [user?.token]);

  // Manual token refresh
  const handleTokenRefresh = useCallback(async () => {
    if (!user?.token || !user?.refreshToken) {
      logout();
      return { success: false, message: "No tokens available" };
    }

    try {
      const result = await refreshToken();
      return result;
    } catch (error: unknown) {
      console.error("Token refresh failed:", error);
      logout();
      return { success: false, message: "Token refresh failed" };
    }
  }, [user?.token, user?.refreshToken, refreshToken, logout]);

  // Automatic token refresh when token is about to expire (5 minutes before)
  useEffect(() => {
    if (!user?.token) return;

    const timeUntilExpiration = getTokenExpirationTime(user.token);
    if (timeUntilExpiration === null) return;

    // If token expires in less than 5 minutes, refresh it
    if (timeUntilExpiration <= 5 && timeUntilExpiration > 0) {
      handleTokenRefresh();
      return;
    }

    // Set up timer to refresh token 5 minutes before expiration
    const refreshTime = Math.max(0, (timeUntilExpiration - 5) * 60 * 1000); // Convert to milliseconds

    const timer = setTimeout(() => {
      handleTokenRefresh();
    }, refreshTime);

    return () => clearTimeout(timer);
  }, [user?.token, handleTokenRefresh]);

  return {
    isTokenExpired: checkTokenExpiration(),
    timeUntilExpiration: getTimeUntilExpiration(),
    refreshToken: handleTokenRefresh,
    checkTokenExpiration,
  };
};
