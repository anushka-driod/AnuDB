const express = require("express");
const router = express.Router();

const tableController = require("../controllers/table.controller");
const authenticateToken = require("../middleware/auth.middleware");

// Create Table
router.post(
    "/",
    authenticateToken,
    tableController.createTable
);

// Get Tables by Database ID
router.get(
    "/:databaseId",
    authenticateToken,
    tableController.getTables
);

// Update Table
router.put(
    "/:id",
    authenticateToken,
    tableController.updateTable
);

// Delete Table
router.delete(
    "/:id",
    authenticateToken,
    tableController.deleteTable
);

module.exports = router;