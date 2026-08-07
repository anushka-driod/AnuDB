const tableModel = require("../models/table.model");

async function createTable(databaseId, tableName) {
    return await tableModel.createTable(
        databaseId,
        tableName
    );
}

async function getTables(databaseId) {
    return await tableModel.getTables(databaseId);
}

async function updateTable(id, tableName) {
    return await tableModel.updateTable(
        id,
        tableName
    );
}

async function deleteTable(id) {
    return await tableModel.deleteTable(id);
}

module.exports = {
    createTable,
    getTables,
    updateTable,
    deleteTable
};