import { Outlet } from "react-router-dom";

import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import DashboardNavbar from "../../components/dashboard/DashboardNavbar";

import "../../styles/dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">

      <DashboardSidebar />

      <div className="dashboard-main">

        <DashboardNavbar />

        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}