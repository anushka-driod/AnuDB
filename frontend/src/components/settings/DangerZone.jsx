export default function DangerZone() {

  return (

    <div className="dashboard-panel">

     <h3 style={{ color: "#EF4444" }}>
  Danger Zone
</h3>

<p>
Deleting your account will permanently remove all databases, tables and records.
</p>

<button className="delete-btn">
Delete Account
</button>
    </div>

  );

}