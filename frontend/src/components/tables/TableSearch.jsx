import { FiSearch } from "react-icons/fi";

export default function TableSearch({
  onCreateTable,
}) {
  return (
    <div className="database-search-container">

      <div className="search-box">

        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search tables..."
        />

      </div>

      <button
        className="new-db-btn"
        onClick={onCreateTable}
      >
        + New Table
      </button>

    </div>
  );
}