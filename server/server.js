const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

// dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
// this is used to store sensitive information like API keys and passwords
require('dotenv').config()

const goalRoutes = require('./routes/goals')
const userRoutes = require('./routes/user')
// express app creation and port declaration
// express() creates a new express application which can be used to listen for requests and respond to them.
const app = express()
const PORT = process.env.PORT

// middleware
// cors() is a middleware function that allows cross origin requests
// express.json() is a middleware function that parses incoming requests with JSON payloads    
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(bodyParser.json());

// routes
// app.use is a middleware function that takes in a path and a callback function and will run the callback function when the path is hit.
app.use('/', goalRoutes)
app.use('/user', userRoutes)

// connect to mongoose db and then listen for requests
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
        console.log('Connected to Mongodb and Listening on port ' + PORT)
        })
    })
    .catch((err) => { console.log(err) })

