import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { AuthPage } from "@/pages/auth/AuthPage";
import { EmailConfirmationPage } from "@/pages/auth/EmailConfirmationPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { ForgetPasswordPage } from "@/pages/auth/ForgetPasswordPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { PageLayout } from "./layouts/PageLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useTokenManager } from "@/hooks/useTokenManager";

function App() {
  // Initialize token manager for automatic token refresh
  useTokenManager();

  return (
    <PageLayout>
      <Routes>
        {/* Public routes - redirect to /home if authenticated */}
        <Route
          path="/"
          element={
            <ProtectedRoute requireAuth={false}>
              <AuthPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/emailConfirmation"
          element={
            <ProtectedRoute requireAuth={false}>
              <EmailConfirmationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            <ProtectedRoute requireAuth={false}>
              <ResetPasswordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/forgetPassword"
          element={
            <ProtectedRoute requireAuth={false}>
              <ForgetPasswordPage />
            </ProtectedRoute>
          }
        />

        {/* Protected routes - require authentication */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:username"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </PageLayout>
  );
}

export default App;
