const db = require("../database/db");

async function createRecordValue(client, recordId, columnId, value) {
    const result = await client.query(
        `INSERT INTO record_values(record_id, column_id, value)
         VALUES ($1, $2, $3::jsonb)
         RETURNING *`,
        [
            recordId,
            columnId,
            JSON.stringify(value)
        ]
    );

    return result.rows[0];
}

async function updateRecordValue(client, recordId, columnId, value) {
    const result = await client.query(
        `UPDATE record_values
         SET value = $1::jsonb
         WHERE record_id = $2
         AND column_id = $3
         RETURNING *`,
        [
            JSON.stringify(value),
            recordId,
            columnId
        ]
    );

    return result.rows[0];
}

async function getRecordValues(recordId) {
    const result = await db.query(
        `SELECT
            rv.id,
            rv.column_id,
            c.column_name,
            rv.value
         FROM record_values rv
         JOIN columns c
            ON rv.column_id = c.id
         WHERE rv.record_id = $1
         ORDER BY c.id`,
        [recordId]
    );

    return result.rows;
}

module.exports = {
    createRecordValue,
    updateRecordValue,
    getRecordValues
};