export default function Preferences() {
  return (
    <div className="dashboard-panel">

      <h3>Preferences</h3>

      <div className="setting-row">
        <span>Enable Notifications</span>
        <input type="checkbox" defaultChecked />
      </div>

      <div className="setting-row">
        <span>Dark Mode</span>
        <input type="checkbox" />
      </div>

      <div className="setting-row">
        <span>Auto Backup</span>
        <input type="checkbox" />
      </div>

    </div>
  );
}