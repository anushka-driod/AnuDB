const express = require("express");
const router = express.Router();

const recordController = require("../controllers/record.controller");
const authenticateToken = require("../middleware/auth.middleware");

// Create Record
router.post(
    "/",
    authenticateToken,
    recordController.createRecord
);

// Get Records
router.get(
    "/:tableId",
    authenticateToken,
    recordController.getRecords
);

// Update Record
router.put(
    "/:id",
    authenticateToken,
    recordController.updateRecord
);

// Delete Record
router.delete(
    "/:id",
    authenticateToken,
    recordController.deleteRecord
);

module.exports = router;