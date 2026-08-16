const apiService = require("../services/api.service");

async function createApi(req, res) {

    try {

        const { name, tableId, method } = req.body;

        if (!name || !tableId || !method) {
            return res.status(400).json({
                success: false,
                message: "name, tableId and method are required"
            });
        }

        const api = await apiService.createApi(
            name,
            tableId,
            method
        );

        res.status(201).json({
            success: true,
            message: "API generated successfully",
            api
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

async function getApis(req, res) {

    try {

        const apis = await apiService.getApis();

        res.status(200).json({
            success: true,
            apis
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function deleteApi(req, res) {

    try {

        const { id } = req.params;

        const api = await apiService.deleteApi(id);

        if (!api) {
            return res.status(404).json({
                success: false,
                message: "API not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "API deleted successfully",
            api
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createApi,
    getApis,
    deleteApi
};