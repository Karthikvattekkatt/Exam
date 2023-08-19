const mongoose = require("mongoose")
const taskSchema = mongoose.Schema({
    taskId: String,
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: new Date()

    }
})

const taskData = mongoose.model('tasks', taskSchema)

module.exports = taskData;