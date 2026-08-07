import { FiSearch } from "react-icons/fi";

export default function RecordSearch({
  onCreateRecord,
}) {

  return (

    <div className="database-search-container">

      <div className="search-box">

        <FiSearch className="search-icon" />

        <input
          placeholder="Search records..."
        />

      </div>

      <button
        className="new-db-btn"
        onClick={onCreateRecord}
      >
        + Add Record
      </button>

    </div>

  );

}