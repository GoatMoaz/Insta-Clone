import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { AuthPage } from "@/pages/auth/AuthPage";
import { EmailConfirmationPage } from "@/pages/auth/EmailConfirmationPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { ForgetPasswordPage } from "@/pages/auth/ForgetPasswordPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { PageLayout } from "./layouts/PageLayout";

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/auth/emailConfirmation"
          element={<EmailConfirmationPage />}
        />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/forgetPassword" element={<ForgetPasswordPage />} />

        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
