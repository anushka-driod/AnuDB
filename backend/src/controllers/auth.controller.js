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

module.exports = {
    register
};