const express = require('express');
const bodyParser = require('body-parser');

const workoutRouter = require('./routes/workoutsRoutes');

const app = express();

app.use(bodyParser.json())

app.use('/api/workouts',workoutRouter);




app.listen(8080);