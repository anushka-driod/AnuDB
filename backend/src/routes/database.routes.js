const express = require("express");
const router = express.Router();

const databaseController = require("../controllers/database.controller");
const authenticateToken = require("../middleware/auth.middleware");

// Create Database
router.post(
    "/",
    authenticateToken,
    databaseController.createDatabase
);

// Get All Databases
router.get(
    "/",
    authenticateToken,
    databaseController.getDatabases
);

// Update Database
router.put(
    "/:id",
    authenticateToken,
    databaseController.updateDatabase
);

// Delete Database
router.delete(
    "/:id",
    authenticateToken,
    databaseController.deleteDatabase
);

module.exports = router;