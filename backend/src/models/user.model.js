const db = require("../database/db");

async function findUserByEmail(email) {
    const result = await db.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
}

async function createUser(fullName, email, password) {
    const result = await db.query(
        `INSERT INTO users(full_name,email,password)
         VALUES($1,$2,$3)
         RETURNING id, full_name, email`,
        [fullName, email, password]
    );

    return result.rows[0];
}

module.exports = {
    findUserByEmail,
    createUser
};