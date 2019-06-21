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
            data: question
        });
        await dbService.addQuestioToMeta(question);
        console.log('Question added to meta');
    }
}

module.exports = UserController;
