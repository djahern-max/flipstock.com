const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const app = express()
const usersRoute = require('./routes/usersRoute')
const blogsRoute = require('./routes/blogsRoute')

app.use(express.json())

app.use('/api/users', usersRoute)
app.use('/api/blogs', blogsRoute)

require('dotenv').config()
const dbConfig = require('./config/dbConfig')

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
