const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')


var lengthOfBlogs = 0

const blogsInDb = async () => {
  const blogsRetrieved = await Blog.find({})
  return blogsRetrieved.map(blog => blog.toJSON())
}

beforeAll(async () => {
  const response = await api.get('/api/blogs')

  lengthOfBlogs = response.body.length

})



test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

/* test('the number of blog post is correct', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(lengthOfBlogs)
}, 100000) */

/* test('id is defined', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
}, 100000) */

/* test('HTTP POST request successfully creates a new blog post', async () => {

  const newBlog = {
    title: 'yyy',
    author: 'bbb',
    url: '...',
    likes: 1234,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(function(res) {
      if (res.statusCode !== 200 && res.statusCode !== 201) {
        throw Error('unexpected status code: ' + res.statusCode)
      }
    })
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(lengthOfBlogs + 1)
  expect(titles).toContain(
    'yyy'
  )
}, 100000) */

// This one should stay commented
/* test('HTTP POST request without likes property defaults to zero', async () => {

  const newBlog = {
    title: 'xxx',
    author: 'bbb',
    url: '...'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(function(res) {
      if (res.statusCode !== 200 && res.statusCode !== 201) {
        throw Error('unexpected status code: ' + res.statusCode)
      }
    })

  const mostRecentBlog = await Blog.find().sort({ $natural:-1 }).limit(1)

  expect(mostRecentBlog.likes).toBe(0)

}) */

/* test('if the title or url properties are missing then 400-error', async () => {

  const newBlogNoTitle = {
    author: 'bbb',
    url: '...',
    likes: 99
  }

  const newBlogNoAuthor = {
    title: 'aaa',
    url: '...',
    likes: 99
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(newBlogNoAuthor)
    .expect(400)

}, 100000) */

/* test('a blog can be deleted', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]
  const initialBlogsLength = blogsInDb().length

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    initialBlogsLength - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
}, 100000) */

/* test('a blog can be updated', async () => {

  const blogsAtStart = await blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newBlog = {
    title: 'xxx',
    author: 'bbb',
    url: '...',
    likes: 777
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)

  const blogsAtEnd = await blogsInDb()

  const likesNumbers = blogsAtEnd.map(r => r.likes)

  expect(likesNumbers).toContain(newBlog.likes)
}, 100000) */

afterAll(async () => {
  await mongoose.connection.close()
})