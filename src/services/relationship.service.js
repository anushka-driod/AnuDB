const relationshipModel = require("../models/relationship.model");
const relationshipValidator = require("../validators/relationship.validator");

// Create Relationship
async function createRelationship(
    sourceTableId,
    sourceColumnId,
    targetTableId,
    targetColumnId,
    relationshipType
) {

    await relationshipValidator.validateRelationship(
        sourceTableId,
        sourceColumnId,
        targetTableId,
        targetColumnId
    );

    return await relationshipModel.createRelationship(
        sourceTableId,
        sourceColumnId,
        targetTableId,
        targetColumnId,
        relationshipType
    );
}

// Get Relationships
async function getRelationships() {
    return await relationshipModel.getRelationships();
}

// Delete Relationship
async function deleteRelationship(id) {
    return await relationshipModel.deleteRelationship(id);
}

module.exports = {
    createRelationship,
    getRelationships,
    deleteRelationship
};