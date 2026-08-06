const express = require("express");
const router = express.Router();

const databaseController = require("../controllers/database.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.post(
    "/",
    authenticateToken,
    databaseController.createDatabase
);

router.get(
    "/",
    authenticateToken,
    databaseController.getDatabases
);

module.exports = router;