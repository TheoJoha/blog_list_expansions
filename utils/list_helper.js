const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  let likes = 0
  for (let i = 0; i < blogs.length; i++) {
    likes += blogs[i].likes
  }
  return likes
}

const blogWithMostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  let mostLikes = 0
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes >= blogs[mostLikes].likes) {
      mostLikes = i
    }
  }
  return blogs[mostLikes]
}

const mostBlogs = (blogs) => {
  let blogsPerAuthor = {}
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].author in blogsPerAuthor) {
      blogsPerAuthor[blogs[i].author] += 1
    }
    else {
      blogsPerAuthor[blogs[i].author] = 1
    }
  }

  let authorWithMostBlogs = blogs[0].author
  for (let key of Object.keys(blogsPerAuthor)) {
    if (blogsPerAuthor[key] >= blogsPerAuthor[authorWithMostBlogs]) {
      authorWithMostBlogs = key
    }
  }

  return { 'author': authorWithMostBlogs,
    'blogs': blogsPerAuthor[authorWithMostBlogs] }

}

const mostLikes = (blogs) => {
  let likesPerAuthor = {}
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].author in likesPerAuthor) {
      likesPerAuthor[blogs[i].author] += blogs[i].likes
    }
    else {
      likesPerAuthor[blogs[i].author] = blogs[i].likes
    }
  }

  let authorWithMostLikes = blogs[0].author
  for (let key of Object.keys(likesPerAuthor)) {
    if (likesPerAuthor[key] >= likesPerAuthor[authorWithMostLikes]) {
      authorWithMostLikes = key
    }
  }

  return { 'author': authorWithMostLikes,
    'likes': likesPerAuthor[authorWithMostLikes] }

}

module.exports = {
  dummy,
  totalLikes,
  blogWithMostLikes,
  mostBlogs,
  mostLikes
}