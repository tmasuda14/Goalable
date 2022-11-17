const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalSchema = new Schema({
    goal: {
        type: String,
        required: true
    },
    goalAmount: {
        type: Number,
        required: true
    },
    currentAmount: {
        type: Number,
        required: true
    },
    visibility: {
        type: String,
        required: true
    },
    goalDate: {
        type: Date,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    contributors: [String],
    goalImage: String
}, { timestamps: true })

module.exports = mongoose.model('Goal', goalSchema);