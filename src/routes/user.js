const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

/**
 * Create a new collection
 */
router.post('/question', controller.createQuestion);

module.exports = router;
