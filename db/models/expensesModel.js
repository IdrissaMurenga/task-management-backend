import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const expensesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    categories: {
        type: String,
        enum: ['transportation', 'rent', 'utilities','foods'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Expenses = model('expenses', expensesSchema)

export default Expenses  