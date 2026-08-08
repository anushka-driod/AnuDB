const fs = require("fs");
const db = require("../database/db");
const importExportEngine = require("../engines/importExport/importExport.engine");
const recordService = require("./record.service");

// CSV Import
async function importCSV(filePath, tableId) {

    const records = await importExportEngine.readCSV(filePath);

    const columnsResult = await db.query(
        `SELECT id, column_name
         FROM columns
         WHERE table_id = $1`,
        [tableId]
    );

    const columns = columnsResult.rows;

    for (const record of records) {

        const values = [];

        for (const column of columns) {

            let value = record[column.column_name];

            if (value !== undefined && value !== "") {

                if (!isNaN(value)) {
                    value = Number(value);
                }

                values.push({
                    columnId: column.id,
                    value
                });

            }

        }

        await recordService.createRecord(
            tableId,
            values
        );

    }

    fs.unlinkSync(filePath);

    return {
        success: true,
        message: `${records.length} records imported successfully`
    };

}

// Excel Import
async function importExcel(filePath, tableId) {

    const records = await importExportEngine.readExcel(filePath);

    const columnsResult = await db.query(
        `SELECT id, column_name
         FROM columns
         WHERE table_id = $1`,
        [tableId]
    );

    const columns = columnsResult.rows;

    for (const record of records) {

        const values = [];

        for (const column of columns) {

            let value = record[column.column_name];

            if (value !== undefined && value !== "") {

                if (typeof value !== "number" && !isNaN(value)) {
                    value = Number(value);
                }

                values.push({
                    columnId: column.id,
                    value
                });

            }

        }

        await recordService.createRecord(
            tableId,
            values
        );

    }

    fs.unlinkSync(filePath);

    return {
        success: true,
        message: `${records.length} records imported successfully`
    };

}

module.exports = {
    importCSV,
    importExcel
};