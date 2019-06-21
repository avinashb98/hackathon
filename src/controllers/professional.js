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

    static async answerQuestion(req, res) {
        const {
            questionId,
            videoUrl,
            language,
            professionalId,
            text
        } = req.body;

        const professional = await dbService.getProfessional(professionalId);
        const answerer = professional._id;
        const answer = await dbService.answerQuestion({
            questionId,
            videoUrl,
            language,
            text,
            answerer
        });

        res.status(200).json({
            message: 'Question Successfully answered',
            data: answer
        });
    }
}

module.exports = ProfessionalController;
