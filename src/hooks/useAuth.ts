import { useState } from "react";
import apiClient from "@/config/apiClient";
import { useUserStore, User } from "@/store/useUserStore";
import axios from "axios";

interface LoginData {
  userNameOrEmail: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  birthDay: string;
}

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: setUser, logout, user } = useUserStore();

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/Auth/login", data);
      setIsLoading(false);

      const userData = response.data;

      // Save user to Zustand store (which will also persist to localStorage)
      setUser(userData as User);

      return {
        success: true,
        message: "Login successful",
      };
    } catch (err: unknown) {
      setIsLoading(false);
      let errorMessage = "An error occurred";

      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.errors?.[1] || err.message || "An error occurred";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.post("/Auth/register", data);
      setIsLoading(false);
      return {
        success: true,
        message: "Registration successful",
      };
    } catch (err: unknown) {
      setIsLoading(false);
      let errorMessage = "An error occurred";

      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.errors?.[1] || err.message || "An error occurred";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const forgetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.post("/Auth/forget-password", { email });
      setIsLoading(false);
      return {
        success: true,
        message: "Password reset link sent to your email",
      };
    } catch (err: unknown) {
      setIsLoading(false);
      let errorMessage = "An error occurred";

      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.errors?.[1] ||
          err.response?.data?.errors?.Email[0] ||
          "An error occurred";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const resetPassword = async (
    email: string,
    code: string,
    newPassword: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      await apiClient.post("/Auth/reset-password", {
        email,
        code,
        newPassword,
      });
      setIsLoading(false);
      return {
        success: true,
        message: "Password reset successful",
      };
    } catch (err: unknown) {
      setIsLoading(false);
      let errorMessage = "An error occurred";

      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.errors?.[1] ||
          err.response?.data?.errors?.NewPassword?.[0] ||
          "An error occurred";

        console.log(errorMessage);
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const refreshToken = async () => {
    if (!user?.refreshToken || !user?.token) {
      logout();
      return { success: false, message: "No refresh token available" };
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/Auth/refresh-token", {
        token: user.token,
        refreshToken: user.refreshToken,
      });

      const { token: newToken, refreshToken: newRefreshToken } = response.data;

      // Update user store with new tokens
      const updatedUser = {
        ...user,
        token: newToken,
        refreshToken: newRefreshToken,
      };

      setUser(updatedUser);
      setIsLoading(false);

      return {
        success: true,
        message: "Token refreshed successfully",
      };
    } catch (err: unknown) {
      setIsLoading(false);
      let errorMessage = "Failed to refresh token";

      if (axios.isAxiosError(err)) {
        errorMessage =
          err.response?.data?.errors?.[1] ||
          err.response?.data?.errors?.NewPassword?.[0] ||
          "An error occurred";
      }

      setError(errorMessage);
      logout(); // Logout on refresh failure

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return {
    login,
    register,
    isLoading,
    error,
    setError,
    forgetPassword,
    resetPassword,
    refreshToken,
  };
};
