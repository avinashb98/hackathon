const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

router.post('/question', controller.createQuestion);

router.get('/profile/:userId', controller.getUser);
router.get('/questions', controller.getQuestions);
router.get('/question/:questionId', controller.getQuestionById);

module.exports = router;
