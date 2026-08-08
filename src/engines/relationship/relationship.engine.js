const db = require("../../database/db");

async function getRelationships(tableId) {
    const result = await db.query(
        `SELECT *
         FROM relationships
         WHERE source_table_id = $1`,
        [tableId]
    );

    return result.rows;
}

module.exports = {
    getRelationships
};