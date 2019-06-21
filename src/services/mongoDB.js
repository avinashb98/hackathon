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

    static async addQuestionToUser({ userId, questionRef }) {
        return User.findOneAndUpdate(
            { userId },
            { $addToSet: { questions: mongoose.Types.ObjectId(questionRef) } }
        );
    }

    static async addQuestioToMeta(question) {
        const { questionId, domain } = question;
        return QuestionMeta.create({
            questionId, domain
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
}

module.exports = DbService;
