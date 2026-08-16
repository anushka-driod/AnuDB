import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import toast from "react-hot-toast";

import { getStorageStats } from "../../services/storageService";

const COLORS = ["#2563EB", "#A78BFA"];

export default function StorageChart() {

  const [stats, setStats] = useState({
    usedBytes: 0,
  });

  const [loading, setLoading] = useState(true);

  const loadStats = async () => {

    try {

      setLoading(true);

      const response = await getStorageStats();

      if (response.data.success) {

        setStats({
          usedBytes:
            response.data.stats.usedBytes || 0,
        });

      }

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load storage usage."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    loadStats();

  }, []);


  const formatSize = (bytes) => {

    if (!bytes || bytes === 0) {
      return "0 B";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    return `${(
      bytes /
      (1024 * 1024 * 1024)
    ).toFixed(2)} GB`;
  };


  if (loading) {

    return (
      <div className="dashboard-panel">

        <h3>Storage Usage</h3>

        <p>Loading storage usage...</p>

      </div>
    );

  }


  const usedBytes = stats.usedBytes;

  // AnuDB storage capacity reference
  const capacity = 1024 * 1024 * 1024;

  const freeBytes = Math.max(
    capacity - usedBytes,
    0
  );


  const data = [
    {
      name: "Used",
      value: usedBytes,
    },
    {
      name: "Free",
      value: freeBytes,
    },
  ];


  const usedPercentage =
    ((usedBytes / capacity) * 100).toFixed(2);


  const renderLabel = ({
    name,
    percent,
  }) => {

    if (name === "Used") {
      return `${(percent * 100).toFixed(2)}%`;
    }

    return "";
  };


  return (

    <div className="dashboard-panel">

      <h3>Storage Usage</h3>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >

        <PieChart
          width={400}
          height={320}
        >

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={105}
            label={renderLabel}
            labelLine={false}
          >

            {data.map((entry, index) => (

              <Cell
                key={`cell-${index}`}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip
            formatter={(value, name) => [
              formatSize(value),
              name,
            ]}
          />

          <Legend />

        </PieChart>


        <div>

          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Used Storage
          </p>

          <h2>
            {formatSize(usedBytes)}
          </h2>

          <p>
            {usedPercentage}% of 1 GB
          </p>

        </div>

      </div>

    </div>

  );
}