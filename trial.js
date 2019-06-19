const Joi = require('joi');
const express = require('express');
const app = new express();

app.use(express.json());

// creating custom middleware


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