const apiModel = require("../models/api.model");

async function createApi(name, tableId, method) {
    return await apiModel.createApi(
        name,
        tableId,
        method
    );
}

async function getApis() {
    return await apiModel.getApis();
}

async function deleteApi(id) {
    return await apiModel.deleteApi(id);
}

module.exports = {
    createApi,
    getApis,
    deleteApi
};