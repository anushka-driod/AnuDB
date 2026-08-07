const db = require("../database/db");

async function createDatabase(name, description, ownerId) {
    const result = await db.query(
        `INSERT INTO databases(name, description, owner_id)
         VALUES($1, $2, $3)
         RETURNING *`,
        [name, description, ownerId]
    );

    return result.rows[0];
}

async function getDatabases(ownerId) {
    const result = await db.query(
        `SELECT *
         FROM databases
         WHERE owner_id = $1
         ORDER BY created_at DESC`,
        [ownerId]
    );

    return result.rows;
}

async function updateDatabase(id, name, description, ownerId) {
    const result = await db.query(
        `UPDATE databases
         SET name = $1,
             description = $2
         WHERE id = $3
         AND owner_id = $4
         RETURNING *`,
        [name, description, id, ownerId]
    );

    return result.rows[0];
}

async function deleteDatabase(id, ownerId) {
    const result = await db.query(
        `DELETE FROM databases
         WHERE id = $1
         AND owner_id = $2
         RETURNING *`,
        [id, ownerId]
    );

    return result.rows[0];
}

module.exports = {
    createDatabase,
    getDatabases,
    updateDatabase,
    deleteDatabase
};