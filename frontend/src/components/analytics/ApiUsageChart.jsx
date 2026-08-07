import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", requests: 1200 },
  { day: "Tue", requests: 1800 },
  { day: "Wed", requests: 2500 },
  { day: "Thu", requests: 2100 },
  { day: "Fri", requests: 3200 },
  { day: "Sat", requests: 2800 },
  { day: "Sun", requests: 3500 },
];

export default function ApiUsageChart() {
  return (
    <div className="dashboard-panel">

      <h3>API Usage</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          <CartesianGrid stroke="#1E293B" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="requests"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}