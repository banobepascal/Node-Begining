const Joi = require('joi');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const people = require('./people')
const logger = require('./logger');
const auth = require('./auth');
const express = require('express');
const app = new express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/hey/people', people)

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

const people = [
    { id: 1, name: 'pascal'},
    { id: 2, name: 'bonny'},
    { id: 3, name: 'francis'},
]

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello'});
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisenting on port ${port}..`));