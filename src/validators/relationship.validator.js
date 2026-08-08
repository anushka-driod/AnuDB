const db = require("../database/db");

async function validateRelationship(
    sourceTableId,
    sourceColumnId,
    targetTableId,
    targetColumnId
) {

    // Source table
    const sourceTable = await db.query(
        "SELECT * FROM tables WHERE id = $1",
        [sourceTableId]
    );

    if (sourceTable.rows.length === 0) {
        throw new Error("Source table not found");
    }

    // Target table
    const targetTable = await db.query(
        "SELECT * FROM tables WHERE id = $1",
        [targetTableId]
    );

    if (targetTable.rows.length === 0) {
        throw new Error("Target table not found");
    }

    // Source column
    const sourceColumn = await db.query(
        "SELECT * FROM columns WHERE id = $1 AND table_id = $2",
        [sourceColumnId, sourceTableId]
    );

    if (sourceColumn.rows.length === 0) {
        throw new Error("Source column not found");
    }

    // Target column
    const targetColumn = await db.query(
        "SELECT * FROM columns WHERE id = $1 AND table_id = $2",
        [targetColumnId, targetTableId]
    );

    if (targetColumn.rows.length === 0) {
        throw new Error("Target column not found");
    }

}

module.exports = {
    validateRelationship
};