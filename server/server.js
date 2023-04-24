const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const app = express()
const usersRoute = require('./routes/usersRoute')
const blogsRoute = require('./routes/blogsRoute')
const blogActionsRoute = require('./routes/blogActionsRoute')

app.use(express.json())

app.use('/api/users', usersRoute)
app.use('/api/blogs', blogsRoute)
app.use('/api/blog-actions', blogActionsRoute)

require('dotenv').config()
const dbConfig = require('./config/dbConfig')

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
