import { FiSearch } from "react-icons/fi";

export default function RecordSearch({
  onCreateRecord,
  search,
  setSearch,
}) {
  return (
    <div className="database-search-container">

      <div className="search-box">

        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search records..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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