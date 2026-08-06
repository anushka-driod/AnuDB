const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authenticateToken = require("../middleware/auth.middleware");


router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/test", (req, res) => {
    res.json({
        message: "Welcome to AnuDB Backend 🚀"
    });
});

router.get(
    "/profile",
    authenticateToken,
    authController.profile
);

module.exports = router;