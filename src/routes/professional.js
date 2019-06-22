const express = require('express');
const controller = require('../controllers/professional');
const router = express.Router();

router.post('/answer', controller.answerQuestion);
router.patch('/answer/reject', controller.rejectQuestion);
router.get('/profile/:professionalId', controller.getProfessional);
router.get('/poll', controller.poll);

router.patch('/mock', controller.registerMockDetails);
router.get('/mock', controller.getMockUsers);

module.exports = router;
