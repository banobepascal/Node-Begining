const Joi = require('joi');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const people = require('./routes/people');
const home = require('./routes/home');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');
const express = require('express');
const app = new express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/hey/people', people);
app.use('/', home);

// configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled ...');
}

// creating custom middleware
app.use(logger);
app.use(auth);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisenting on port ${port}..`));