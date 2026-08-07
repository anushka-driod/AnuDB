const databaseService = require("../services/database.service");

async function createDatabase(req, res) {
    try {
        const { name, description } = req.body;

        const database = await databaseService.createDatabase(
            name,
            description,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Database created successfully",
            database
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function getDatabases(req, res) {
    try {
        const databases = await databaseService.getDatabases(req.user.id);

        res.status(200).json({
            success: true,
            databases
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function updateDatabase(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const database = await databaseService.updateDatabase(
            id,
            name,
            description,
            req.user.id
        );

        if (!database) {
            return res.status(404).json({
                success: false,
                message: "Database not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Database updated successfully",
            database
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteDatabase(req, res) {
    try {
        const { id } = req.params;

        const database = await databaseService.deleteDatabase(
            id,
            req.user.id
        );

        if (!database) {
            return res.status(404).json({
                success: false,
                message: "Database not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Database deleted successfully",
            database
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createDatabase,
    getDatabases,
    updateDatabase,
    deleteDatabase
};