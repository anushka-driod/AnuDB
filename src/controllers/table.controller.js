const tableService = require("../services/table.service");

async function createTable(req, res) {
    try {
        console.log("Request Body:", req.body);

        const { databaseId, tableName } = req.body;

        console.log("databaseId =", databaseId);
        console.log("tableName =", tableName);

        const table = await tableService.createTable(
            databaseId,
            tableName
        );

        res.status(201).json({
            success: true,
            message: "Table created successfully",
            table
        });

    } catch (error) {
        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function getTables(req, res) {
    try {
        const { databaseId } = req.params;

        const tables = await tableService.getTables(databaseId);

        res.status(200).json({
            success: true,
            tables
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function updateTable(req, res) {
    try {
        const { id } = req.params;
        const { tableName } = req.body;

        const table = await tableService.updateTable(
            id,
            tableName
        );

        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Table updated successfully",
            table
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteTable(req, res) {
    try {
        const { id } = req.params;

        const table = await tableService.deleteTable(id);

        if (!table) {
            return res.status(404).json({
                success: false,
                message: "Table not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Table deleted successfully",
            table
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createTable,
    getTables,
    updateTable,
    deleteTable
};