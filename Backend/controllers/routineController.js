const Routine = require('../models/routineSchema')
const mongoose = require('mongoose')


//add routine
const addRoutine = async (req, res) => {
    const { day, newRoutine} = req.body 
    try {
        const user_id = req.user._id
        const routine = await Routine.addRoutine(day, newRoutine, user_id)
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