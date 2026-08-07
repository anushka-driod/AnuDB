const db = require("../database/db");

async function createColumn(tableId, columnName, dataType, isRequired) {
    const result = await db.query(
        `INSERT INTO columns(table_id, column_name, data_type, is_required)
         VALUES($1, $2, $3, $4)
         RETURNING *`,
        [tableId, columnName, dataType, isRequired]
    );

    return result.rows[0];
}

async function getColumns(tableId) {
    const result = await db.query(
        `SELECT *
         FROM columns
         WHERE table_id = $1
         ORDER BY id ASC`,
        [tableId]
    );

    return result.rows;
}

async function updateColumn(id, columnName, dataType, isRequired) {
    const result = await db.query(
        `UPDATE columns
         SET column_name = $1,
             data_type = $2,
             is_required = $3
         WHERE id = $4
         RETURNING *`,
        [columnName, dataType, isRequired, id]
    );

    return result.rows[0];
}

async function deleteColumn(id) {
    const result = await db.query(
        `DELETE FROM columns
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    createColumn,
    getColumns,
    updateColumn,
    deleteColumn
};