import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { apiData } from "../../data/dashboardData";

export default function AnalyticsChart() {
  return (
    <div className="dashboard-panel">
      <h3>API Requests</h3>

      <div style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
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

            <CartesianGrid stroke="#1E293B" />

            <XAxis dataKey="name" stroke="#94A3B8" />

            <YAxis stroke="#94A3B8" />

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
    </div>
  );
}