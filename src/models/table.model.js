const db = require("../database/db");

async function createTable(databaseId, tableName) {
    const result = await db.query(
        `INSERT INTO tables(database_id, table_name)
         VALUES($1, $2)
         RETURNING *`,
        [databaseId, tableName]
    );

    return result.rows[0];
}

async function getTables(databaseId) {
    const result = await db.query(
        `SELECT *
         FROM tables
         WHERE database_id = $1
         ORDER BY created_at DESC`,
        [databaseId]
    );

    return result.rows;
}

async function updateTable(id, tableName) {
    const result = await db.query(
        `UPDATE tables
         SET table_name = $1
         WHERE id = $2
         RETURNING *`,
        [tableName, id]
    );

    return result.rows[0];
}

async function deleteTable(id) {
    const result = await db.query(
        `DELETE FROM tables
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    createTable,
    getTables,
    updateTable,
    deleteTable
};