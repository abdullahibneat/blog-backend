const totalLikes = (blogs) => {
    blogs = blogs.map(b => b.likes)
    const sum = blogs.reduce((sum, item) => sum+item, 0)
    return blogs.length === 0? 0 : sum
}

module.exports = { totalLikes }