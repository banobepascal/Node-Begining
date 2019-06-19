const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded());

const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('hello world am ok');
});

app.get('/api/courses/', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    };


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // finding the course by id
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with this ID not found.');
   
    // validate
    const { error } = validateCourse(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    };

    // Update the course
    course.name = req.body.name;
    // return the updated course
    res.send(course);

});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with this ID not found.');
    res.send(course); 
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with this ID not found.');
   
    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
     // validate
     const schema = {
        name: Joi.string().min(3).required(),
    }; 

    return Joi.validate(course, schema);
}



const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`));