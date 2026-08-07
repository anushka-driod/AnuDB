export default function CreateTableModal({
  open,
  onClose,
}) {

  if (!open) return null;

  return (

    <div className="modal-overlay">

      <div className="database-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Create Table</h2>

        <input
          placeholder="Table Name"
        />

        <select>

          <option>School</option>

          <option>Hospital</option>

          <option>CRM</option>

        </select>

        <button className="create-btn">
          Create Table
        </button>

      </div>

    </div>

  );
}