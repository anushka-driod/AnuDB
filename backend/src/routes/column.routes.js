const express = require("express");
const router = express.Router();

const columnController = require("../controllers/column.controller");
const authenticateToken = require("../middleware/auth.middleware");

// Create Column
router.post(
    "/",
    authenticateToken,
    columnController.createColumn
);

// Get Columns by Table ID
router.get(
    "/:tableId",
    authenticateToken,
    columnController.getColumns
);

// Update Column
router.put(
    "/:id",
    authenticateToken,
    columnController.updateColumn
);

// Delete Column
router.delete(
    "/:id",
    authenticateToken,
    columnController.deleteColumn
);

module.exports = router;