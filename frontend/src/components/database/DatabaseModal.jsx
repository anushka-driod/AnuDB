import Wizard from "./Wizard";

export default function DatabaseModal({
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

        <Wizard />

      </div>

    </div>

  );

}