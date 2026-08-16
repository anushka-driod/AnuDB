import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DatabaseGrowthChart({ data = [] }) {

  return (
    <div className="dashboard-panel">

      <h3>Database Growth</h3>

      {data.length === 0 ? (

        <p>No database growth data available.</p>

      ) : (

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <AreaChart data={data}>

            <CartesianGrid stroke="#1E293B" />

            <XAxis dataKey="month" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="databases"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.3}
            />

          </AreaChart>

        </ResponsiveContainer>

      )}

    </div>
  );
}