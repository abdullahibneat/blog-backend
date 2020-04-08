const supertest = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const Blog = require("../models/blog")
const helper = require("./test_helper")

const blogs = [...helper.sample_blogs].map(b => new Blog(b))

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Promise.all(blogs.map(b => b.save()))
})

describe("Testing API", () => {
    test("All blogs are returned", async () => {
        const result = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
        expect(result.body.length).toBe(blogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})