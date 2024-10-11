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
    
}, { timestamps: true })

const Tasks = mongoose.model('Tasks', todoSchema)

export default Tasks