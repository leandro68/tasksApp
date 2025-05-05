const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blog01',
    author: 'Author01',
    url: 'url1.com'
  },
  {
    title: 'Blog02',
    author: 'Author02',
    url: 'url2.com',
    likes: 12
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, usersInDb
}