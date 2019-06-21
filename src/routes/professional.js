const express = require('express');
const controller = require('../controllers/professional');
const router = express.Router();

router.get('/poll', controller.poll);

module.exports = router;
