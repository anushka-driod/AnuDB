const recordService = require("./record.service");
const importExportEngine = require("../engines/importExport/importExport.engine");

// CSV Export
async function exportTableToCSV(tableId) {

    let records = await recordService.getRecords(
        tableId,
        {}
    );

    if (records.length === 0) {
        throw new Error("No records found");
    }

    // Remove relationship metadata
    records = records.map(({ relationships, ...record }) => record);

    const headers = Object.keys(records[0]).map(key => ({
        id: key,
        title: key
    }));

    return await importExportEngine.exportToCSV(
        `table_${tableId}.csv`,
        headers,
        records
    );
}

// Excel Export
async function exportTableToExcel(tableId) {

    let records = await recordService.getRecords(
        tableId,
        {}
    );

    if (records.length === 0) {
        throw new Error("No records found");
    }

    // Remove relationship metadata
    records = records.map(({ relationships, ...record }) => record);

    return await importExportEngine.exportToExcel(
       `table_${tableId}_${Date.now()}.xlsx`,
        records
    );
}

module.exports = {
    exportTableToCSV,
    exportTableToExcel
};