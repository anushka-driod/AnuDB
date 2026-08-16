const columnService = require("../services/column.service");

async function createColumn(req, res) {
    try {
        const { tableId, columnName, dataType, isRequired } = req.body;

        const column = await columnService.createColumn(
            tableId,
            columnName,
            dataType,
            isRequired
        );

        res.status(201).json({
            success: true,
            message: "Column created successfully",
            column
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function getColumns(req, res) {
    try {
        const { tableId } = req.params;

        const columns = await columnService.getColumns(tableId);

        res.status(200).json({
            success: true,
            columns
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function updateColumn(req, res) {
    try {
        const { id } = req.params;
        const { columnName, dataType, isRequired } = req.body;

        const column = await columnService.updateColumn(
            id,
            columnName,
            dataType,
            isRequired
        );

        if (!column) {
            return res.status(404).json({
                success: false,
                message: "Column not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Column updated successfully",
            column
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteColumn(req, res) {
    try {
        const { id } = req.params;

        const column = await columnService.deleteColumn(id);

        if (!column) {
            return res.status(404).json({
                success: false,
                message: "Column not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Column deleted successfully",
            column
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createColumn,
    getColumns,
    updateColumn,
    deleteColumn
};