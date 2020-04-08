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

blogsRouter.delete("/:id", async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

blogsRouter.put("/:id", async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(201).end()
})

module.exports = blogsRouter