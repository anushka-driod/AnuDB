const recordService = require("../services/record.service");

// Create Record
async function createRecord(req, res) {
    try {

        const { tableId, values } = req.body;

        if (!tableId || !values || !Array.isArray(values)) {
            return res.status(400).json({
                success: false,
                message: "tableId and values are required"
            });
        }

        const record = await recordService.createRecord(
            tableId,
            values
        );

        res.status(201).json({
            success: true,
            message: "Record created successfully",
            record
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

// Update Record
async function updateRecord(req, res) {

    try {

        const { id } = req.params;
        const { values } = req.body;

        if (!values || !Array.isArray(values)) {
            return res.status(400).json({
                success: false,
                message: "values are required"
            });
        }

        const record = await recordService.updateRecord(
            id,
            values
        );

        res.status(200).json({
            success: true,
            message: "Record updated successfully",
            record
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

// Get Records
async function getRecords(req, res) {

    try {

        const { tableId } = req.params;

        const records = await recordService.getRecords(
            tableId,
            req.query
        );

        res.status(200).json({
            success: true,
            records
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

// Delete Record
async function deleteRecord(req, res) {

    try {

        const { id } = req.params;

        const record = await recordService.deleteRecord(id);

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Record deleted successfully"
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
    createRecord,
    updateRecord,
    getRecords,
    deleteRecord
};