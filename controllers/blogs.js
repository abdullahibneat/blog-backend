const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get("/", async (req, res) => {
    res.json(await Blog.find({}))
})

blogsRouter.post("/", async (req, res, next) => {
    const blog = new Blog(req.body)

    try { res.status(201).json(await blog.save()) }
    catch(err) { next(err) }
})

module.exports = blogsRouter