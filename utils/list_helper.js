const totalLikes = (blogs) => {
    blogs = blogs.map(b => b.likes)
    const sum = blogs.reduce((sum, item) => sum+item, 0)
    return blogs.length === 0? 0 : sum
}

const favouriteBlog = (blogs) => {
    return blogs.length === 0? {} : blogs.reduce((highestVotes, item) => item.likes > highestVotes.likes? item : highestVotes)
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return {}
    const allAuthors = {}
    blogs.forEach(b => {
        allAuthors[b.author] = allAuthors[b.author]? allAuthors[b.author]+=1 : 1
    })
    const allAuthorsArray = Object.entries(allAuthors)
    allAuthorsArray.sort((a, b) => b[1] - a[1])[0]
    return {
        author: allAuthorsArray[0][0],
        blogs: parseInt(allAuthorsArray[0][1])
    }
}

module.exports = { totalLikes, favouriteBlog, mostBlogs }