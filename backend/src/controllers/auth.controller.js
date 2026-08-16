const authService = require("../services/auth.service");

async function register(req, res) {
    try {
        const { fullName, email, password } = req.body;

        const user = await authService.registerUser(
            fullName,
            email,
            password
        );

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await authService.loginUser(
            email,
            password
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function profile(req, res) {

    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        user: req.user
    });

}

module.exports = {
    register,
    login,
    profile
};