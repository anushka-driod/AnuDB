const db = require("../database/db");


// ===============================
// Get Analytics
// ===============================
async function getAnalytics(req, res) {

    try {

        const ownerId = req.user.id;


        // ===============================
        // Total Databases
        // ===============================
        const databaseResult = await db.query(
            `SELECT COUNT(*)::int AS count
             FROM databases
             WHERE owner_id = $1`,
            [ownerId]
        );


        // ===============================
        // Total Tables
        // ===============================
        const tableResult = await db.query(
            `SELECT COUNT(*)::int AS count
             FROM tables t
             INNER JOIN databases d
                ON d.id = t.database_id
             WHERE d.owner_id = $1`,
            [ownerId]
        );


        // ===============================
        // Total Records
        // ===============================
        const recordResult = await db.query(
            `SELECT COUNT(*)::int AS count
             FROM records r
             INNER JOIN tables t
                ON t.id = r.table_id
             INNER JOIN databases d
                ON d.id = t.database_id
             WHERE d.owner_id = $1`,
            [ownerId]
        );


        // ===============================
        // Database Growth
        // ===============================
        const growthResult = await db.query(
            `SELECT
                TO_CHAR(
                    DATE_TRUNC('month', created_at),
                    'Mon'
                ) AS month,
                COUNT(*)::int AS databases
             FROM databases
             WHERE owner_id = $1
             GROUP BY DATE_TRUNC('month', created_at)
             ORDER BY DATE_TRUNC('month', created_at)`,
            [ownerId]
        );

        // ===============================
// API Usage
// ===============================
const apiUsageResult = await db.query(
    `
    SELECT
        TO_CHAR(
            DATE_TRUNC('day', au.called_at),
            'Dy'
        ) AS day,
        COUNT(*)::int AS requests
    FROM api_usage au

    INNER JOIN api_endpoints ae
        ON ae.id = au.api_id

    INNER JOIN tables t
        ON t.id = ae.table_id

    INNER JOIN databases d
        ON d.id = t.database_id

    WHERE d.owner_id = $1
      AND au.called_at >= CURRENT_DATE - INTERVAL '6 days'

    GROUP BY DATE_TRUNC('day', au.called_at)

    ORDER BY DATE_TRUNC('day', au.called_at)
    `,
    [ownerId]
);

// ===============================
// Total API Calls
// ===============================
const apiTotalResult = await db.query(
    `
    SELECT COUNT(*)::int AS count
    FROM api_usage au

    INNER JOIN api_endpoints ae
        ON ae.id = au.api_id

    INNER JOIN tables t
        ON t.id = ae.table_id

    INNER JOIN databases d
        ON d.id = t.database_id

    WHERE d.owner_id = $1
    `,
    [ownerId]
);
        // ===============================
        // Top Databases
        // ===============================
        const topDatabaseResult = await db.query(
            `SELECT
                d.id,
                d.name,
                COUNT(DISTINCT t.id)::int AS tables,
                COUNT(DISTINCT r.id)::int AS records
             FROM databases d

             LEFT JOIN tables t
                ON t.database_id = d.id

             LEFT JOIN records r
                ON r.table_id = t.id

             WHERE d.owner_id = $1

             GROUP BY d.id, d.name

             ORDER BY records DESC, tables DESC, d.name

             LIMIT 5`,
            [ownerId]
        );

// ===============================
// Recent Activity
// ===============================
const recentActivityResult = await db.query(
    `
    SELECT *
    FROM (

        SELECT
            d.created_at AS activity_time,
            'database' AS activity_type,
            'Created Database ''' || d.name || '''' AS message
        FROM databases d
        WHERE d.owner_id = $1

        UNION ALL

        SELECT
            t.created_at AS activity_time,
            'table' AS activity_type,
            'Created Table ''' || t.table_name || '''' AS message
        FROM tables t
        INNER JOIN databases d
            ON d.id = t.database_id
        WHERE d.owner_id = $1

        UNION ALL

        SELECT
            r.created_at AS activity_time,
            'record' AS activity_type,
            'Added Record to ''' || t.table_name || '''' AS message
        FROM records r
        INNER JOIN tables t
            ON t.id = r.table_id
        INNER JOIN databases d
            ON d.id = t.database_id
        WHERE d.owner_id = $1

        UNION ALL

        SELECT
            ae.created_at AS activity_time,
            'api' AS activity_type,
            'Generated API ''' || ae.name || '''' AS message
        FROM api_endpoints ae
        INNER JOIN tables t
            ON t.id = ae.table_id
        INNER JOIN databases d
            ON d.id = t.database_id
        WHERE d.owner_id = $1

    ) activities

    ORDER BY activity_time DESC
    LIMIT 5
    `,
    [ownerId]
);
        res.json({

            success: true,

            cards: {

                databases:
                    databaseResult.rows[0].count,

                tables:
                    tableResult.rows[0].count,

                records:
                    recordResult.rows[0].count,
                    apiCalls:
    apiTotalResult.rows[0].count


            },

            databaseGrowth:
                growthResult.rows,

          topDatabases:
    topDatabaseResult.rows,

recentActivity:
    recentActivityResult.rows,

    apiUsage:
    apiUsageResult.rows
        });

    } catch (error) {

        console.error(
            "Analytics error:",
            error
        );

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}


module.exports = {
    getAnalytics
};