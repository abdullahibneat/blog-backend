const testingRouter = require("express").Router()
const User = require("../models/user")
const Blog = require("../models/blog")

testingRouter.post("/reset", async (req, res) => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    res.sendStatus(204)
})

module.exports = testingRouter