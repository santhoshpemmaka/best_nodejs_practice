const express = require('express');

const router = express.Router();

const workoutController = require('../controllers/workoutController');

//  Get all API'S
router.get('/', workoutController.getAllWorkouts);



router.get('/workouts',workoutController.getSearchParam);
router.get('/:workoutId',workoutController.getOneWorkout);

router.get('/:workoutId/records',workoutController.getAllrecordsworkout);

router.post('/',workoutController.createNewWorkout);

router.post('/:workoutId',workoutController.updateOneWorkout);

router.delete('/:workoutId',workoutController.deleteOneWorkout);

module.exports = router;