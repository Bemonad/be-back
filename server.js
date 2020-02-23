const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const port = process.env.PORT || 3001

const indexRouter = require('./routes/index')

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api', indexRouter)

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
  .then( db => {
    console.log( { db: db, url: process.env.MONGO_URL })
  })

app.listen(port)
console.log(`Server listening on port : ${port}`)
