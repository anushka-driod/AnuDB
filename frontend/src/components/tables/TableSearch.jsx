import { FiSearch } from "react-icons/fi";

export default function TableSearch({
  search,
  setSearch,
  onCreateTable,
}) {
  return (
    <div className="database-search-container">

      <div className="search-box">

        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search tables..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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