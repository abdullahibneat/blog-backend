const usersRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

usersRouter.get("/", async (req, res) => {
    res.json(await User.find({}))
})

usersRouter.post("/", async (req, res, next) => {
    try {
        const body = req.body

        if(!body.name) return res.status(400).json({ error: "Name is required." })
        if(!body.username) return res.status(400).json({ error: "Username is required." })
        if(!body.password) return res.status(400).json({ error: "Password is required." })

        const passwordHash = await bcrypt.hash(body.password, 10)

        res.status(201).json(await new User({
            name: body.name,
            username: body.username,
            passwordHash
        }).save())
    } catch(err) { next(err) }
})

module.exports = usersRouter