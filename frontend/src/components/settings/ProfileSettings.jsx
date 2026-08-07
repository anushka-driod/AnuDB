export default function ProfileSettings() {
  return (
    <div className="dashboard-panel">

      <h3>Profile</h3>

      <div className="settings-form">

        <label>Full Name</label>
        <input
          defaultValue="Anushka Reddy"
        />

        <label>Email Address</label>
        <input
          defaultValue="anushka@gmail.com"
        />

        <label>Phone Number</label>
        <input
          placeholder="+91 XXXXX XXXXX"
        />

        <button className="create-btn">
          Save Changes
        </button>

      </div>

    </div>
  );
}