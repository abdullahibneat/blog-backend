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

    test("New blog without likes defaults to 0 likes", async () => {
        const newBlog = {
            title: "A new blog without likes",
            author: "Example author",
            url: "https://google.com"
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const storedBlog = await Blog.find(newBlog)
        expect(storedBlog[0].likes).toBe(0)
    })

    test("New blog without title and url is rejected", async () => {
        const newBlog = {
            author: "Example author"
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400)
    })

    test("Blog can be deleted", async () => {
        const newBlog = await new Blog({
            title: "Deleting this soon",
            author: "Void",
            url: "localhost"
        }).save()

        await api
            .delete(`/api/blogs/${ newBlog.id }`)
            .expect(204)

        expect(await Blog.find(newBlog)).toHaveLength(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
})