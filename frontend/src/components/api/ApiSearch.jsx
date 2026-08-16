import { FiSearch } from "react-icons/fi";

export default function ApiSearch({
  search,
  setSearch,
  onGenerate,
}) {
  return (
    <div className="database-search-container">

      <div className="search-box">

        <FiSearch className="search-icon" />

        <input
          placeholder="Search APIs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <button
        className="new-db-btn"
        onClick={onGenerate}
      >
        + Generate API
      </button>

    </div>
  );
}