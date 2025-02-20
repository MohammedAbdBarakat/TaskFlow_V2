require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes//users')
const routineRoutes = require('./routes/routines')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use("/api/tasks", taskRoutes) 
app.use("/api/users", userRoutes)
app.use('/api/routines',routineRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listening for requests
        app.listen(process.env.PORT, (req, res) => {
            console.log(`connected to database!\nlistening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
