import { FiBell, FiSearch } from "react-icons/fi";

export default function DashboardNavbar() {
  return (
    <header className="dashboard-navbar">

      <div className="navbar-search">
        <FiSearch />
        <input
          placeholder="Search..."
        />
      </div>

      <div className="navbar-right">

        <button className="navbar-icon">
          <FiBell />
        </button>

        <div className="navbar-profile">
          A
        </div>

      </div>

    </header>
  );
}