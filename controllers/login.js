const loginRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const bcrypt = require("bcrypt")

loginRouter.post("/", async (req, res) => {
    const body = req.body

    if(!body.username) return res.status(400).json({ error: "Username is required" })
    if(!body.password) return res.status(400).json({ error: "Password is required" })

    const user = await User.findOne({ username: body.username })
    const validPassword = user? await bcrypt.compare(body.password, user.passwordHash) : false

    if(!validPassword) return res.status(401).json({ error: "Invalid username or password" })

    const token = { id: user.id }

    res.send(jwt.sign(token, process.env.TOKEN_SECRET))
})

module.exports = loginRouter