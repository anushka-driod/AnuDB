const db = require("../database/db");

async function recordApiUsage(apiId) {

    await db.query(
        `INSERT INTO api_usage (api_id)
         VALUES ($1)`,
        [apiId]
    );

}


async function getApiUsage(apiId) {

    const result = await db.query(
        `SELECT
            DATE(called_at) AS day,
            COUNT(*)::int AS requests
         FROM api_usage
         WHERE api_id = $1
         GROUP BY DATE(called_at)
         ORDER BY DATE(called_at)`,
        [apiId]
    );

    return result.rows;

}


async function getTotalApiUsage() {

    const result = await db.query(
        `SELECT COUNT(*)::int AS count
         FROM api_usage`
    );

    return result.rows[0].count;

}


module.exports = {
    recordApiUsage,
    getApiUsage,
    getTotalApiUsage
};