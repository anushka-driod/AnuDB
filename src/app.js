const express = require("express");

const authRoutes = require("./routes/auth.routes");
const databaseRoutes = require("./routes/database.routes");

const app = express();

// Middleware
app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to AnuDB Backend 🚀"
    });
});

// Health Check Route
app.get("/check", (req, res) => {
    res.json({
        message: "App is working"
    });
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Database Routes
app.use("/api/databases", databaseRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;