const totalLikes = (blogs) => {
    blogs = blogs.map(b => b.likes)
    const sum = blogs.reduce((sum, item) => sum+item, 0)
    return blogs.length === 0? 0 : sum
}

const favouriteBlog = (blogs) => {
    return blogs.length === 0? {} : blogs.reduce((highestVotes, item) => item.likes > highestVotes.likes? item : highestVotes)
}

module.exports = { totalLikes, favouriteBlog }