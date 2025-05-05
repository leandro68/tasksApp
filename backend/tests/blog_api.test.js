const { test, after, beforeEach, describe } = require('node:test')
const Blog = require('../models/blog')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')


const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('number of all blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blogs has a property called "id"', async () => {
  const response = await helper.blogsInDb()
  const props = Object.keys(response[0])
  assert.strictEqual(props.includes('id'), true)

})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Blog03',
    author: 'Author03',
    url: 'url3.com',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)


  const titles = blogsAtEnd.map(blog => blog.title)
  assert(titles.includes('Blog03'))
})

test('blog without likes property added with likes=0', async () => {

  const response = await helper.blogsInDb()
  assert.strictEqual(response[0].likes, 0)
})

test('blog without title or url is not added', async () => {
  const newBlog = {
    author: 'author4',
    likes: 7
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(r => r.titles)
    assert(!titles.includes(blogToDelete.title))
  })
})

test('a valid blog can be updated', async () => {

  const response = await helper.blogsInDb()

  const newBlog = {
    title: response[0].title,
    author: response[0].aurthor,
    url: response[0].url,
    likes: response[0].likes + 1
  }

  await api
    .put(`/api/blogs/${response[0].id}`)
    .send(newBlog)
    .expect(200)


  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  assert.strictEqual(blogsAtEnd[0].likes, newBlog.likes)
})

after(async () => {
  await mongoose.connection.close()
})