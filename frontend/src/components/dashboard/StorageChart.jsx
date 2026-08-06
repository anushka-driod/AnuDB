import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { storageData } from "../../data/dashboardData";

const COLORS = [
  "#3B82F6",
  "#1E293B",
];

export default function StorageChart() {
  return (
    <div className="dashboard-panel">
      <h3>Storage Usage</h3>

      <div style={{ height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={storageData}
              innerRadius={70}
              outerRadius={95}
              dataKey="value"
            >
              {storageData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}