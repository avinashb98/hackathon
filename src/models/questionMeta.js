const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuestionMetaSchema = new Schema({
    questionId: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['OPEN', 'ACTIVE', 'ANSWERED'],
        default: 'OPEN',
        required: true
    }
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('QuestionMeta', QuestionMetaSchema);
