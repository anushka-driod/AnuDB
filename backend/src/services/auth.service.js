const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

async function registerUser(fullName, email, password) {

    const existingUser = await userModel.findUserByEmail(email);

    if (existingUser) {
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.createUser(
        fullName,
        email,
        hashedPassword
    );

    return user;
}

module.exports = {
    registerUser
};