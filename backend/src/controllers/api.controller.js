const db = require("../database/db");
const apiService = require("../services/api.service");
const recordService = require("../services/record.service");


// ===============================
// Create API
// ===============================
async function createApi(req, res) {

    try {

        const { name, tableId, method } = req.body;

        if (!name || !tableId || !method) {
            return res.status(400).json({
                success: false,
                message: "name, tableId and method are required"
            });
        }

        const api = await apiService.createApi(
            name,
            tableId,
            method
        );

        res.status(201).json({
            success: true,
            message: "API generated successfully",
            api
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
}


// ===============================
// Get APIs
// ===============================
async function getApis(req, res) {

    try {

        const apis = await apiService.getApis();

        res.status(200).json({
            success: true,
            apis
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


// ===============================
// Execute GET API
// ===============================
async function executeGetApi(req, res) {

    try {

        const { tableId } = req.params;

        // Find generated GET API for this table
        const apiResult = await db.query(
            `SELECT id
             FROM api_endpoints
             WHERE table_id = $1
               AND method = 'GET'
             ORDER BY created_at DESC
             LIMIT 1`,
            [tableId]
        );

        if (apiResult.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "GET API not found for this table"
            });

        }

        const apiId = apiResult.rows[0].id;

        // Get records using existing record system
        const records = await recordService.getRecords(
            tableId,
            req.query
        );

        // Record API usage
        await db.query(
            `INSERT INTO api_usage
             (api_id, called_at)
             VALUES ($1, CURRENT_TIMESTAMP)`,
            [apiId]
        );

        res.status(200).json({
            success: true,
            records
        });

    } catch (error) {

        console.error(
            "GET API execution error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


// ===============================
// Delete API
// ===============================
async function deleteApi(req, res) {

    try {

        const { id } = req.params;

        const api = await apiService.deleteApi(id);

        if (!api) {

            return res.status(404).json({
                success: false,
                message: "API not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "API deleted successfully",
            api
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}


module.exports = {
    createApi,
    getApis,
    executeGetApi,
    deleteApi
};