export default function GenerateApiModal({
  open,
  onClose,
}) {

  if(!open) return null;

  return(

    <div className="modal-overlay">

      <div className="database-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Generate API</h2>

        <input
          placeholder="API Name"
        />

        <select>

          <option>Students</option>
          <option>Teachers</option>
          <option>Patients</option>

        </select>

        <select>

          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>

        </select>

        <button className="create-btn">
          Generate
        </button>

      </div>

    </div>

  );

}