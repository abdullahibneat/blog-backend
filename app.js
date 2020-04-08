const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require("./utils/middleware")

const mongoose = require("mongoose")
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => logger.info("Connected to MongoDB"))

const express = require("express")
const bodyParser = require("body-parser")
const blogsRouter = require("./controllers/blogs")

const app = express()

app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use("/api/blogs", blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app