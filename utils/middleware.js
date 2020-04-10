const logger = require("./logger")

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
        if(err.name === "CastError") return res.status(404).send({ error: "Unknown ID." })
        else if(err.name === "JsonWebTokenError") return res.status(401).send({ error: "Invalid token." })
        return res.status(400).send({ error: err.message })
    }
    else next()
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }