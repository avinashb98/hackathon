const mongoose = require('mongoose');

// Mongoose connection
mongoose.Promise = global.Promise;
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        console.info('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error(err);
    });

mongoose.connection.on('error', (err) => {
    console.error(err);
    console.info('MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});
