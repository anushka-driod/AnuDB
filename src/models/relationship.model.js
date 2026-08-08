const db = require("../database/db");

// Create Relationship
async function createRelationship(
    sourceTableId,
    sourceColumnId,
    targetTableId,
    targetColumnId,
    relationshipType
) {
    const result = await db.query(
        `INSERT INTO relationships
        (
            source_table_id,
            source_column_id,
            target_table_id,
            target_column_id,
            relationship_type
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [
            sourceTableId,
            sourceColumnId,
            targetTableId,
            targetColumnId,
            relationshipType
        ]
    );

    return result.rows[0];
}

// Get Relationships
async function getRelationships() {
    const result = await db.query(
        `SELECT * FROM relationships
         ORDER BY id`
    );

    return result.rows;
}

// Delete Relationship
async function deleteRelationship(id) {
    const result = await db.query(
        `DELETE FROM relationships
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    createRelationship,
    getRelationships,
    deleteRelationship
};