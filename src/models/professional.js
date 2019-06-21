const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProfessionalSchema = new Schema({
    professionalId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg'
    },
    name: {
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
    qualifications: [{
        type: String,
        default: []
    }],
    rejectedQuestions: [{
        type: String,
        default: []
    }],
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
        default: []
    }]
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('Professional', ProfessionalSchema);
