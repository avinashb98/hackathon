const express = require('express');
const controller = require('../../controllers/collections');
const router = express.Router();

/**
 * Create a new collection
 */
router.post(
    '/',
    validator.createCollection,
    controller.createCollection
);

module.exports = router;
