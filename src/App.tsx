import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/home/HomePage";
import { AuthPage } from "@/pages/auth/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
