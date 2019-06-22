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
            name: 'Dileepan',
            language: 'Tamil',
            domain: 'Literature',
            qualifications: ['PhD'],
            imageUrl: 'https://en.wikipedia.org/wiki/Srinivasa_Ramanujan#/media/File:Srinivasa_Ramanujan_-_OPC_-_1.jpg'
        });
        console.log('Professional Created');
    }, 3000);
})();
