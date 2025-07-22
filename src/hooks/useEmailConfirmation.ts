import { useState, useCallback } from "react";
import apiClient from "@/config/apiClient";
import axios from "axios";

interface UseEmailConfirmationResult {
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string;
  confirmEmail: (username: string, code: string) => Promise<void>;
}

export const useEmailConfirmation = (): UseEmailConfirmationResult => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const confirmEmail = useCallback(async (username: string, code: string) => {
    if (!username || !code) {
      setStatus("error");
      setErrorMessage(
        "Invalid confirmation link. Missing username or confirmation code."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await apiClient.post("/Auth/confirm-email", {
        username,
        code,
      });

      if (response.status === 200) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage("Failed to confirm email. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.errors?.[1] ||
            "Failed to confirm email. Please try again."
        );
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  }, []);

  return { status, errorMessage, confirmEmail };
};
