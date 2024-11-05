const mongoose  = require("mongoose")

const Schema = mongoose.Schema

const journalingSchema = new Schema ({
    goodEvents: {
        event1: {
            type: String
        },
        event2: {
            type: String
        },
        event3: {
            type: String
        },
    },
    badEvents: {
        event1: {
            type: String
        },
        event2: {
            type: String
        },
        event3: {
            type: String
        },
    },
    notes: {
        type: String
    },
    weekNumber: {
        type:Number
    },
    user_id: {
        type: String,
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model("Journaling", journalingSchema)