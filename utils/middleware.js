const logger = require("./logger")
const jwt = require("jsonwebtoken")

const tokenExtractor = (req, res, next) => {
    try {
        const token = req.get("Authorization")
        req.token = token? jwt.verify(token, process.env.TOKEN_SECRET) : null
        next()
    } catch(err) { next(err) }
}

const requestLogger = (req, res, next) => {
    logger.info("Method: ", req.method)
    logger.info("Path: ", req.path)
    logger.info("Body: ", req.body)
    logger.info("---")
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: "Unknown endpoint" })
}

const errorHandler = (err, req, res, next) => {
    if(err) {
        if(err.name === "CastError") return res.status(404).json({ error: "Unknown ID." })
        else if(err.name === "JsonWebTokenError") return res.status(401).json({ error: "Invalid token." })
        else if(err.name === "MongoError" && err.keyValue.username) return res.status(400).json({ error: "Username has been taken already." })
        return res.status(400).json({ error: err.message })
    }
    else next()
}

module.exports = { tokenExtractor, requestLogger, unknownEndpoint, errorHandler }