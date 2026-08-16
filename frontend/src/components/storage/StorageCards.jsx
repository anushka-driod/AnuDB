import { useEffect, useState } from "react";

import {
  FiHardDrive,
  FiFolder,
  FiUpload,
  FiDownload,
} from "react-icons/fi";

import toast from "react-hot-toast";

import { getStorageStats } from "../../services/storageService";


export default function StorageCards() {

  const [stats, setStats] = useState({
    files: 0,
    usedBytes: 0,
    downloads: 0,
  });

  const [loading, setLoading] = useState(true);


  const loadStats = async () => {

    try {

      const response = await getStorageStats();

      if (response.data.success) {

        setStats({
          files: response.data.stats.files || 0,
          usedBytes: response.data.stats.usedBytes || 0,
          downloads: response.data.stats.downloads || 0,
        });

      }

    } catch (error) {

      console.error(
        "Storage stats error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load storage statistics."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    loadStats();

    const handleStatsUpdate = () => {
      loadStats();
    };

    window.addEventListener(
      "storageStatsUpdated",
      handleStatsUpdate
    );

    return () => {

      window.removeEventListener(
        "storageStatsUpdated",
        handleStatsUpdate
      );

    };

  }, []);


  const formatSize = (bytes) => {

    if (!bytes || bytes === 0) {
      return "0 B";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(
        bytes / 1024
      ).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
      return `${(
        bytes /
        (1024 * 1024)
      ).toFixed(1)} MB`;
    }

    return `${(
      bytes /
      (1024 * 1024 * 1024)
    ).toFixed(2)} GB`;
  };


  const cards = [

    {
      title: "Used Storage",
      value: loading
        ? "Loading..."
        : formatSize(
            stats.usedBytes
          ),
      icon: <FiHardDrive />,
    },

    {
      title: "Files",
      value: loading
        ? "..."
        : stats.files,
      icon: <FiFolder />,
    },

    {
      title: "Uploads",
      value: loading
        ? "..."
        : stats.files,
      icon: <FiUpload />,
    },

    {
      title: "Downloads",
      value: loading
        ? "..."
        : stats.downloads,
      icon: <FiDownload />,
    },

  ];


  return (

    <div className="stats-grid">

      {cards.map((card) => (

        <div
          className="stats-card"
          key={card.title}
        >

          <div className="stats-icon">
            {card.icon}
          </div>

          <h2>
            {card.value}
          </h2>

          <p>
            {card.title}
          </p>

        </div>

      ))}

    </div>

  );
}