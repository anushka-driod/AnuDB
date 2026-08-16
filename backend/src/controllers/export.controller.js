const exportService = require("../services/export.service");

// CSV Export
async function exportCSV(req, res) {

    try {

        const { tableId } = req.params;

        const filePath = await exportService.exportTableToCSV(tableId);

        res.download(filePath);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

// Excel Export
async function exportExcel(req, res) {
    try {

        const { tableId } = req.params;

        const filePath = await exportService.exportTableToExcel(tableId);

        return res.download(
            filePath,
            `table_${tableId}.xlsx`
        );

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    exportCSV,
    exportExcel
};