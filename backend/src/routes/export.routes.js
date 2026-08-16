const express = require("express");
const router = express.Router();

const exportController = require("../controllers/export.controller");
const authenticateToken = require("../middleware/auth.middleware");

// CSV Export
router.get(
    "/csv/:tableId",
    authenticateToken,
    exportController.exportCSV
);

// Excel Export
router.get(
    "/excel/:tableId",
    authenticateToken,
    exportController.exportExcel
);

module.exports = router;