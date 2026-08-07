export default function SecuritySettings() {
  return (
    <div className="dashboard-panel">

      <h3>Security</h3>

      <div className="settings-form">

        <label>Current Password</label>
        <input type="password" />

        <label>New Password</label>
        <input type="password" />

        <label>Confirm Password</label>
        <input type="password" />

        <button className="create-btn">
          Change Password
        </button>

      </div>

    </div>
  );
}