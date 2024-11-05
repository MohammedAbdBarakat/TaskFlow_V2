const mongoose  = require("mongoose")

const Schema = mongoose.Schema

const monthPerformanceSchema = new Schema({
    weekNumber: { type: Number },
    completionRate: { type: Number },
    importanceCompletionRate: { type: Number },
    timeManagementRate: { type: Number },
    complicatedCompletionRate: { type: Number },
    onTimeCompletionRate: { type: Number },
    streak: { type: Number },
    user_id: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Performance", monthPerformanceSchema)