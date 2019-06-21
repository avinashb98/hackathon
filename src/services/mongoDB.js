const mongoose = require('mongoose');
const Professional = require('../models/professional');
const Question = require('../models/question');
const QuestionMeta = require('../models/questionMeta');
const User = require('../models/user');
const uuid = require('short-uuid');

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
        console.log(user);
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
                {
                    _id: 0,
                    answer: 0,
                    questions: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0 
                }
            )
            .populate({
                path: 'asker',
                select: {
                    _id: 0,
                    questions: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    __v: 0
                }
            }));
    }

    static async addQuestioToMeta(question) {
        const { questionId, domain } = question;
        return QuestionMeta.create({
            questionId, domain
        });
    }
}

module.exports = DbService;
