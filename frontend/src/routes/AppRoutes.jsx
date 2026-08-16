import { Routes, Route } from "react-router-dom";

import Api from "../pages/api/Api";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/dashboard/Dashboard";
import Databases from "../pages/database/Databases";
import Tables from "../pages/tables/Tables";
import Columns from "../pages/columns/Columns";
import Records from "../pages/records/Records";

import Storage from "../pages/storage/Storage";
import Analytics from "../pages/analytics/Analytics";
import Settings from "../pages/settings/Settings";

import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>

      {/* =========================
          AUTHENTICATION
      ========================= */}

      <Route element={<AuthLayout />}>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      </Route>


      {/* =========================
          DASHBOARD
      ========================= */}

      <Route element={<DashboardLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
<Route
  path="/columns"
  element={<Columns />}
/>
        <Route
          path="/databases"
          element={<Databases />}
        />

        <Route
          path="/tables"
          element={<Tables />}
        />

        <Route
          path="/columns"
          element={<Columns />}
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
          element={<Storage />}
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


      {/* =========================
          UNKNOWN ROUTES
      ========================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}