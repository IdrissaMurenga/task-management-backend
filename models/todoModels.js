import mongoose from "mongoose";

const Schema = mongoose.Schema

const todoSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
    
}, { timestamps: true })

const Tasks = mongoose.model('Tasks', todoSchema)

export default Tasks