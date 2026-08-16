import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/analyticsService";

export default function AnalyticsChart() {

  const [apiData, setApiData] = useState([]);

  useEffect(() => {

    const loadAnalytics = async () => {

      try {

        const response = await getAnalytics();

        if (response.data.success) {
          setApiData(response.data.apiUsage || []);
        }

      } catch (error) {

        console.error(
          "API chart error:",
          error
        );

      }

    };

    loadAnalytics();

  }, []);

  return (

    <div className="dashboard-panel">

      <h3>API Requests</h3>

      {apiData.length === 0 ? (

        <div
          style={{
            height: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#94A3B8",
          }}
        >
          No API requests yet
        </div>

      ) : (

        <div style={{ height: 320 }}>

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart data={apiData}>

              <defs>

                <linearGradient
                  id="colorApi"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#3B82F6"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor="#3B82F6"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#1E293B"
              />

              <XAxis
                dataKey="day"
                stroke="#94A3B8"
              />

              <YAxis
                stroke="#94A3B8"
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="requests"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorApi)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      )}

    </div>

  );
}