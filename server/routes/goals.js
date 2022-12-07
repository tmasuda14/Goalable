const { Router } = require('express')
const express = require('express')
const { 
    createGoal, 
    getGoal, 
    getGoals,
    deleteGoal,
    updateGoal,
    getSingleUserGoals } = require('../controllers/goalController')
const requireAuth = require('../middleware/requireAuth')
const goalRouter = express.Router()


// Routers will handle requests to a specific endpoint

// GET all goals
goalRouter.get('/', getGoals)

// GET browse user goals
goalRouter.get('/home', requireAuth, getSingleUserGoals)

// GET single goal
goalRouter.get('/:id', getGoal)

// POST a new goal
goalRouter.post('/', requireAuth, createGoal)

// DELETE a goal
goalRouter.delete('/:id',  deleteGoal)

// UPDATE a goal
goalRouter.patch('/edit/:id', updateGoal)

module.exports = goalRouter
