const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        require: true
    },
    likes: {
        type: Number
    }
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog