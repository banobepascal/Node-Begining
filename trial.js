
const express = require('express');
const app = new express();

const people = [
    { id: 1, name: 'pascal'},
    { id: 2, name: 'bonny'},
    { id: 3, name: 'francis'},
]

app.get('/', (req, res) => {
    res.send('Hello Pascal');
});

app.get('/hey/people', (req, res) => {
    res.send(people);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisenting on port ${port}..`));