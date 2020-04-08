const totalLikes = require("../utils/list_helper").totalLikes
const favouriteBlog = require("../utils/list_helper").favouriteBlog
const mostBlogs = require("../utils/list_helper").mostBlogs
const mostLikes = require("../utils/list_helper").mostLikes
const helper = require("./test_helper")

const blogs = [...helper.sample_blogs]

describe("totalLikes", () => {
    test("of empty list is zero", () => {
        const emptyBlogs = []
        expect(totalLikes(emptyBlogs)).toBe(0)
    })

    test("when list has only one blog equals the likes of that", () => {
        const oneBlog = [ blogs[0] ]
        expect(totalLikes(oneBlog)).toBe(blogs[0].likes)
    })

    test("of a bigger list is calculated right", () => {
        expect(totalLikes(blogs)).toBe(36)
    })
})

describe("favouriteBlog", () => {
    test("of empy list is none", () => {
        expect(favouriteBlog([])).toEqual({})
    })

    test("when list has only one blog equals that blog", () => {
        const oneBlog = [ blogs[0] ]
        expect(favouriteBlog(oneBlog)).toEqual(blogs[0])
    })

    test("of a bigger list is the one with the most likes", () => {
        expect(favouriteBlog(blogs)).toEqual(blogs[2])
    })
})

describe("mostBlogs", () => {
    test("of empty list is none", () => {
        expect(mostBlogs([])).toEqual({})
    })

    test("when list has only one blog equals that blog's author", () => {
        const oneBlog = [ blogs[0] ]
        expect(mostBlogs(oneBlog)).toEqual({ author: blogs[0].author, blogs: 1 })
    })

    test("of a bigger list is the author with most blogs", () => {
        expect(mostBlogs(blogs)).toEqual({ author: "Robert C. Martin", blogs: 3 })
    })
})

describe("mostLikes", () => {
    test("of empty list is none", () => {
        expect(mostLikes([])).toEqual({})
    })

    test("when list has only one blog equals that blog's likes", () => {
        const oneBlog = [ blogs[0] ]
        expect(mostLikes(oneBlog)).toEqual({ author: blogs[0].author, likes: blogs[0].likes })
    })

    test("of a bigger list is the author with most likes", () => {
        expect(mostLikes(blogs)).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
    })
})