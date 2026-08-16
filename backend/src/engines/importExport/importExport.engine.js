const path = require("path");
const XLSX = require("xlsx");
const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// CSV Export
async function exportToCSV(fileName, headers, records) {

    const filePath = path.join(
        __dirname,
        "../../exports",
        fileName
    );

    const csvWriter = createCsvWriter({
        path: filePath,
        header: headers
    });

    await csvWriter.writeRecords(records);

    return filePath;
}

// Excel Export
async function exportToExcel(fileName, records) {

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(records);

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Data"
    );

    const filePath = path.join(
        __dirname,
        "../../exports",
        fileName
    );

    XLSX.writeFile(
        workbook,
        filePath
    );

    return filePath;
}

// CSV Import
async function readCSV(filePath) {

    return new Promise((resolve, reject) => {

        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", data => results.push(data))
            .on("end", () => resolve(results))
            .on("error", reject);

    });

}

// Excel Import
async function readExcel(filePath) {

    const workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    return XLSX.utils.sheet_to_json(worksheet);

}

module.exports = {
    exportToCSV,
    exportToExcel,
    readCSV,
    readExcel
};