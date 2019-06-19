
const express = require('express');
const app = new express();

app.use(express.json());

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
    if (!person) res.status(400).send('not available.');

    res.send(person);
});

app.post('/hey/people', (req, res) => {
    const person = {
        id: people.length,
        name: req.body.name,
    };

    people.push(person);
    res.send(person);
    
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisenting on port ${port}..`));