const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get("/", async (req, res) => {
    res.json(await User.find({}).populate("blogs", { user: 0 }))
})

usersRouter.get("/:id", async (req, res, next) => {
    try {
        res.json(await User.findById(req.params.id).populate("blogs", { user: 0 }))
    } catch (err) {
        next(err)
    }
})

usersRouter.post("/", async (req, res, next) => {
    try {
        const body = req.body

        body.name = body.name.trim()

        if(!body.name) return res.status(400).json({ error: "Name is required." })

        body.username = body.username.trim()

        if(!body.username) return res.status(400).json({ error: "Username is required." })

        body.username = body.username.trim()

        if(body.username.length < 3) return res.status(400).json({ error: "Username must be at least 3 characters long." })
        if(!body.password) return res.status(400).json({ error: "Password is required." })
        if(body.password.length < 7) return res.status(400).json({ error: "Password must be at least 7 characters long." })

        const passwordHash = await bcrypt.hash(body.password, 10)

        res.status(201).json(await new User({
            name: body.name,
            username: body.username.toLowerCase(),
            passwordHash
        }).save())
    } catch(err) { next(err) }
})

module.exports = usersRouter