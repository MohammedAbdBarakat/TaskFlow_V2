const mongoose = require('mongoose')

const Schema = mongoose.Schema


//for scheduling the start and the end of the day.
//this model helps in the distributing system.

const schedulerSchema = new Schema ({
    day: {
        type:String,
        required: true
    },
    times: [
        {
            startAt: Number,
            endAt: Number
        }
    ],
    user_id: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Scheduler',schedulerSchema)