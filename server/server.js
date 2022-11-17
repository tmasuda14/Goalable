const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

require('dotenv').config()

const goalRoutes = require('./routes/goals')
const userRoutes = require('./routes/user')
// express app
const app = express()
const PORT = process.env.PORT

// middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
app.use(bodyParser.json());

// // routes
app.use('/', goalRoutes)
app.use('/user', userRoutes)

// connect to mongoose db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(PORT, () => {
        console.log('Connected to Mongodb and Listening on port ' + PORT)
        })
    })
    .catch((err) => { console.log(err) })

