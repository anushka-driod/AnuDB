import {
  FiSearch,
  FiBell,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDatabases } from "../../services/databaseService";
import { getApis } from "../../services/apiService";

export default function DashboardNavbar() {

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [databases, setDatabases] = useState([]);
  const [apis, setApis] = useState([]);


  // ===============================
  // Load Search Data
  // ===============================
  useEffect(() => {

    const loadSearchData = async () => {

      try {

        const [
          databaseResponse,
          apiResponse
        ] = await Promise.all([
          getDatabases(),
          getApis()
        ]);


        if (databaseResponse.data.success) {

          setDatabases(
            databaseResponse.data.databases || []
          );

        }


        if (apiResponse.data.success) {

          setApis(
            apiResponse.data.apis || []
          );

        }

      } catch (error) {

        console.error(
          "Search data error:",
          error
        );

      }

    };

    loadSearchData();

  }, []);


  // ===============================
  // Search
  // ===============================
  useEffect(() => {

    const query =
      search.trim().toLowerCase();

    if (!query) {

      setResults([]);

      return;

    }


    const databaseResults =
      databases
        .filter((database) =>
          database.name
            ?.toLowerCase()
            .includes(query)
        )
        .slice(0, 5)
        .map((database) => ({
          type: "Database",
          name: database.name,
          path: "/databases",
        }));


    const apiResults =
      apis
        .filter((item) =>
          item.name
            ?.toLowerCase()
            .includes(query)
        )
        .slice(0, 5)
        .map((item) => ({
          type: "API",
          name: item.name,
          path: "/api",
        }));


    setResults([
      ...databaseResults,
      ...apiResults,
    ]);

  }, [
    search,
    databases,
    apis
  ]);


  const handleResultClick = (result) => {

    setSearch("");

    setResults([]);

    navigate(result.path);

  };


  return (

    <header className="dashboard-navbar">


      {/* ===============================
          Search
      =============================== */}

      <div
        className="navbar-search"
        style={{
          position: "relative",
        }}
      >

        <FiSearch />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search..."
        />


        {results.length > 0 && (

          <div
            style={{
              position: "absolute",
              top: "45px",
              left: 0,
              right: 0,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              overflow: "hidden",
              zIndex: 1000,
            }}
          >

            {results.map(
              (result, index) => (

                <button
                  key={`${result.type}-${result.name}-${index}`}
                  onClick={() =>
                    handleResultClick(result)
                  }
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    border: "none",
                    background: "transparent",
                    color: "var(--text)",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >

                  <strong>
                    {result.name}
                  </strong>

                  <small
                    style={{
                      display: "block",
                      color: "var(--text-secondary)",
                      marginTop: "2px",
                    }}
                  >
                    {result.type}
                  </small>

                </button>

              )
            )}

          </div>

        )}

      </div>


      {/* ===============================
          Right Side
      =============================== */}

      <div className="navbar-right">


        {/* Theme */}

        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={
            theme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >

          {theme === "dark"
            ? <FiSun />
            : <FiMoon />}

        </button>


        {/* Notifications */}

        <button
          className="icon-btn"
          onClick={() =>
            navigate("/settings")
          }
          title="Notifications"
        >

          <FiBell />

        </button>


        {/* Profile */}

        <button
          className="navbar-profile"
          onClick={() =>
            navigate("/settings")
          }
          title="Profile Settings"
        >

          A

        </button>


      </div>

    </header>

  );
}