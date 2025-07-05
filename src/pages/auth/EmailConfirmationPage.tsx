import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEmailConfirmation } from "@/hooks/useEmailConfirmation";
import { EmailVerificationPending } from "@/components/auth/EmailVerificationPending";
import { EmailVerificationSuccess } from "@/components/auth/EmailVerificationSuccess";
import { EmailVerificationFailed } from "@/components/auth/EmailVerificationFailed";

export const EmailConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { status, errorMessage, confirmEmail } = useEmailConfirmation();

  const username = searchParams.get("username");
  const code = searchParams.get("code");

  useEffect(() => {
    if (username && code) {
      confirmEmail(username, code);
    }
  }, [username, code, confirmEmail]);

  const handleBackToLogin = () => {
    navigate("/");
  };

  if (status === "idle" || status === "loading") {
    return <EmailVerificationPending />;
  }

  if (status === "success") {
    return <EmailVerificationSuccess handleBackToLogin={handleBackToLogin} />;
  }

  return (
    <EmailVerificationFailed
      errorMessage={
        errorMessage || "Email verification failed. Please try again."
      }
      handleBackToLogin={handleBackToLogin}
    />
  );
};
