import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { AuthPage } from "@/pages/auth/AuthPage";
import { EmailConfirmationPage } from "@/pages/auth/EmailConfirmationPage";
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
        <Route path="/:username" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App;
