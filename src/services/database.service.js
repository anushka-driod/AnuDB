const databaseModel = require("../models/database.model");

async function createDatabase(name, description, ownerId) {
    return await databaseModel.createDatabase(
        name,
        description,
        ownerId
    );
}

async function getDatabases(ownerId) {
    return await databaseModel.getDatabases(ownerId);
}

async function updateDatabase(id, name, description, ownerId) {
    return await databaseModel.updateDatabase(
        id,
        name,
        description,
        ownerId
    );
}

async function deleteDatabase(id, ownerId) {
    return await databaseModel.deleteDatabase(
        id,
        ownerId
    );
}

module.exports = {
    createDatabase,
    getDatabases,
    updateDatabase,
    deleteDatabase
};