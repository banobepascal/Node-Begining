const Joi = require('joi');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./logger');
const auth = require('./auth');
const express = require('express');
const app = new express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));


// creating custom middleware
app.use(logger);
app.use(auth);

const people = [
    { id: 1, name: 'pascal'},
    { id: 2, name: 'bonny'},
    { id: 3, name: 'francis'},
]

app.get('/', (req, res) => {
    res.send(people);
});

app.get('/hey/people/:id', (req, res) => {
    const person = people.find(p =>  p.id === parseInt(req.params.id));
    if (!person) return res.status(400).send('not available.');

    res.send(person);
});

app.post('/hey/people', (req, res) => {

    // validate
    const { error } = validatePerson(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const person = {
        id: people.length + 1,
        name: req.body.name,
    };

    people.push(person);
    res.send(person); 
    
});

app.put('/hey/people/:id', (req, res) => {
   // lookup person
   const person = people.find(p => p.id === parseInt(req.params.id));
   if (!person) return res.status(400).send('Person doesnt exist.');
   
   // validate
   const { error } = validatePerson(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   // publish  person
  person.name = req.body.name;
  // return person
   res.send(person);
});

app.delete('/hey/people/:id', (req, res) => {
    // look up
    const person = people.find(p => p.id === parseInt(req.params.id));
    if (!person) return res.status(404).send('Person doesnt exist.');

    // delete
    const index = people.indexOf(person);
    people.splice(index, 1);

    res.send(person);
});

function validatePerson(person) {
        // schema
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(person, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisenting on port ${port}..`));