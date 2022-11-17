const { Router } = require('express')
const express = require('express')
const { 
    createGoal, 
    getGoal, 
    getGoals,
    deleteGoal,
    updateGoal,
    // pledgeToGoal,
    // contributeToGoal,
    getSingleUserGoals } = require('../controllers/goalController')
const requireAuth = require('../middleware/requireAuth')
const goalRouter = express.Router()

// goalRouter.use(requireAuth)
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

// // POST a PLEDGE to a goal
// goalRouter.get('/pledge/:id', pledgeToGoal)

// // POST a DIRECT CONTRIBUTION to a goal
// goalRouter.get('/contribute/:id', contributeToGoal)

module.exports = goalRouter
