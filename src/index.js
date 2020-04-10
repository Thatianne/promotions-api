require('dotenv').config()
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const server = http.Server(app)

const dbUrl = process.env.DB_HOST.replace('{{password}}', process.env.DB_PASSWORD).replace('{{database}}', process.env.DB_NAME)
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)
