const express = require('express');
const controller = require('../controllers/professional');
const router = express.Router();

router.post('/answer', controller.answerQuestion);
router.get('/profile/:professionalId', controller.getProfessional);
router.get('/poll', controller.poll);

module.exports = router;
