import { FiSearch } from "react-icons/fi";

export default function ApiSearch({
  onGenerate,
}) {

  return (

    <div className="database-search-container">

      <div className="search-box">

        <FiSearch className="search-icon"/>

        <input
          placeholder="Search APIs..."
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