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
            name: 'Kshitij',
            language: 'English',
            domain: 'Mathematics',
            qualifications: ['B.Tech in Electronics and Communication Engineering'],
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Circle-icons-profile.svg'
        });
        console.log('Professional Created');
    }, 3000);
})();
