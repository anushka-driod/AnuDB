import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", databases: 2 },
  { month: "Feb", databases: 4 },
  { month: "Mar", databases: 5 },
  { month: "Apr", databases: 8 },
  { month: "May", databases: 10 },
  { month: "Jun", databases: 12 },
];

export default function DatabaseGrowthChart() {
  return (
    <div className="dashboard-panel">

      <h3>Database Growth</h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>

          <CartesianGrid stroke="#1E293B" />

          <XAxis dataKey="month" />

          <YAxis />

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

    </div>
  );
}