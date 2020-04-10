const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

blogsRouter.get("/", async (req, res) => {
    res.json(await Blog.find({}).populate("user", { blogs: 0 }))
})

blogsRouter.post("/", async (req, res, next) => {
    try {
        if(!req.token) return next({ name: "JsonWebTokenError" })

        const id = req.token.id

        const user = await User.findById(id)

        const body = req.body
        body.user = id

        const blog = new Blog(body)

        user.blogs = user.blogs.concat(blog.id)
        await user.save()

        res.status(201).json(await blog.save())
    } catch(err) { next(err) }
})

blogsRouter.delete("/:id", async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
})

blogsRouter.put("/:id", async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if(!blog) return res.status(404).send({ error: "Unknown ID." })
        return res.sendStatus(201)
    } catch(err) { next(err) }
})

module.exports = blogsRouter