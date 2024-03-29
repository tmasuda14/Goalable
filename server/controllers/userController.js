const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// Creates a JSON web token
const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d'})
}

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    
    try{
        
        const user = await User.login(email, password)

        const token = createToken(user._id)

        res.status(200).json({email, user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }


}


// Register user
const registerUser = async (req, res) => {
    const {email, username, password} = req.body

    try{
        const user = await User.register(email, username, password)

        const token = createToken(user._id)

        res.status(200).json({email, username, user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { loginUser, registerUser }