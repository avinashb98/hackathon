require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./src/routes/user');
const professionalRouter = require('./src/routes/professional');

// Db configs
require('./config/db/mongodb');

const app = express();

// Body Parser Configuration
app.use(bodyParser.json({ // to support JSON-encoded bodies
    limit: '1mb'
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    limit: '1mb',
    extended: true
}));


// Router Initialization
app.get('/health', (req, res) => {
    res.status(200).json({
        messsge: 'Service Running'
    });
});

app.use('/user', userRouter);
app.use('/professional', professionalRouter);

module.exports = app;
