const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.xokwo6l.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

// definition of new note / code for generating a new note
/* const note = new Note({
  content: 'HTML is Easy',
  important: true,
}) */
/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
}) */

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})

