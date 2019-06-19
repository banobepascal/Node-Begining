const express = require('express');
const router = express.Router();

const people = [
    { id: 1, name: 'pascal'},
    { id: 2, name: 'bonny'},
    { id: 3, name: 'francis'},
];

router.get('/', (req, res) => {
    res.send(people);
});

router.get('/:id', (req, res) => {
    const person = people.find(p =>  p.id === parseInt(req.params.id));
    if (!person) return res.status(400).send('not available.');

    res.send(person);
});

router.post('/', (req, res) => {

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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

module.exports = router;