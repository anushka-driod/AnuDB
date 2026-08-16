const relationshipService = require("../services/relationship.service");

// Create Relationship
async function createRelationship(req, res) {
    try {
        const {
            sourceTableId,
            sourceColumnId,
            targetTableId,
            targetColumnId,
            relationshipType
        } = req.body;

        const relationship =
            await relationshipService.createRelationship(
                sourceTableId,
                sourceColumnId,
                targetTableId,
                targetColumnId,
                relationshipType
            );

        res.status(201).json({
            success: true,
            message: "Relationship created successfully",
            relationship
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

// Get Relationships
async function getRelationships(req, res) {
    try {

        const relationships =
            await relationshipService.getRelationships();

        res.status(200).json({
            success: true,
            relationships
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

// Delete Relationship
async function deleteRelationship(req, res) {
    try {

        const { id } = req.params;

        const relationship =
            await relationshipService.deleteRelationship(id);

        if (!relationship) {
            return res.status(404).json({
                success: false,
                message: "Relationship not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Relationship deleted successfully"
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
    createRelationship,
    getRelationships,
    deleteRelationship
};