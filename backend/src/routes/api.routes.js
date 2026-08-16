const express = require("express");

const router = express.Router();

const apiController = require("../controllers/api.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.post(
    "/",
    authenticateToken,
    apiController.createApi
);

router.get(
    "/",
    authenticateToken,
    apiController.getApis
);
router.get(
    "/table/:tableId",
    apiController.executeGetApi
);
router.delete(
    "/:id",
    authenticateToken,
    apiController.deleteApi
);

module.exports = router;