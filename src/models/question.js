const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuestionSchema = new Schema({
    questionId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    language: {
        type: String,
        required: true
    },
    asker: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answer: {
        answerId: {
            type: String
        },
        videoUrl: {
            type: String
        },
        text: {
            type: String
        },
        answerer: {
            type: Schema.Types.ObjectId,
            ref: 'Professional'
        },
        upvotes: {
            type: Number,
            default: 0
        },
        language: {
            type: String
        },
        downvotes: {
            type: Number,
            default: 0
        },
        isAccepted: {
            type: Boolean,
            default: false
        }
    }
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
