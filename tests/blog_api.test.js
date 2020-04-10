const supertest = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const Blog = require("../models/blog")
const helper = require("./test_helper")

const blogs = [...helper.sample_blogs]

const api = supertest(app)

// Create a test user, and store the token and ID from beforeAll() below.
const testUser = {
    id: 0,
    token: ""
}

beforeAll(async () => {
    const User = require("../models/user")
    await User.findOneAndDelete({ username: "test" })
    await api
        .post("/api/users")
        .send({
            name: "test",
            username: "test",
            password: "test"
        })
    const result = await api
        .post("/api/login")
        .send({ username: "test", password: "test" })
    testUser.token = result.text
    const storedTestUser = await User.findOne({ username: "test" })
    testUser.id = storedTestUser.id
})

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

    test("Blog can't be added by unathenticated user", async () => {
        const newBlog = {
            title: "A new blog",
            author: "Example author",
            url: "https://google.com",
            likes: 1
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(401)
    })

    test("New blog can be added by authenticated user", async () => {
        const newBlog = {
            title: "A new blog",
            author: "Example author",
            url: "https://google.com",
            likes: 1
        }

        await api
            .post("/api/blogs")
            .set("Authorization", testUser.token)
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
            .set("Authorization", testUser.token)
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
            .set("Authorization", testUser.token)
            .send(newBlog)
            .expect(400)
    })

    test("Blog can't be deleted by other users", async () => {
        const newBlog = await new Blog({
            title: "Deleting this soon",
            author: "Void",
            url: "localhost",
            user: "000000000000000000000000"
        }).save()

        await api
            .delete(`/api/blogs/${ newBlog.id }`)
            .set("Authorization", testUser.token)
            .expect(401)
        await newBlog.remove()
    })

    test("Blog can be deleted by user who created the blog", async () => {
        const newBlog = await new Blog({
            title: "Deleting this soon",
            author: "Void",
            url: "localhost",
            user: testUser.id
        }).save()

        await api
            .delete(`/api/blogs/${ newBlog.id }`)
            .set("Authorization", testUser.token)
            .expect(204)

        expect(await Blog.find(newBlog)).toHaveLength(0)
    })

    test("Blog entry can be updated", async () => {
        const newBlog = await new Blog({
            title: "Wrong title",
            url: "localhost:3003",
            author: "Hello world"
        }).save()

        const correctTitle = { title: "Correct title" }

        await api
            .put(`/api/blogs/${ newBlog.id }`)
            .send(correctTitle)
            .expect(201)

        const storedBlog = await Blog.findById(newBlog.id)
        expect(storedBlog.title).toBe(correctTitle.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})