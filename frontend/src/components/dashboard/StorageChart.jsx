import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { getStorageStats } from "../../services/storageService";

const COLORS = [
  "#3B82F6",
  "#1E293B",
];

export default function StorageChart() {

  const [storage, setStorage] = useState({
    usedBytes: 0,
    freeBytes: 0,
  });


  useEffect(() => {

    const loadStorage = async () => {

      try {

        const response =
          await getStorageStats();

        if (response.data.success) {

          const used =
            response.data.stats.usedBytes || 0;

          // Dashboard storage capacity
          const capacity =
            1024 * 1024 * 1024;

          const free =
            Math.max(
              capacity - used,
              0
            );

          setStorage({
            usedBytes: used,
            freeBytes: free,
          });

        }

      } catch (error) {

        console.error(
          "Storage chart error:",
          error
        );

        toast.error(
          "Failed to load storage usage."
        );

      }

    };

    loadStorage();

  }, []);


  const data = [
    {
      name: "Used",
      value: storage.usedBytes,
    },
    {
      name: "Free",
      value: storage.freeBytes,
    },
  ];


  return (

    <div className="dashboard-panel">

      <h3>Storage Usage</h3>

      <div style={{ height: 300 }}>

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              innerRadius={70}
              outerRadius={95}
              dataKey="value"
            >

              {data.map(
                (entry, index) => (

                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                  />

                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
}