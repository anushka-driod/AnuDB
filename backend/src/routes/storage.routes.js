const express = require("express");
const router = express.Router();

const storageController =
    require("../controllers/storage.controller");

const authenticateToken =
    require("../middleware/auth.middleware");


router.get(
    "/files",
    authenticateToken,
    storageController.getFiles
);


router.get(
    "/download/:fileName",
    authenticateToken,
    storageController.downloadFile
);

router.get(
    "/stats",
    authenticateToken,
    storageController.getStats
);

router.delete(
    "/files/:fileName",
    authenticateToken,
    storageController.deleteFile
);


module.exports = router;