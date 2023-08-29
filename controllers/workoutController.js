
const workoutServices = require('../services/workoutService');


exports.getAllWorkouts = (req,res,next) => {
    const allWorkouts = workoutServices.getAllWorkouts();
    res.status(200).send({
        Status : "Ok",
        data : allWorkouts
    })
}


exports.getOneWorkout = (req,res,next) => {
    const workoutId = req.params.workoutId;
    try{
        const workout = workoutServices.getOneWorkout(workoutId);
        res.status(200).send({
            Status : "Ok",
            data: workout
        })
    }
    catch(error){
        console.log("controller console");
        res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
    }
    
}


exports.createNewWorkout = (req,res,next) => {
    
    const body = req.body;
    if(!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips){
        res
            .status(400)
            .send({
            status: "FAILED",
            data: {
                error:
                "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
            },
            });
        return;
    }
    const newWorkout = {
        name : body.name,
        mode : body.mode,
        equipment : body.equipment,
        exercises : body.exercises,
        trainerTips : body.trainerTips
    }
    try{
        const createNewWorkout = workoutServices.createNewWorkout(newWorkout);
        res.status(201).send({
            status : "OK",
            data : createNewWorkout
        })
    }
    catch(error){
        console.log("controller console");
        res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

exports.updateOneWorkout = (req,res,next) => {
    const workId = req.params.workoutId;
    const body = req.body;
    try{
        const updateWorkout = workoutServices.updateOneWorkout(workId,body);
        res.status(201).send({
            status : "OK",
            data : updateWorkout
        })
    }
    catch(error){
        res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
    }
    

}

exports.deleteOneWorkout = (req,res,next) => {
    const deleteId = req.params.workoutId;
    if(!deleteId){
        return;
    }
    try{
        workoutServices.deleteOneWorkout(deleteId);
        res.status(200).send({
            status : "OK",
            message : "Successful deleted"
        })
    }
    catch(error){
        res.status(error?.status || 500).
        send({status : "FAILED", data : {error: error?.message || error}});
    }
    
}

exports.getAllrecordsworkout = (req,res,next) => {
    const workId = req.params.workoutId;
    try{
       const recordWorkouts = workoutServices.getRecordWorkout(workId);
       res.status(201).send({
        status : "OK",
        data : recordWorkouts
       })
    }
    catch(error){
        res.status(error?.status || 500).
        send({status : "FAILED", data : {error: error?.message || error}});
    }
}

exports.getSearchParam = (req,res,next) => {
    
    const serachParam = req.query.mode;
    try{
        const resultSearch = workoutServices.getSearchParam({mode:serachParam});
        res.status(200).send({
            status : "Ok",
            data : resultSearch
        })
    }
    catch(error){
        res.status(error?.status || 500).
        send({status : "FAILED", data : {error: error?.message || error}});
    }

}