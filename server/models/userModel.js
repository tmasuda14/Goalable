const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// Static register method
userSchema.statics.register = async function (email, username, password) {
    // Validate
    if (!email || !username || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Please use a valid email')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Please use a stronger password')
    }

    // Register
    const exists = await this.findOne({ email })
    if(exists){
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, username, password: hash})

    return user
}

userSchema.statics.login = async function(email, password) {
    // Validate
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Please use a valid email')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Please use a stronger password')
    }

    const user = await this.findOne({ email })
    if(!user){
        throw Error('Invalid login credentials')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid login credentials')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)