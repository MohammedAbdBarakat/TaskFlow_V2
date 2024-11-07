const Task = require('../models/taskSchema')
const Week = require("../models/weekSchema")
const { findOrCreateWeek } = require('./weekHelperFuncs')
const mongoose = require('mongoose')


//get all tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id
    const task = await Task.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(task)
}

//get single task
const getTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "did not find the task"})
    }
    const task = await Task.findById(id)

    if (!task) {
        return res.status(404).json({error: "did not find the task"})
    }

    res.status(200).json(task);
}


//create task
const createTask = async (req, res) => {
    const { title, type, description, startDate, startTime, endTime, importance, complex } = req.body;
    const user_id = req.user._id;

    // Determine the current week range and find or create the Week document
    const currentDate = startDate ? new Date(startDate) : new Date() // Use startDate or current date
    const week = await findOrCreateWeek(currentDate, user_id);
    
    // Create the new task
    try {
        const task = await Task.create({
            title,
            type,
            description,
            importance,
            complex,
            startDate,
            startTime,
            endTime,
            isDone: false,
            completeDate: null,
            completeTime: null,
            user_id,
            week: week._id,
        });

        // find the day of the week and update the Week document
        const dayOfWeek = currentDate.getDay() + 1; // 0 is Sunday, 1 is Monday, etc.
        const dayField = `day${dayOfWeek}.Tasks`;
        
        await Week.findByIdAndUpdate(
            week._id,
            { $push: { [dayField]: { task_ref: task._id } } }
        );

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





//update task
const updateTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "did not find the task"})
    }

    const task = await Task.findByIdAndUpdate({_id: id}, {...req.body})

    if (!task) {
        return res.status(404).json({error: "did not find the task"})
    }

    res.status(200).json(task);
}

//delete task
const deleteTask = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "did not find the task"})
    }

    const task = await Task.findByIdAndDelete({_id: id})

    if (!task) {
        return res.status(404).json({error: "did not find the task"})
    }

    res.status(200).json(task);
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}