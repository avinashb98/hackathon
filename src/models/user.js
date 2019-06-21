const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg'
    },
    language: {
        type: String,
        required: true
    },
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

module.exports = mongoose.model('User', UserSchema);
