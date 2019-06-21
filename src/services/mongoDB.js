const mongoose = require('mongoose');
const Professional = require('../models/professional');
const Question = require('../models/question');
const QuestionMeta = require('../models/questionMeta');
const User = require('../models/user');
const uuid = require('short-uuid');

const genericProjections = {
    createdAt: 0,
    updatedAt: 0,
    __v: 0
};

class DbService {
    static async createQuestion(question) {
        const questionId = uuid.generate();
        const {
            text,
            domain,
            imageUrl,
            userId,
            language
        } = question;
        const user = await User.findOne({ userId }, { _id: 1 });
        return Question.create({
            questionId,
            text,
            domain,
            imageUrl,
            language,
            asker: mongoose.Types.ObjectId(user._id)
        })
        .then(question => Question
            .findById(
                question._id,
                { ...genericProjections }
            )
            .populate({
                path: 'asker',
                select: { ...genericProjections, _id: 0, questions: 0 }
            })
        );
    }

    static async acceptAnswer(questionId) {
        return Question.findOneAndUpdate(
            { questionId },
            { 'answer.isAccepted': true },
            {
                new: true,
                projection: {
                    ...genericProjections, _id: 0, asker: 0
                }
            }
        );
    }

    static async addQuestionToUser({ userId, questionRef }) {
        return User.findOneAndUpdate(
            { userId },
            { $addToSet: { questions: mongoose.Types.ObjectId(questionRef) } }
        );
    }

    static async addQuestioToMeta(question) {
        const { questionId, domain, language } = question;
        return QuestionMeta.create({
            questionId, domain, language
        });
    }

    static async getQuestions({ language, domain }) {
        return Question.find(
            { language, domain },
            { ...genericProjections, answer: 0, _id: 0 }
        ).populate({
            path: 'asker',
            select: { ...genericProjections, _id: 0, questions: 0 }
        });
    }

    static async getQuestionById(questionId) {
        return Question.findOne(
            { questionId },
            { ...genericProjections, _id: 0 }
        ).populate({
            path: 'asker',
            select: { ...genericProjections, _id: 0, questions: 0 }
        });
    }

    static async getQuestionRefById(questionId) {
        return Question.findOne(
            { questionId },
            { _id: 1 }
        );
    }

    static getUser(userId) {
        return User.findOne(
            { userId },
            { ...genericProjections, _id: 0 }
        )
        .populate({
            path: 'questions',
            select: { ...genericProjections, _id: 0, asker: 0 }
        })
    }

    /*****************************************************************************************/

    static async poll({ language, domain, except }) {
        return QuestionMeta.findOneAndUpdate(
            { language, domain, state: 'OPEN', questionId: { $nin: except } },
            { state: 'ACTIVE' },
            { projection: { ...genericProjections, _id: 0 }, new: true }
        );
    }

    static async getProfessional(professionalId) {
        return Professional.findOne(
            { professionalId },
            { ...genericProjections }
        )
        .populate({
            path: 'questions',
            select: { ...genericProjections, _id: 0, asker: 0 }
        })
    }

    static async answerQuestion(answer) {
        const {
            questionId,
            videoUrl,
            language,
            answerer,
            text
        } = answer;
        const answerId = uuid.generate();
        return Question.findOneAndUpdate(
            { questionId },
            {
                'answer.answerId': answerId,
                'answer.videoUrl': videoUrl,
                'answer.language': language,
                'answer.answerer': mongoose.Types.ObjectId(answerer),
                'answer.text': text
            },
            { projection: { ...genericProjections, _id: 0 }, new: true }
        ).populate({
            path: 'answer.answerer',
            select: { _id: 0, name: 1 }
        });
    }

    static async addQuestionToProfessional({ professionalId, questionRef }) {
        return Professional.findOneAndUpdate(
            { professionalId },
            { $addToSet: { questions: mongoose.Types.ObjectId(questionRef) } }
        );
    }

    static async rejectQuestion({ professionalId, questionId }) {
        return Professional.findOneAndUpdate(
            { professionalId },
            { $addToSet: { rejectedQuestions: questionId } }
        );
    }

    /********************************************************************** */

    static async upvote(questionId) {
        return Question.findOneAndUpdate(
            { questionId },
            { $inc: { 'answer.upvotes': 1 } },
            {
                new: true,
                projection: {
                    ...genericProjections, _id: 0, asker: 0
                }
            }
        );
    }

    static async downvote(questionId) {
        return Question.findOneAndUpdate(
            { questionId },
            { $inc: { 'answer.downvotes': 1 } },
            {
                new: true,
                projection: {
                    ...genericProjections, _id: 0, asker: 0
                }
            }
        );
    }

    static updateQuestionMeta({ questionId, state }) {
        return QuestionMeta.findOneAndUpdate(
            { questionId },
            { state },
            { new: true, projection: { ...genericProjections, _id: 0 } }
        );
    }

    static searchQuestions({ searchString, language }) {
        return Question.find(
            { language, $text: { $search: searchString } },
            { ...genericProjections, _id: 0 }
        )
        .populate({
            path: 'asker',
            select: { ...genericProjections, _id: 0, questions: 0 }
        });
    }
}

module.exports = DbService;
