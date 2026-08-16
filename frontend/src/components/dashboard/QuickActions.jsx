import { useNavigate } from "react-router-dom";

export default function QuickActions() {

  const navigate = useNavigate();

  return (
    <div className="dashboard-panel">

      <h3>Quick Actions</h3>

      <button
        className="action-btn"
        onClick={() => navigate("/databases")}
      >
        Create Database
      </button>

      <button
        className="action-btn"
        onClick={() => navigate("/tables")}
      >
        Create Table
      </button>

      <button
        className="action-btn"
        onClick={() => navigate("/api")}
      >
        Generate API
      </button>

      <button
        className="action-btn"
        onClick={() => navigate("/storage")}
      >
        Upload Backup
      </button>

    </div>
  );
}