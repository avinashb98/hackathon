const Professional = require('../models/professional');
const dbService = require('../services/mongoDB');

class ProfessionalController {
    static async poll(req, res) {
        const { language, domain } = req.query;
        const questionMeta = await dbService.poll({ language, domain });
        if (!questionMeta) {
            res.status(404).json({
                message: 'No questions found',
                data: null
            });
            return;
        }
        const question = await dbService.getQuestionById(questionMeta.questionId);
        res.status(200).json({
            message: 'Question found and updated',
            data: question
        });
    }
}

module.exports = ProfessionalController;
