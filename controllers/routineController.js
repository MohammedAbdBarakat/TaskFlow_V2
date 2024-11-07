const Routine = require('../models/routineSchema')
const Week = require("../models/weekSchema")
const { findOrCreateWeek } = require('./weekHelperFuncs')
const mongoose = require('mongoose')


//add routine
const addRoutine = async (req, res) => {
    const { day, newRoutine} = req.body 
    const user_id = req.user._id


    // Determine the current week range and find or create the Week document
    const startDateR = newRoutine.startDate
    const currentDate = startDateR ? new Date(startDateR) : new Date;
    const week = await findOrCreateWeek(currentDate, user_id);
    console.log(week);
    
    const week_id = week._id

    try {
        const routine = await Routine.addRoutine(day, newRoutine, user_id, week_id)

        // find the day of the week and update the Week document
        const dayOfWeek = currentDate.getDay() + 1; // 0 is Sunday, 1 is Monday, etc.
        const dayField = `day${dayOfWeek}.Routines`;
        console.log(dayField);
        
        
        await Week.findByIdAndUpdate(
            week._id,
            { $push: { [dayField]: { routine_ref: routine._id } } }
        );

        res.status(200).json(routine)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get all routines
const getRoutines = async (req, res) => {
    const user_id = req.user._id;
    try {
        const routines = await Routine.find({ user_id }).sort({ createdAt: -1 });
        res.status(200).json(routines); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get single routine
const getRoutine = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'did not find the routine'})
    }

    const routine = await Routine.findById(id)

    if (!routine) {
        return res.status(404).json({error: 'did not fine the routine'})
    }

    res.status(200).json(routine)
}


module.exports = {addRoutine, getRoutines, getRoutine}