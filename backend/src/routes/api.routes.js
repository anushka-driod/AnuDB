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

router.delete(
    "/:id",
    authenticateToken,
    apiController.deleteApi
);
router.get(
    "/table/:tableId",
    authenticateToken,
    apiController.executeTableApi
);

module.exports = router;