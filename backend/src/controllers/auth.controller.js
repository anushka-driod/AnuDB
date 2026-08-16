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

    try {

        const user =
            await authService.getProfile(
                req.user.id
            );

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user
        });

    } catch (error) {

        console.error(
            "Profile error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}
async function updateProfile(req, res) {

    try {

        const { fullName, phone } = req.body;

        if (!fullName) {
            return res.status(400).json({
                success: false,
                message: "Full name is required"
            });
        }

        const user =
            await authService.updateProfile(
                req.user.id,
                fullName,
                phone || null
            );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

// ===============================
// Change Password
// ===============================
async function changePassword(req, res) {

    try {

        const {
            currentPassword,
            newPassword
        } = req.body;

        if (!currentPassword || !newPassword) {

            return res.status(400).json({
                success: false,
                message:
                    "Current password and new password are required"
            });

        }

        if (newPassword.length < 6) {

            return res.status(400).json({
                success: false,
                message:
                    "New password must be at least 6 characters"
            });

        }

        await authService.changePassword(
            req.user.id,
            currentPassword,
            newPassword
        );

        res.status(200).json({
            success: true,
            message:
                "Password changed successfully"
        });

    } catch (error) {

        console.error(
            "Change password error:",
            error
        );

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}
// ===============================
// Delete Account
// ===============================
async function deleteAccount(req, res) {

    try {

        await authService.deleteAccount(
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });

    } catch (error) {

        console.error(
            "Delete account error:",
            error
        );

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}
module.exports = {
    register,
    login,
    profile,
    updateProfile,
    changePassword,
    deleteAccount
};