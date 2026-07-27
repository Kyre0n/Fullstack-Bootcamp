const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs === undefined) {
    return 0
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const favorite = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorCounts = lodash.countBy(blogs, 'author')
  const maxBlogs = Math.max(...Object.values(authorCounts))
  const mostBlogsAuthor = lodash.findKey(authorCounts, (count) => count === maxBlogs)

  return {
    author: mostBlogsAuthor,
    blogs: maxBlogs
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
