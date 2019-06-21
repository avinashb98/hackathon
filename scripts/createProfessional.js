require('dotenv').config();
require('../config/db/mongodb');
const uuid = require('short-uuid');
const Professional = require('../src/models/professional');

const createProfessional = async (user) => {
    const { name, language, domain, qualifications, imageUrl } = user;
    const professionalId = uuid.generate();
    return Professional.create({
        name,
        professionalId,
        language,
        domain,
        qualifications,
        imageUrl
    });
};

(() => {
    setTimeout(async () => {
        await createProfessional({
            name: 'Albert Einstein',
            language: 'English',
            domain: 'Physics',
            qualifications: ['PhD'],
            imageUrl: 'https://en.wikiquote.org/wiki/Albert_Einstein#/media/File:Albert_Einstein_Head.jpg'
        });
        console.log('Professional Created');
    }, 3000);
})();
