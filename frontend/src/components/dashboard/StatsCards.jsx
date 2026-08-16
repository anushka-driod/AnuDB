import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FiDatabase,
  FiTable,
  FiActivity,
  FiHardDrive,
} from "react-icons/fi";

import { getAnalytics } from "../../services/analyticsService";
import { getStorageStats } from "../../services/storageService";

function formatBytes(bytes) {

  if (!bytes || bytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB", "TB"];

  const index =
    Math.floor(
      Math.log(bytes) / Math.log(1024)
    );

  const value =
    bytes / Math.pow(1024, index);

  return `${value.toFixed(1)} ${units[index]}`;
}


export default function StatsCards() {

  const [stats, setStats] = useState({
    databases: 0,
    tables: 0,
    apiCalls: 0,
    storage: "0 B",
  });


  useEffect(() => {

    const loadStats = async () => {

      try {

        const [
          analyticsResponse,
          storageResponse
        ] = await Promise.all([
          getAnalytics(),
          getStorageStats()
        ]);


        const cards =
          analyticsResponse.data.cards;

        const usedBytes =
          storageResponse.data.stats.usedBytes || 0;


        setStats({

          databases:
            cards.databases || 0,

          tables:
            cards.tables || 0,

          apiCalls:
            cards.apiCalls || 0,

          storage:
            formatBytes(usedBytes),

        });

      } catch (error) {

        console.error(
          "Dashboard stats error:",
          error
        );

        toast.error(
          "Failed to load dashboard statistics."
        );

      }

    };

    loadStats();

  }, []);


  const statsData = [

    {
      title: "Databases",
      value: stats.databases,
      icon: <FiDatabase />,
    },

    {
      title: "Tables",
      value: stats.tables,
      icon: <FiTable />,
    },

    {
      title: "API Requests",
      value: stats.apiCalls,
      icon: <FiActivity />,
    },

    {
      title: "Storage",
      value: stats.storage,
      icon: <FiHardDrive />,
    },

  ];


  return (

    <div className="stats-grid">

      {statsData.map((item) => (

        <div
          className="stats-card"
          key={item.title}
        >

          <div className="stats-icon">
            {item.icon}
          </div>

          <h2>{item.value}</h2>

          <p>{item.title}</p>

        </div>

      ))}

    </div>

  );
}