import StatsCards from "../../components/dashboard/StatsCards";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";
import StorageChart from "../../components/dashboard/StorageChart";

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Top Statistics */}
      <StatsCards />

      {/* Charts */}
      <div className="charts-grid">
        <AnalyticsChart />
        <StorageChart />
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-grid">
        <RecentActivity />
        <QuickActions />
      </div>

    </div>
  );
}