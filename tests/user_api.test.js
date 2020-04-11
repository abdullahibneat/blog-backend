const supertest = require("supertest")
const app = require("../app")
const User = require("../models/user")
const mongoose = require("mongoose")
const helper = require("./test_helper")

const users = [...helper.sample_users]
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await Promise.all(users.map(u => new User(u).save()))
})

describe("Testing /users API", () => {
    test("User can be created", async () => {
        const newUser = {
            name: "Test",
            username: "test",
            password: "testpsw"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)

        expect(await User.find({ name: newUser.name, username: newUser.username })).toHaveLength(1)
    })

    test("User without required fields cannot be created", async () => {
        const newUser = {}

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        newUser.name = "test"

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        newUser.uesrname = "test"

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
    })

    test("Username must be unique", async () => {
        const newUser = {
            name: "John Doe",
            username: "john",
            password: "secretPassword1"
        }

        const newUserDuplicateUsername = {
            name: "Tom",
            username: newUser.username,
            password: "g78fe&^Tfcvs8"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)

        await api
            .post("/api/users")
            .send(newUserDuplicateUsername)
            .expect(400)

        expect(await User.find({ username: newUser.username })).toHaveLength(1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})