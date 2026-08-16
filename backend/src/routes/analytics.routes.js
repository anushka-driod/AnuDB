const express = require("express");

const router = express.Router();

const analyticsController =
    require("../controllers/analytics.controller");

const authenticateToken =
    require("../middleware/auth.middleware");

router.get(
    "/",
    authenticateToken,
    analyticsController.getAnalytics
);

module.exports = router;