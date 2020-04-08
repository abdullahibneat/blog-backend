const supertest = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const Blog = require("../models/blog")
const helper = require("./test_helper")

const blogs = [...helper.sample_blogs]

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Promise.all(blogs.map(b => new Blog(b).save()))
})

describe("Testing API", () => {
    test("All blogs are returned", async () => {
        const result = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
        expect(result.body.length).toBe(blogs.length)
    })

    test("Blogs have an ID field", async () => {
        const result = await api.get("/api/blogs")
        result.body.forEach(b => {
            expect(b.id).toBeDefined()
        })
    })

    test("New blog can be added", async () => {
        const newBlog = {
            title: "A new blog",
            author: "Example author",
            url: "https://google.com",
            likes: 1
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        expect(await Blog.find(newBlog)).toHaveLength(1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})