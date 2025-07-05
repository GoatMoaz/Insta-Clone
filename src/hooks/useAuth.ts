import { useState } from "react";
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

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://insta.runasp.net/api/Auth/login",
        data
      );
      setIsLoading(false);

      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));

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
      await axios.post("https://insta.runasp.net/api/Auth/register", data);
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

  return {
    login,
    register,
    isLoading,
    error,
    setError,
  };
};
