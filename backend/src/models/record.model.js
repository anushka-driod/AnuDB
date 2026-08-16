const db = require("../database/db");

// Create Record using transaction client
async function createRecordWithClient(client, tableId) {
    const result = await client.query(
        `INSERT INTO records(table_id)
         VALUES($1)
         RETURNING *`,
        [tableId]
    );

    return result.rows[0];
}

// Get all records with their values
async function getRecords(tableId) {
    const result = await db.query(
        `SELECT
            r.id AS record_id,
            rv.column_id,
            c.column_name,
            rv.value
         FROM records r
         JOIN record_values rv
            ON r.id = rv.record_id
         JOIN columns c
            ON rv.column_id = c.id
         WHERE r.table_id = $1
         ORDER BY r.id, c.id`,
        [tableId]
    );

    return result.rows;
}

// Delete Record
async function deleteRecord(recordId) {
    const result = await db.query(
        `DELETE FROM records
         WHERE id = $1
         RETURNING *`,
        [recordId]
    );

    return result.rows[0];
}

module.exports = {
    createRecordWithClient,
    getRecords,
    deleteRecord
};