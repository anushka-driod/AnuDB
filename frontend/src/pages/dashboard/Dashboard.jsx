import StatsCards from "../../components/dashboard/StatsCards";
import RecentActivity from "../../components/dashboard/RecentActivity";
import QuickActions from "../../components/dashboard/QuickActions";
import AnalyticsChart from "../../components/dashboard/AnalyticsChart";
import StorageChart from "../../components/dashboard/StorageChart";
import DatabaseTable from "../../components/dashboard/DatabaseTable";
import FloatingButton from "../../components/dashboard/FloatingButton";


export default function Dashboard() {
  return (
    <>
      <StatsCards />

      <div className="charts-grid">
        <AnalyticsChart />
        <StorageChart />
      </div>

      <div className="dashboard-grid">
        <RecentActivity />
        <QuickActions />
        <DatabaseTable />
        <FloatingButton />
      </div>
    </>
  );
}