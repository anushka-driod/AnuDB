const express = require("express");
const router = express.Router();

const relationshipController = require("../controllers/relationship.controller");
const authenticateToken = require("../middleware/auth.middleware");

// Create Relationship
router.post(
    "/",
    authenticateToken,
    relationshipController.createRelationship
);

// Get Relationships
router.get(
    "/",
    authenticateToken,
    relationshipController.getRelationships
);

// Delete Relationship
router.delete(
    "/:id",
    authenticateToken,
    relationshipController.deleteRelationship
);

module.exports = router;