const sample_blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const sample_users = [
    {
        _id: "5e8f7041a4875d271478c19f",
        name: "William Gregory",
        username: "WilliamDGregory",
        passwordHash: "$2b$10$1mJ3RhNAcFgmO/0NezhSpeBMXcwDTlhYT2pyYamwCoqikg1VddtJW", // password: william1959
        __v: 0
    },
    {
        _id: "5e8f733da4875d271478c1a0",
        name: "Joel Ramirez",
        username: "j.ramirez",
        passwordHash: "$2b$10$lCfwMffRYmYxbe0QKNyMd.ocY1tOU3oHMobG.OrjT7yg22kz4N1lW", // password: oowaiL7o
        __v: 0
    },
    {
        _id: "5e8f73aba4875d271478c1a1",
        name: "David Nielsen",
        username: "Nielsen",
        passwordHash: "$2b$10$Lp4hhcGZF8F18/Md94MFPehH5nhIZdVDyu/vCDAou9t44uEfYNCxW", // password: sieshae7Ah
        __v: 0
    }
]

module.exports = { sample_blogs, sample_users }