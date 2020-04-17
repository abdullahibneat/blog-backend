const logger = require("./utils/logger")
const config = require("./utils/config")
const middleware = require("./utils/middleware")

const mongoose = require("mongoose")
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => logger.info("Connected to MongoDB"))

const express = require("express")
const bodyParser = require("body-parser")
const loginRouter = require("./controllers/login")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")

const app = express()

app.use(bodyParser.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

if(process.env.NODE_ENV === "test") {
    const testingRouter = require("./controllers/testing")
    app.use("/api/testing", testingRouter)
}

app.use("/api/login", loginRouter)
app.use("/api/users", usersRouter)
app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app