const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userModel = require("../models/user.model");


// ===============================
// Register User
// ===============================
async function registerUser(
    fullName,
    email,
    password
) {

    const existingUser =
        await userModel.findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword =
        await bcrypt.hash(password, 10);

    const user =
        await userModel.createUser(
            fullName,
            email,
            hashedPassword
        );

    return user;
}


// ===============================
// Login User
// ===============================
async function loginUser(
    email,
    password
) {

    const user =
        await userModel.findUserByEmail(email);

    if (!user) {
        throw new Error(
            "Invalid email or password"
        );
    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {
        throw new Error(
            "Invalid email or password"
        );
    }

    const token =
        jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

    return {
        token,

        user: {
            id: user.id,
            full_name: user.full_name,
            email: user.email,
            phone: user.phone || ""
        }
    };
}


// ===============================
// Update Profile
// ===============================
async function updateProfile(
    userId,
    fullName,
    phone
) {

    const user =
        await userModel.updateProfile(
            userId,
            fullName,
            phone
        );

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    return user;
}


// ===============================
// Change Password
// ===============================
async function changePassword(
    userId,
    currentPassword,
    newPassword
) {

    const user =
        await userModel.findUserById(
            userId
        );

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    const isMatch =
        await bcrypt.compare(
            currentPassword,
            user.password
        );

    if (!isMatch) {
        throw new Error(
            "Current password is incorrect"
        );
    }

    if (
        currentPassword ===
        newPassword
    ) {
        throw new Error(
            "New password must be different from current password"
        );
    }

    const hashedPassword =
        await bcrypt.hash(
            newPassword,
            10
        );

    await userModel.updatePassword(
        userId,
        hashedPassword
    );

    return true;
}


// ===============================
// Export
// ===============================
// ===============================
// Get Profile
// ===============================
async function getProfile(userId) {

    const user =
        await userModel.findUserById(
            userId
        );

    if (!user) {
        throw new Error(
            "User not found"
        );
    }

    return {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone || ""
    };
}
// ===============================
// Delete Account
// ===============================
async function deleteAccount(userId) {

    const user =
        await userModel.deleteUser(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return true;
}
module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount
};