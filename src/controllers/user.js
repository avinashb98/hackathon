const User = require('../models/user');
const dbService = require('../services/mongoDB');

class UserController {
    static async createQuestion(req, res) {
        const {
            text, imageUrl, domain, userId, language
        } = req.body;
        const question = await dbService.createQuestion({ text, imageUrl, domain, userId, language });
        res.status(201).json({
            message: 'Question created successfully',
            data: {
                questionId: question.questionId,
                text: question.text,
                domain: question.domain,
                language: question.language,
                asker: question.asker
            }
        });
        await Promise.all([
            dbService.addQuestioToMeta(question),
            dbService.addQuestionToUser({ questionRef: question._id, userId })
        ]);
        console.log('Question added to meta and pushed to user');
    }

    static async getQuestions(req, res) {
        const {
            domain, language
        } = req.query;

        const questions = await dbService.getQuestions({ domain, language });
        res.status(200).json({
            message: 'List of questions',
            data: questions
        });

    }

    static async getQuestionById(req, res) {
        const { questionId } = req.params;

        const question = await dbService.getQuestionById(questionId);
        res.status(200).json({
            message: 'Requested question details',
            data: question
        });
    }

    static async getUser(req, res) {
        const { userId } = req.params;

        const user = await dbService.getUser(userId);
        res.status(200).json({
            message: 'Requested question details',
            data: user
        });
    }
}

module.exports = UserController;