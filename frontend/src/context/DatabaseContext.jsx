import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useLocation } from "react-router-dom";

import {
  getDatabases as fetchDatabases,
  createDatabase as createDatabaseApi,
  updateDatabase as updateDatabaseApi,
  deleteDatabase as deleteDatabaseApi,
} from "../services/databaseService";

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {
  const [databases, setDatabases] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const loadDatabases = async () => {
    const token = localStorage.getItem("token");

    // Don't call backend if user is not logged in
    if (!token) {
      setDatabases([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await fetchDatabases();

      if (response.data.success) {
        setDatabases(response.data.databases);
      }
    } catch (error) {
      console.error(
        "Failed to load databases:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Run again when route changes after login
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadDatabases();
    }
  }, [location.pathname]);

  const createDatabase = async (database) => {
    try {
      const response = await createDatabaseApi(database);

      if (response.data.success) {
        setDatabases((prev) => [
          response.data.database,
          ...prev,
        ]);
      }

      return response.data;
    } catch (error) {
      console.error("Failed to create database:", error);
      throw error;
    }
  };

  const updateDatabase = async (id, database) => {
    try {
      const response = await updateDatabaseApi(id, database);

      if (response.data.success) {
        setDatabases((prev) =>
          prev.map((db) =>
            db.id === id
              ? response.data.database
              : db
          )
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to update database:", error);
      throw error;
    }
  };

  const deleteDatabase = async (id) => {
    try {
      const response = await deleteDatabaseApi(id);

      if (response.data.success) {
        setDatabases((prev) =>
          prev.filter((db) => db.id !== id)
        );
      }

      return response.data;
    } catch (error) {
      console.error("Failed to delete database:", error);
      throw error;
    }
  };

  return (
    <DatabaseContext.Provider
      value={{
        databases,
        loading,
        loadDatabases,
        createDatabase,
        updateDatabase,
        deleteDatabase,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  return useContext(DatabaseContext);
}