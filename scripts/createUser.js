require('dotenv').config();
require('../config/db/mongodb');
const uuid = require('short-uuid');
const User = require('../src/models/user');

const createUser = async (user) => {
    const { name, language } = user;
    const userId = uuid.generate();
    return User.create({
        name,
        userId,
        language
    });
}

(() => {
    setTimeout(async () => {
        await createUser({ name: 'Avinash', language: 'Tamil' });
        console.log('User Created');
    }, 3000);
})();
