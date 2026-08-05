import { Routes, Route, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

function DashboardPlaceholder() {
  return (
    <div
      style={{
        padding: "40px",
        fontSize: "28px",
      }}
    >
      Dashboard Coming Soon
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Authentication */}
   <Route element={<AuthLayout />}>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />
</Route>

      {/* Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={<DashboardPlaceholder />}
        />
      </Route>

      {/* Unknown Routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}