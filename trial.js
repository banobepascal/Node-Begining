
const express = require('express');
const app = new express();

app.get('/', (req, res) => {
    res.send('Hello Pascal');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Lisenting on port ${port}..`));