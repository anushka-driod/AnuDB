import { FiSearch, FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function DashboardNavbar() {

  const { theme, toggleTheme } = useTheme();

  return (
    <header className="dashboard-navbar">

      <div className="navbar-search">
        <FiSearch />

        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      <div className="navbar-right">

        {/* Theme Toggle */}
        <button
          className="icon-btn"
          onClick={toggleTheme}
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>

        {/* Notifications */}
        <button className="icon-btn">
          <FiBell />
        </button>

        {/* Profile */}
        <div className="navbar-profile">
          A
        </div>

      </div>

    </header>
  );
}