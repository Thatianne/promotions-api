require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./helpers/errorHandler')

const app = express()
const server = http.Server(app)

const dbUrl = process.env.DB_HOST.replace('{{password}}', process.env.DB_PASSWORD).replace('{{database}}', process.env.DB_NAME)
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

app.use(cors())
app.use(express.json())
app.use(routes)
app.use((err, req, res, next) => {
    console.log()
    errorHandler(err, res)
})

server.listen(3333)
