import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AnalyticsCards from "../../components/analytics/AnalyticsCards";
import DatabaseGrowthChart from "../../components/analytics/DatabaseGrowthChart";
import ApiUsageChart from "../../components/analytics/ApiUsageChart";
import TopDatabases from "../../components/analytics/TopDatabases";

import { getAnalytics } from "../../services/analyticsService";


export default function Analytics() {

  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);


  const loadAnalytics = async () => {

    try {

      setLoading(true);

      const response = await getAnalytics();

      if (response.data.success) {

        setAnalytics(response.data);

      }

    } catch (error) {

      console.error("Analytics error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load analytics."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadAnalytics();

  }, []);


  if (loading) {

    return (
      <div className="analytics-page">

        <div className="page-header">

          <div>

            <h1>Analytics</h1>

            <p>
              Loading analytics...
            </p>

          </div>

        </div>

      </div>
    );

  }


  return (

    <div className="analytics-page">

      <div className="page-header">

        <div>

          <h1>Analytics</h1>

          <p>
            Monitor your database performance.
          </p>

        </div>

      </div>


      <AnalyticsCards
        cards={analytics?.cards}
      />


      <div className="charts-grid">

        <DatabaseGrowthChart
          data={analytics?.databaseGrowth || []}
        />

        <ApiUsageChart
          data={analytics?.apiUsage || []}
        />

      </div>


      <TopDatabases
        data={analytics?.topDatabases || []}
      />

    </div>

  );

}