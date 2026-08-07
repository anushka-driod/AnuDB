export default function CreateRecordModal({
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

        <h2>Add Record</h2>

        <input
          placeholder="Name"
        />

        <input
          placeholder="Email"
        />

        <input
          placeholder="Age"
        />

        <button className="create-btn">
          Save Record
        </button>

      </div>

    </div>

  );

}