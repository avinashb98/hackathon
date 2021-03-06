const dbService = require('../services/mongoDB');

class UserController {
    static async createQuestion(req, res) {
        const {
            text, imageUrl, domain, asker, language
        } = req.body;
        const { userId } = asker;
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
            dbService.addQuestionToUser({ questionRef: question._id, userId, language: question.language })
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

    static async upvote(req, res) {
        const { questionId } = req.params;

        const question = await dbService.upvote(questionId);
        res.status(200).json({
            message: 'Answer Upvoted',
            data: question
        });
    }

    static async downvote(req, res) {
        const { questionId } = req.params;

        const question = await dbService.downvote(questionId);
        res.status(200).json({
            message: 'Answer Downvoted',
            data: question
        });
    }

    static async acceptAnswer(req, res) {
        const { questionId } = req.params;

        const question = await dbService.acceptAnswer(questionId);
        res.status(200).json({
            message: 'Answer Accepted',
            data: question
        });
        await dbService.updateQuestionMeta({ questionId, state: 'ANSWERED' });
    }

    static setFCM(req, res) {
        const { fcmKey } = req.body;
        process.env.FCM_KEY = fcmKey;
        res.status(200).json({
            message: 'FCM Key successfully set',
            data: {}
        });
        console.log(process.env.FCM_KEY)
    }

    static async searchQuestions(req, res) {
        const { domain, language } = req.query;
        const questions = await dbService.searchQuestions({ domain, language });
        res.status(200).json({
            message: 'Here are search results',
            questions
        });
    }
}

module.exports = UserController;