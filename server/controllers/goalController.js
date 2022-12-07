const goalModel = require('../models/goalModel')
const mongoose = require('mongoose')


// Find and return all public goals from the database
const getGoals = async (req, res) => {

    const goals = await goalModel.find({ visibility: 'Public', contributor: "f"}).sort({createdAt: -1})

    res.status(200).json(goals)
}

// Find and return a single user's goal based on the user's id
const getSingleUserGoals = async (req, res) => {
    const user_id = req.user._id
    const goals = await goalModel.find({user_id}).sort({createdAt: -1})

    res.status(200).json(goals)
}

// Find and return a single goal based on the goal's id
const getGoal = async (req, res) => {
    const { id } = req.params

    // checks for valid mongoose id type
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No goal matching that ID exists'})
    }
    const goal = await goalModel.findById(id)
    if(!goal){
        return res.status(404).json({error: 'No goal matching that ID exists'})
    }
    res.status(200).json(goal)
}

// Create a new goal and add it to the database
const createGoal = async (req, res) => {
    console.log(req.body)
    const { goal, goalAmount, currentAmount, visibility, goalDate, goalImage } = req.body

    // add to db
    try {
        const user_id = req.user._id
 
        const newGoal = await goalModel.create({ goal, goalAmount, currentAmount, visibility, goalDate, user_id, goalImage})
        res.status(200).json(newGoal)
    } catch (err) {
        res.status(400).json({ error: 'Please fill in all fields with valid values.' })
    }
}

// Delete a goal from the database
const deleteGoal = async (req, res) => {
    const { id } = req.params

    // checks for valid mongoose id type
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Can\'t delete 1. No goal matching that ID exists'})
    }

    const goal = await goalModel.findOneAndDelete({_id: id})

    if(!goal){
        return res.status(404).json({error: 'Can\'t delete 2. No goal matching that ID exists'})
    }

    res.status(200). json(goal)

}

// Update a single goal based on the goal's id
const updateGoal = async (req, res) => {
    const { id } = req.params

    // checks for valid mongoose id type
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Can\'t delete. No goal matching that ID exists'})
    }

  
    const goal = await goalModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!goal){
        return res.status(404).json({error: 'Can\'t update. No goal matching that ID exists'})
    }

    res.status(200). json(goal)
}

module.exports = {
    getGoal,
    getGoals,
    deleteGoal,
    updateGoal,
    createGoal,
    getSingleUserGoals
}
