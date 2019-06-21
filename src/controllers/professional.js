const Professional = require('../models/professional');
const dbService = require('../services/mongoDB');
const sendNotification = require('../services/notification');

class ProfessionalController {
    static async getProfessional(req, res) {
        const { professionalId } = req.params;
        const professional = await dbService.getProfessional(professionalId);
        res.status(200).json({
            message: 'Professional\'s profile',
            data: professional
        });
    }

    static async poll(req, res) {
        const { language, domain, professionalId } = req.query;
        const professional = await dbService.getProfessional(professionalId);
        const except = professional.rejectedQuestions;
        console.log(except);
        const questionMeta = await dbService.poll({ language, domain, except });
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
        const question = await dbService.getQuestionRefById(questionId);
        await dbService.addQuestionToProfessional({
            professionalId,
            questionRef: question._id
        });
        try {
            const response = await sendNotification({
                title: 'Question Status Update',
                message: 'The status of the question is updated',
                questionId,
                state: 'ANSWERED'
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    static async rejectQuestion(req, res) {
        const { professionalId, questionId } = req.body;

        const question = await dbService.addRejectQuestionToProfessional({ professionalId, questionId });
        console.log(question);
        res.status(200).json({
            message: 'Question rejected',
            data: {}
        });
        await dbService.updateQuestionState({ questionId, state: 'OPEN' });
    }
}

module.exports = ProfessionalController;
