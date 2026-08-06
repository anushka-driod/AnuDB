import { createContext, useContext, useState } from "react";

const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {

  const [databases, setDatabases] = useState([
    {
      id: 1,
      name: "School",
      tables: 12,
      storage: "2.4 GB",
      status: "Active",
    },
    {
      id: 2,
      name: "Hospital",
      tables: 21,
      storage: "8.1 GB",
      status: "Active",
    },
    {
      id: 3,
      name: "CRM",
      tables: 6,
      storage: "620 MB",
      status: "Pending",
    },
  ]);

  const createDatabase = (database) => {
    setDatabases((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...database,
      },
    ]);
  };

  return (
    <DatabaseContext.Provider
      value={{
        databases,
        createDatabase,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  return useContext(DatabaseContext);
}