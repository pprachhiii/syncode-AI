import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import UploadPage from "./pages/Upload";

import PublicRoute from "./routes/PublicRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default App;
