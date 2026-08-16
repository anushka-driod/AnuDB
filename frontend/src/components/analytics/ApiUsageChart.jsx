import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ApiUsageChart({ data = [] }) {

  return (
    <div className="dashboard-panel">

      <h3>API Usage</h3>

      {data.length === 0 ? (

        <p>No API usage recorded yet.</p>

      ) : (

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={data}>

            <CartesianGrid stroke="#1E293B" />

            <XAxis dataKey="day" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="requests"
              fill="#2563EB"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      )}

    </div>
  );
}