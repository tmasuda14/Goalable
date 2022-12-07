const express = require('express')

// Controller import
const { loginUser, registerUser } = require('../controllers/userController')

const router = express.Router()

// Routers will handle requests to a specific endpoint

// Login
router.post('/login', loginUser)

// Register
router.post('/register', registerUser)


module.exports = router

