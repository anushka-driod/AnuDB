const db = require("../database/db");

async function createApi(name, tableId, method) {
    
const endpoint = `/api/apis/table/${tableId}`;

    const result = await db.query(
        `INSERT INTO api_endpoints
        (name, table_id, endpoint, method)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            name,
            tableId,
            endpoint,
            method
        ]
    );

    return result.rows[0];
}

async function getApis() {

    const result = await db.query(
        `SELECT
            a.*,
            t.table_name
         FROM api_endpoints a
         JOIN tables t
            ON a.table_id = t.id
         ORDER BY a.created_at DESC`
    );

    return result.rows;
}

async function deleteApi(id) {

    const result = await db.query(
        `DELETE FROM api_endpoints
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
}

module.exports = {
    createApi,
    getApis,
    deleteApi
};