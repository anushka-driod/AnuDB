const express = require("express");

const authRoutes = require("./routes/auth.routes");
const databaseRoutes = require("./routes/database.routes");
const tableRoutes = require("./routes/table.routes");
const columnRoutes = require("./routes/column.routes");
const recordRoutes = require("./routes/record.routes");

const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to AnuDB Backend 🚀"
    });
});

// Health Check
app.get("/check", (req, res) => {
    res.json({
        message: "App is working"
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/databases", databaseRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/columns", columnRoutes);
app.use("/api/records", recordRoutes);

module.exports = app;