const importExportEngine = require("../engines/importExport/importExport.engine");
const importService = require("../services/import.service");

// ===============================
// CSV Preview
// ===============================
async function importCSV(req, res) {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "CSV file is required"
            });
        }

        const records = await importExportEngine.readCSV(req.file.path);

        return res.json({
            success: true,
            message: "CSV read successfully",
            totalRecords: records.length,
            records
        });

    } catch (error) {

        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

// ===============================
// CSV Import
// ===============================
async function saveCSV(req, res) {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "CSV file is required"
            });
        }

        console.log("========== CSV IMPORT ==========");
        console.log("req.body =", req.body);
        console.log("req.file =", req.file);
        console.log("tableId =", req.body.tableId);
        console.log("typeof tableId =", typeof req.body.tableId);
        console.log("================================");

        const tableId = Number(req.body.tableId);

        const result = await importService.importCSV(
            req.file.path,
            tableId
        );

        return res.json(result);

    } catch (error) {

        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

// ===============================
// Excel Preview
// ===============================
async function importExcel(req, res) {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Excel file is required"
            });
        }

        const records = await importExportEngine.readExcel(req.file.path);

        return res.json({
            success: true,
            message: "Excel read successfully",
            totalRecords: records.length,
            records
        });

    } catch (error) {

        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

// ===============================
// Excel Import
// ===============================
async function saveExcel(req, res) {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Excel file is required"
            });
        }

        console.log("========== EXCEL IMPORT ==========");
        console.log("req.body =", req.body);
        console.log("req.file =", req.file);
        console.log("tableId =", req.body.tableId);
        console.log("typeof tableId =", typeof req.body.tableId);
        console.log("==================================");

        const tableId = Number(req.body.tableId);

        const result = await importService.importExcel(
            req.file.path,
            tableId
        );

        return res.json(result);

    } catch (error) {

        console.error(error);

        return res.status(400).json({
            success: false,
            message: error.message
        });

    }
}

module.exports = {
    importCSV,
    saveCSV,
    importExcel,
    saveExcel
};