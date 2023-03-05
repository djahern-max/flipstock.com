const express = require('express')
const mongoose = require('mongoose')
const app = express()
mongoose.set('strictQuery', true)
const usersRoute = require('./routes/usersRoute')

app.use(express.json())

app.use('/api/users', usersRoute)

require('dotenv').config()
const dbConfig = require('./config/dbConfig')

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
