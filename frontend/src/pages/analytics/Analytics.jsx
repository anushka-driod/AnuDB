import AnalyticsCards from "../../components/analytics/AnalyticsCards";
import DatabaseGrowthChart from "../../components/analytics/DatabaseGrowthChart";
import ApiUsageChart from "../../components/analytics/ApiUsageChart";
import TopDatabases from "../../components/analytics/TopDatabases";

export default function Analytics() {
  return (
    <div className="analytics-page">

      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p>Monitor your database performance.</p>
        </div>
      </div>

      <AnalyticsCards />

      <div className="charts-grid">
        <DatabaseGrowthChart />
        <ApiUsageChart />
      </div>

      <TopDatabases />

    </div>
  );
}