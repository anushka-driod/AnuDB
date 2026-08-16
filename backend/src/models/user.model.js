const db = require("../database/db");


// ===============================
// Find User By Email
// ===============================
async function findUserByEmail(email) {

    const result = await db.query(
        `SELECT *
         FROM users
         WHERE email = $1`,
        [email]
    );

    return result.rows[0];
}


// ===============================
// Create User
// ===============================
async function createUser(
    fullName,
    email,
    password
) {

    const result = await db.query(
        `INSERT INTO users
         (full_name, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, full_name, email, phone`,
        [
            fullName,
            email,
            password
        ]
    );

    return result.rows[0];
}


// ===============================
// Update Profile
// ===============================
async function updateProfile(
    userId,
    fullName,
    phone
) {

    const result = await db.query(
        `UPDATE users
         SET full_name = $1,
             phone = $2
         WHERE id = $3
         RETURNING id, full_name, email, phone`,
        [
            fullName,
            phone,
            userId
        ]
    );

    return result.rows[0];
}


module.exports = {
    findUserByEmail,
    createUser,
    updateProfile
};