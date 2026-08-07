import { Routes, Route, Navigate } from "react-router-dom";
import Api from "../pages/api/Api";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Tables from "../pages/tables/Tables";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Records from "../pages/records/Records";
import Dashboard from "../pages/dashboard/Dashboard";
import Databases from "../pages/database/Databases";
import Storage from "../pages/storage/Storage";
import Analytics from "../pages/analytics/Analytics";
import Settings from "../pages/settings/Settings";
import NotFound from "../pages/NotFound";

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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/databases" element={<Databases />} />
        <Route
  path="/tables"
  element={<Tables />}
/>
<Route
  path="/records"
  element={<Records />}
/>
<Route
  path="/api"
  element={<Api />}
/>
<Route
path="/storage"
element={<Storage/>}
/>
<Route
  path="/analytics"
  element={<Analytics />}
/>
<Route
  path="/settings"
  element={<Settings />}
/>

      </Route>

      {/* Unknown Routes */}
     <Route
path="*"
element={<NotFound/>}
/>

    </Routes>
  );
}