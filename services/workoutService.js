const workout = require('../database/workout');
const {v4:uuid} = require('uuid');

exports.getAllWorkouts = () => {
    const allworkouts = workout.getAllWorkouts();
    return allworkouts;
}

exports.getOneWorkout = (workoutId) => {
    try{
        const getWorkout = workout.getOneWorkout(workoutId);
        return getWorkout;
    }
    catch(err){
        console.log("Service console");
        throw err;
    }
    
}

exports.createNewWorkout = (newWorkout) => {
    const workoutInsert = {
        ...newWorkout,
        id: uuid(),
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }
    try{
        const createWorkout = workout.createNewWorkout(workoutInsert);
        return createWorkout;
    }
    catch(err){
        console.log("serivce console");
        throw err;
    }
    
}

exports.updateOneWorkout = (id,changes) => {
    try{
        const updateWorkout = workout.updateOneWorkout(id,changes);
        return updateWorkout;
    }
    catch(err){
        throw err;
    }
    
}

exports.deleteOneWorkout = (id) => {
    try{
        workout.deleteOneWorkout(id);
    }
    catch(err){
        throw err;
    }
    
}

exports.getRecordWorkout = (id) => {
    try{
        const recordWorkouts = workout.getRecordWorkout(id);
        return recordWorkouts;
    }
    catch(err){
        throw err;
    }
}

exports.getSearchParam = (filter) => {
    try{
        const searchParamResult = workout.getSearchParam(filter);
        return searchParamResult;
    }
    catch(err) {
        throw err;
    }
}