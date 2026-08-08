const express = require("express");
const router = express.Router();

const importController = require("../controllers/import.controller");
const authenticateToken = require("../middleware/auth.middleware");
const upload = require("../config/multer");

// CSV Preview
router.post(
    "/csv",
    authenticateToken,
    upload.single("file"),
    importController.importCSV
);

// CSV Import
router.post(
    "/csv/save",
    authenticateToken,
    upload.single("file"),
    importController.saveCSV
);

// Excel Preview
router.post(
    "/excel",
    authenticateToken,
    upload.single("file"),
    importController.importExcel
);

// Excel Import
router.post(
    "/excel/save",
    authenticateToken,
    upload.single("file"),
    importController.saveExcel
);

module.exports = router;