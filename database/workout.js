const DB = require('./db.json');
const saveToData = require('../database/utils');


exports.getAllWorkouts = () => {
    return DB.workouts;
}

exports.createNewWorkout = (newWorkout) => {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name == newWorkout.name) > -1;
    if(isAlreadyAdded){
        throw {
            status: 400,
            message: `Workout with the name '${newWorkout.name}' already exists`,
        };
    }
    try{
        DB.workouts.push(newWorkout);
        saveToData(DB);
        return newWorkout;
    }
    catch(err) {
        console.log("database console");
        throw {status : 500, message : err?.message || err}
    }
    
}

exports.getOneWorkout = (id) => {
    const workout = DB.workouts.find(workout => workout.id == id);
    if(!workout){
        console.log("database console");
        throw {
            status : 400,
            message : "Didn't found workout item"
        }
    }
    return workout;
}

exports.updateOneWorkout = (id,changes) => {
    const workoutFindIndex = DB.workouts.findIndex(workout => workout.id == id);
    if(workoutFindIndex == -1){
        throw {
            status : 400,
            message : "Didn't found workout item to update"
        }
    }
    try{
        const updateWorkout = {
            ...DB.workouts[workoutFindIndex],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        }
        DB.workouts[workoutFindIndex] = updateWorkout;
        saveToData(DB);
        return updateWorkout;
    }
    catch(err){
        throw {
            status: 500,
            message: err?.message || err
        }
    }
    
}

exports.deleteOneWorkout = (id) => {
    const workoutFindIndex = DB.workouts.findIndex(workout => workout.id == id);
    if(workoutFindIndex == -1){
        throw {
            status : 400,
            message : "Didn't delete workout item"
        }
    }
    try{
        DB.workouts.splice(workoutFindIndex,1);
        saveToData(DB);
    }
    catch(err){
        throw {
            status : 500,
            message : err?.message || err
        }
    }
    
}

exports.getRecordWorkout = (id) => {
    try{
        const recordWorkout = DB.records.filter(record => record.workout == id);
        if(!recordWorkout){
            throw {
                status : 400,
                message : "Didn't found record workout"
            }
        }
        return recordWorkout;
    }
    catch(err) {
        throw {
            status : 500,
            message : err?.message || err
        }
    }
}


exports.getSearchParam = (filterParam) => {
    try{
        const searchParamWorkout = DB.workouts.filter(workout => workout.mode.toLowerCase().includes(filterParam.mode.toLowerCase()));
        if(!searchParamWorkout){
            throw {
                status : 400,
                message : "Didn't find mdoe in the workout items"
            }
        }
        return searchParamWorkout;

    }
    catch(err){
        throw {
            status : 500,
            message : err?.message || err
        }
    }
}