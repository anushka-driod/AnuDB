import { FiSearch } from "react-icons/fi";

export default function DatabaseSearch({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
  onCreateDatabase,
}) {
  return (
    <div className="database-search-container">

      <div className="search-box">
        <FiSearch className="search-icon" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search databases..."
        />
      </div>

      <select
        className="filter-select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
      </select>

      <select
        className="filter-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>

      <button
        className="new-db-btn"
        onClick={onCreateDatabase}
      >
        + New Database
      </button>

    </div>
  );
}