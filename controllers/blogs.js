const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (req, res) => {
    res.json(await Blog.find({}))
})

blogsRouter.post("/", (req, res, next) => {
    const blog = new Blog(req.body)

    blog
        .save()
        .then(result => res.status(201).json(result))
        .catch(err => next(err))
})

module.exports = blogsRouter