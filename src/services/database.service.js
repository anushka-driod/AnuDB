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

module.exports = {
    createDatabase,
    getDatabases
};