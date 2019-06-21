const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

router.post('/question', controller.createQuestion);
router.post('/fcm', controller.setFCM);

router.patch('/upvote/:questionId', controller.upvote);
router.patch('/downvote/:questionId', controller.downvote);
router.patch('/accept/:questionId', controller.acceptAnswer);

router.get('/search', controller.searchQuestions);
router.get('/profile/:userId', controller.getUser);
router.get('/questions', controller.getQuestions);
router.get('/question/:questionId', controller.getQuestionById);

module.exports = router;
