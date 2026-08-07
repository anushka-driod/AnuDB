const columnModel = require("../models/column.model");

async function createColumn(tableId, columnName, dataType, isRequired) {
    return await columnModel.createColumn(
        tableId,
        columnName,
        dataType,
        isRequired
    );
}

async function getColumns(tableId) {
    return await columnModel.getColumns(tableId);
}

async function updateColumn(id, columnName, dataType, isRequired) {
    return await columnModel.updateColumn(
        id,
        columnName,
        dataType,
        isRequired
    );
}

async function deleteColumn(id) {
    return await columnModel.deleteColumn(id);
}

module.exports = {
    createColumn,
    getColumns,
    updateColumn,
    deleteColumn
};